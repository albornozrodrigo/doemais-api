const service = require('./service');

this.create = async (req, res) => {
	await service.create(req.body).then(data => {
        console.log(req.body);

        req.assert('name', 'O nome é obrigatório').notEmpty();
        req.assert('email', 'O email é obrigatória').notEmpty();
        req.assert('subject', 'O assunto é obrigatório').notEmpty();
        req.assert('message', 'A mensagem é obrigatória').notEmpty();

        let errors = req.validationErrors();

        if(errors) {
            res.status(400).json({ errors });
            return;
        }

		res.status(data.status || 200).json(data);
	});
}

module.exports = this;
