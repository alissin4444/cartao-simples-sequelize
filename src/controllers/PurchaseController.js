const Purchase = require("../models/Purchase");
const Portion = require("../models/Portion");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    try {
      // Busca pela purchase e trás somente os campos que eu coloquei no "attributes"
      const purchases = await Purchase.findAll({
        attributes: ["id", "user_id", "name", "description", "price", "status"]
      });

      res.json(purchases);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async store(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, portions_quantity } = req.body;

      // Verifica se a portions_quantity é maior que 5 (Regra de negócio)
      if (portions_quantity > 5) {
        return res
          .status(401)
          .json({ code: "ERROR", response: "Quantity is not available" });
      }

      // Verifica se o user existe
      const user = await User.findByPk(id);
      if (!user) {
        return res
          .status(404)
          .json({ code: "ERROR", response: "User is not found" });
      }

      // Verifica se o limite do cartão do usuário suporta as portions
      const portion = Math.floor(price / portions_quantity);
      if (user.limit < portion) {
        return res
          .status(400)
          .json({ code: "ERROR", response: "Limit is not available" });
      }

      // Se ele suportar, então atribui a portion ao limite
      user.limit = user.limit - portion;
      user.save();

      // monta o objeto e insere a purchase
      const purchase = await Purchase.create({
        user_id: id,
        name,
        description,
        price,
        status: false
      });

      const purchase_id = purchase.id;

      // Cria o objeto de portions
      const portions = {
        purchase_id,
        value: portion,
        status: false
      };

      // Realiza um loop inserindo
      for (i = 0; i < portions_quantity; i++) {
        await Portion.create(portions);
      }

      // Busca pela purchase e suas portions
      const response = await Purchase.findByPk(purchase_id, {
        attributes: ["id", "user_id", "name", "description", "price", "status"],
        include: [
          {
            model: Portion,
            as: "portions",
            attributes: ["id", "status", "value"]
          }
        ]
      });

      return res.json({ code: "SUCCESS", response: response });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      // Procura pela purchase e trás ela baseada em sua primary key
      const purchase = await Purchase.findByPk(id, {
        attributes: ["id", "user_id", "name", "description", "price", "status"],
        include: [
          {
            model: Portion,
            as: "portions",
            attributes: ["id", "status", "value"]
          }
        ]
      });

      // Se não encontrar, retorna que não foi encontrada
      if (!purchase) {
        return res
          .status(404)
          .json({ code: "ERROR", response: "Purchase is not found" });
      }

      return res.json({ code: "SUCCESS", response: purchase });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;

      // Procura pela purchase pela sua primary key e valida se ela existe
      const purchase = await Purchase.findByPk(id);
      if (!purchase) {
        return res
          .status(404)
          .json({ code: "ERROR", response: "Purchase is not found" });
      }

      // Procura por apenas uma portion
      const portion = await Portion.findOne({
        where: { purchase_id: id },
        attributes: ["status", "value"]
      });

      // Se o status da purchase for false, significa que ainda não foi pago todas as portions. Então ele restaura o limit e apaga a purchase com suas portions
      if (purchase.status === false) {
        const user = await User.findByPk(purchase.user_id);

        user.limit = user.limit + portion.value;
        user.save();

        await Purchase.destroy({
          where: {
            id
          }
        });
      }

      // Caso ele passe pela verificação acima, significa que a purchase foi paga, então ele simplesmente apaga a purchase e suas portions
      await Purchase.destroy({
        where: {
          id
        }
      });

      return res.json({ code: "SUCCES", response: "Deleted" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};
