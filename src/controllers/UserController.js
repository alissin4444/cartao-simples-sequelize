const User = require("../models/User");


module.exports = { 
    async index(req, res) {
        try {
            // Busca por todos os users no bd
            const users = await User.findAll({
                attributes: ['id', 'name', 'limit']
            });

            return res.json(users)
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async store(req, res) {
        try {
            const { name, limit } = req.body;

            // cadastra um user no bd
            const user = await User.create({
                name,
                limit
            });

            return res.json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            // Busca um user
            const user = await User.findByPk(id);

            return res.json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    },


    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, limit } = req.body;

            // Busca um user no bd
            const user = await User.findByPk(id);
            
            // Verifica se ele existe
            if(!user) {
                return res.status(401).json(false)
            }

            // Realiza update no user
            user.name = name;
            user.limit = limit;
            user.save();

            return res.json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;

            // Apaga sem validações um user da db
            await User.destroy({
                where: {
                    id
                }
            });

            // Busca e verifica se o user foi apagado. Se ele foi, retorna true
            const user = await User.findByPk(id);
            if(!user) {
                return res.status(200).json(true)
            }

            return res.json(false);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
}