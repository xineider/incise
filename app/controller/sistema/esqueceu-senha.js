// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var LoginModel = require('../../model/loginModel.js');
var model = new LoginModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/login/esqueceu-senha'});
});

/* POST enviando o login para verificação. */
router.post('/esqueceu', function(req, res, next) {
	POST = req.body;

	model.ClienteRecuperacao(POST.email).then(data => {
	  if (data.length > 0) {
	  	var novaSenha = Math.random(5).toString(36).substring(2,9);
	  	POST.senha = control.Encrypt(novaSenha);
	  	POST.id = data[0].id;

	   	model.AlterarSenha('usuarios',POST).then(data_usuario => {
			 	control.SendMail(POST.email, 'Alteração de Senha da Incise','Olá você pediu para alterar a senha da Incise, aqui estão os dados: Login:' + data[0].login + '  .Senha:'+ novaSenha + ' .Por-favor não responda essa mensagem, ela é enviada automaticamente.',
					'Olá você pediu para alterar sua senha da Incise aqui estão os dados:'+
					'<br><b>Login</b>:' + data[0].login + 
					'<br><b>Senha</b>:' + novaSenha +
					'<br>Recomendamos fortemente que você ao acessar o sistema altere sua senha no menu "Alterar Senha" para uma senha de sua preferência.'+
					'<br>Caso não foi você que pediu a alteração por-favor contatar o suporte através do número (51)3191-8055, ou envie um e-mail para contato@incise.com.br'+
					'<br>Acesse o site através do link <a href="http://www.incise.com.br" target="_blank">www.incise.com.br</a>. Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
					'<br>Não responda esta mensagem, ela é enviada automaticamente.');
			 	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/login/index', sucesso: 'Email existente.', tipo_erro: 'login' });
			});
		}else{
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/login/esqueceu-senha', erro: 'Email não existente.', tipo_erro: 'login' });
		}
	});
});

module.exports = router;
