// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var AlterarSenhaModel = require('../../model/alterar-senhaModel.js');
var model = new AlterarSenhaModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/*Especifico para eu poder saber que o usuario comum não deve entrar em páginas que o mesmo não possua poder */
var parseurl = require('parseurl');

router.get('/', function(req, res, next) {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/alterar-senha/index', data: data, usuario: req.session.usuario});
});



router.post('/alterar', function(req, res, next) {
// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	POST.id = req.session.usuario.id;
	POST.senha_atual = control.Encrypt(POST.senha_atual);

	model.Usuario(req.session.usuario.id,POST.senha_atual).then(data_usuario => {
		console.log('************* DADOS USUARIO *************');
		console.log(data_usuario);
		console.log('*****************************************');
		delete POST.senha_atual;
		if (data_usuario.length > 0){
			console.log('ESTOU ENTRANDO AQUIIIIIII');
			model.UpdateUsuario('usuarios', POST).then(data => {
				control.SendMail(data_usuario[0].email,'Sua senha foi Atualizada em Incise',
		 		'Olá sua senha foi alterada com sucesso em Incise.',
		   	'Olá Sua senha foi alterada com sucesso na Incise. Segue abaixo as informações sobre sua conta.'+
		 	 	'<br><b>Login</b>:'+data_usuario[0].login+ 
		 	 	'<br>Acesse o site através do link <a href="http://www.incise.com.br" target="_blank">www.incise.com.br</a>. Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
		 	 	'<br>Não responda esta mensagem, ela é enviada automaticamente.');
				res.json(POST.id);
			});	
		} else {
			var erro = 'Senha Atual errada.';
			console.log(erro);
			res.json('errorsenha');
			// res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/alterar-senha/index', erro: erro});
		}

	});
});

module.exports = router;