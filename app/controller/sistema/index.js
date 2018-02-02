// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var IndexModel = require('../../model/indexModel.js');
var model = new IndexModel;
var data = '';
var app = express();
//var Boleto = require('node-boleto').Boleto;
app.use(require('express-is-ajax-request'));

/* GET pagina inicial. */
router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/inicio/index', data: data, usuario: req.session.usuario});
});

module.exports = router;