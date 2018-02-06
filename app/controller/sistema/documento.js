// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var DocumentosModel = require('../../model/documentoModel.js');
var model = new DocumentosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/*Especifico para eu poder saber que o usuario comum não deve entrar em páginas que o mesmo não possua poder */
var parseurl = require('parseurl');

router.use(function (req, res, next) {
	var pathname = parseurl(req).pathname;
	if ((pathname.indexOf('adicionar') != -1 || pathname.indexOf('editar') != -1 || pathname.indexOf('desativar') != -1) && req.session.usuario.nivel == 3) {
   res.redirect('/sistema/documentos');
 }else{
 	next();
 }	
});

router.get('/', function(req, res, next) {
		model.GetPastas(req.session.usuario.id_empresa,req.session.usuario.nivel).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/documento/index', data: data, usuario: req.session.usuario});
		});
});
router.get('/arquivos/:id', function(req, res, next) {
	model.GetDocumentos(req.session.usuario.id_empresa, req.params.id,req.session.usuario.nivel).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/documento/documentos', data: data, usuario: req.session.usuario});
	});
});
router.get('/adicionar', function(req, res, next) {
	model.GetPastasTodas(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/documento/documentos_adicionar', data: data, usuario: req.session.usuario});
	});
});
router.get('/adicionar/pasta', function(req, res, next) {
	model.GetPastasTodas(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/documento/documentos_adicionar_pasta', data: data, usuario: req.session.usuario});
	});
});
router.get('/ver/usuario/:id', function(req, res, next) {
	var id = req.params.id;
	model.VerDocumentosUsuario(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/documento/documentos_usuario_ver', data: data, usuario: req.session.usuario});
	});
});
router.post('/cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.CadastrarDocumento(POST).then(data => {
		res.json(data);
	});
});
router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarDocumento(POST).then(data=> {
		res.json(data);
	});
});
router.post('/cadastrar/pasta', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.CadastrarPasta(POST).then(data => {
		res.json(data);
	});
});
router.post('/uploadarquivo', function(req, res, next) {
  var sampleFile = req.files.arquivo;
  var nome = control.DateTimeForFile()+'_'+sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv('./assets/files/documentos/'+nome, function(err) {
 	sampleFile.mv('./assets/files/documentos/' + nome,function(err){
    if (err) {
      return res.status(500).send(err);
    }

		res.json(nome);
  });
});


module.exports = router;
