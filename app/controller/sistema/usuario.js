// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var UsuarioModel = require('../../model/usuarioModel.js');
var model = new UsuarioModel;
var data = {};
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
	model.Usuarios().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/usuario/index', data: data, usuario: req.session.usuario});
	});
});

router.get('/cadastrar', function(req, res, next) {
	model.Empresas().then(data_empresa => {
		data['empresas'] = data_empresa;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/usuario/usuario_cadastrar', data: data, usuario: req.session.usuario});
	});
});

	/* GET pagina de editar. */
router.get('/editar/:id', function(req, res, next) {
	model.Ver_Usuario(req.params.id).then(data_usuario => {				
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/usuario/usuario_editar', data: data_usuario, usuario: req.session.usuario});
	});
});

router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
	POST = req.body;
	var senhanocrypt = POST.senha;
	POST.senha = control.Encrypt(POST.senha);

	if(POST.id_empresa=="Incise"){
	 	POST.id_empresa = 0;
		POST.nivel = 2;
	}else{
		POST.nivel = 3;
	}

	console.log('------------------------CADASTRAR USUARIO---------------------------');
	console.log(POST);
	console.log('--------------------------------------------------------------------');

	model.InsertUsuario('usuarios',POST).then(data => {	
		control.SendMail(POST.email,'Você foi registrado com sucesso em Incise',
			'Bem vindo ao sistema de controladoria de documentos Incise.Seu login é:'+POST.login+' e sua senha é:'+senhanocrypt+' .Acesse via o link http://www.incise.com.br',
		  'Bem vindo ao sistema de controladoria de documentos Incise. Segue abaixo as informações sobre sua conta. \
			<br><b>Login</b>:'+POST.login+
			'<br><b>Senha</b>:'+senhanocrypt+ 
			'<br>Acesse o site através do link <a href="http://www.incise.com.br" target="_blank">www.incise.com.br</a>. Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
			'<br>Não responda esta mensagem, ela é enviada automaticamente.');
			res.json(data);
	});
});


router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarUsuario('usuarios', POST).then(data=> {
		res.json(data);
	});
});

router.post('/atualizar/:id', function(req, res, next) {
// Recebendo o valor do post
	POST = req.body;
	var senhanocrypt = POST.senha;
	POST.senha = control.Encrypt(POST.senha);

	model.UpdateUsuario('usuarios', POST).then(data_clientes => {
		control.SendMail(POST.email,'Sua Conta foi Atualizada em Incise',
			'Olá Sua Conta foi atualizada em Incise aqui estão os dados.Seu login é:'+POST.login+' e sua senha é:'+senhanocrypt+' .Acesse via o link http://www.incise.com.br',
		  'Olá Sua Conta foi atualizada em Incise. Segue abaixo as informações sobre sua conta. \
			<br><b>Login</b>:'+POST.login+
			'<br><b>Senha</b>:'+senhanocrypt+ 
			'<br>Acesse o site através do link <a href="http://www.incise.com.br" target="_blank">www.incise.com.br</a>. Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
			'<br>Não responda esta mensagem, ela é enviada automaticamente.');
			res.json(data);
	});
});

module.exports = router;
