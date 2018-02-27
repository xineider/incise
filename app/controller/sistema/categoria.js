// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var CategoriaModel = require('../../model/categoriaModel.js');
var model = new CategoriaModel;
var data = '';
var app = express();
//var Boleto = require('node-boleto').Boleto;
app.use(require('express-is-ajax-request'));

/* GET pagina inicial. */


router.get('/', function(req, res, next) {
	model.Categoria().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/categoria/index', data: data});
	});
});

router.get('/cadastrar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/categoria/categoria_cadastrar', data: data});
});

	/* GET pagina de editar. */
router.get('/editar/:id', function(req, res, next) {
	model.Ver_Categoria(req.params.id).then(data_categoria => {			
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/categoria/categoria_editar', data: data_categoria});
	});
});


router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.InsertCategoria('node_categoria',POST).then(data => {
			res.json(data);
		});
});


router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarCategoria('categoria', POST).then(data=> {
		res.json(data);
	});
});

router.post('/atualizar/:id', function(req, res, next) {
// Recebendo o valor do post
	POST = req.body;
	model.UpdateCategoria('node_categoria', POST).then(data_clientes => {
		res.json(data_clientes);
	});
});

module.exports = router;