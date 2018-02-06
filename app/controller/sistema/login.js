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
	if (typeof req.session.usuario != 'undefined' && req.session.usuario.id != 0) {
		res.redirect('/sistema');
	} else {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/login/index'});
	}
});

/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);

	model.Login(POST).then(data => {
	  if (data.length > 0) {
			req.session.usuario = {};
			req.session.usuario.id = data[0].id;
			req.session.usuario.hash_login = data[0].hash_login;
			req.session.usuario.nivel = data[0].nivel;
			req.session.usuario.id_empresa = data[0].id_empresa;
			// res.render('site/empresa/index');
			res.redirect('/sistema');
	  } else {
	  	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/login/index', erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });

	  }
	});
});

/* GET pagina de login. */
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
  	console.log(err);
	});
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'sistema/login/index'});
});

module.exports = router;
