// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var VagasAbertasModel = require('../../model/vagasAbertasModel.js');
var model = new VagasAbertasModel;
var data = '';
var app = express();
//var Boleto = require('node-boleto').Boleto;
app.use(require('express-is-ajax-request'));

/* GET pagina inicial. */


router.get('/', function(req, res, next) {
	model.Vagas().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/vagas/index', data: data});
	});
});

router.get('/cadastrar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/vagas/vagas_cadastrar', data: data});
});

	/* GET pagina de editar. */
router.get('/editar/:id', function(req, res, next) {
	model.Ver_Vaga(req.params.id).then(data_vaga => {			
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/vagas/vagas_editar', data: data_vaga});
	});
});


router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.InsertVaga(POST).then(data => {
			res.json(data);
		});
});


router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarVaga(POST).then(data=> {
		res.json(data);
	});
});

router.post('/atualizar/:id', function(req, res, next) {
// Recebendo o valor do post
	POST = req.body;
	model.UpdateVaga(POST).then(data => {
		res.json(data);
	});
});

module.exports = router;