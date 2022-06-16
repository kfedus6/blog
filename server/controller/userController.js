class UserController {
    async registration(req, res) {
        res.json({ 'reg': 'hello' })
    }

    async login(req, res) {
        res.json({ 'login': 'hello' })
    }

    async auhtorization(req, res) {
        res.json({ 'auth': 'hello' })
    }
};

const userController = new UserController();

module.exports = userController;