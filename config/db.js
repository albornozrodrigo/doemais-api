const mongoose = require('mongoose');
mongoose.promise = global.promise;

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'"
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'"
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'"

mongoose.connect('mongodb://localhost:27017/doemais', { useNewUrlParser: true, strict: false }).then(
	() => { console.log('database connected'); },
	err => { console.log('database connection error'); }
);

module.exports = mongoose;
