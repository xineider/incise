// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var EmpresaModel = require('../../model/empresaModel.js');
var model = new EmpresaModel;
var data = '';
var app = express();
//var Boleto = require('node-boleto').Boleto;
app.use(require('express-is-ajax-request'));

router.use(function (req, res, next) {
	if(req.session.usuario.nivel < 3){
		next();

	}else{
		res.redirect('/sistema');
	}
});
/* GET pagina inicial. */


router.get('/', function(req, res, next) {
	model.Empresas().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/empresa/index', data: data, usuario: req.session.usuario});
	});
});

router.get('/cadastrar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/empresa/empresa_cadastrar', data: data, usuario: req.session.usuario});
});

	/* GET pagina de editar. */
router.get('/editar/:id', function(req, res, next) {
	model.Ver_Empresa(req.params.id).then(data_empresa => {				
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/empresa/empresa_editar', data: data_empresa, usuario: req.session.usuario});
	});
});




router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.InsertEmpresa('empresas',POST).then(data => {
			res.json(data);
		});
});


router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarEmpresa('empresas', POST).then(data=> {
		res.json(data);
	});
});

router.post('/atualizar/:id', function(req, res, next) {
// Recebendo o valor do post
	POST = req.body;
	model.UpdateEmpresa('empresas', POST).then(data_clientes => {
		res.json(data_clientes);
	});
});

module.exports = router;