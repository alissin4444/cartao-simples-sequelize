const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Portion = require("../models/Portion");

module.exports = {
  async update(req, res) {
    try {
      const { user_id, purchase_id, portion_id } = req.params;

      // Valida o User
      const user = await User.findByPk(user_id);
      if (!user) {
        return res
          .status(404)
          .json({ code: "ERROR", response: "User is not found" });
      }

      // Valida a Purchase
      const purchase = await Purchase.findByPk(purchase_id);
      if (!purchase) {
        return res
          .status(404)
          .json({ code: "ERROR", response: "Purchase is not found" });
      }

      // Valida a Portion
      const portion = await Portion.findByPk(portion_id, {
        attributes: ["id", "status", "value", "purchase_id"]
      });
      if (!portion) {
        return res
          .status(404)
          .json({ code: "ERROR", response: "Portion is not found" });
      }

      // Primeiro eu atualizo o status e dou um await na hora de salvar
      portion.status = !portion.status;
      await portion.save();

      // Agora eu preparo uma situação para que seja possível validar se todas as portions referentes à essa purchase foram pagas
      const portions = await Portion.findAll({
        where: {
          purchase_id,
          status: false
        }
      });

      // Caso ele traga algum resultado, significa que minha purchase não está paga. Por isso eu preparo-la novamente
      if (portions[0] !== undefined && purchase.status === true) {
        // Altero o status da purchase pra false, que significa não pago
        purchase.status = false;
        await purchase.save();

        // Altero o limit do user
        user.limit = user.limit - portion.value;
        await user.save();
      }

      // Caso ele não traga nenhum resultado, isso significa que todas as portions foram pagas
      if (portions[0] === undefined) {
        // Altero o status da purchase pra true, que significa pago
        purchase.status = true;
        await purchase.save();

        // Altero o limit do user
        user.limit = user.limit + portion.value;
        await user.save();
      }

      return res.json({ code: "SUCCESS", response: portion });
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
