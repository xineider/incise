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
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/inicio/index', data: data});
});

router.get('/site/enviarcontato', function(req, res, next) {
	console.log('apertanto o botão');
});

router.post('/site/enviarcontato', function(req, res, next) {
		// Recebendo o valor do post
	POST = req.body;

	control.SendMail('markosss13@gmail.com','Contato - Site Incise','Recebimento de contato pelo site Incise',
		'Recebimento de contato pelo site Incise. \
							 <br><b>Nome</b>:' + POST.nome + 
							'<br><b>Email</b>:' + POST.email +
							'<br><b>Telefone</b>:' + POST.telefone +
							'<br><b>Assunto</b>:' + POST.assunto +
							'<br><b>Mensagem</b>:<br>'+ POST.descricao +
							'<br>Não responda esta mensagem, ela é enviada automaticamente!');
		res.json(data);
});


router.post('/site/enviarebook', function(req, res, next) {
		// Recebendo o valor do post
	POST = req.body;

	control.SendMailAttachment(POST.email,'Ebook Incise','Obrigado por receber nosso Ebook',
		'Obrigado por receber nosso Ebook!' /
							'<br>Por-favor não responda essa mensagem, ela é enviada automaticamente',
							'Ebook Incise.pdf','./assets/files/Ebook Incise.pdf');
		res.json(data);
});




router.post('/site/enviarcurriculo', function(req, res, next) {
		// Recebendo o valor do post
	POST = req.body;
	//var sampleFile = req.files.curriculo;
	console.log(POST);

	if(typeof POST.arquivo != 'undefined')
	{
		control.SendMailAttachment('markosss13@gmail.com','Contato - Vaga de emprego','Recebimento de contato para vaga de emprego pelo site Incise',
			'Recebimento de vaga de emprego pelo site Incise. \
							 <br><b>Nome</b>:' + POST.nome + 
							'<br><b>Email</b>:' + POST.email +
							'<br><b>Telefone</b>:' + POST.telefone +
							'<br><b>Último Emprego</b>:' + POST.emprego +
							'<br><b>Função</b>:' + POST.funcao +
							'<br><b>Pretensão Salarial</b> R$' + POST.pretensao_salarial +
							'<br><b>Mensagem</b>:<br>'+ POST.descricao +
							'<br>Não responda esta mensagem, ela é enviada automaticamente!',
							POST.arquivo,'./assets/files/documentos/'+POST.arquivo);
	}
	else
	{
		control.SendMail('markosss13@gmail.com','Contato - Vaga de emprego','Recebimento de contato para vaga de emprego pelo site Incise',
		'Recebimento de vaga de emprego pelo site Incise. Não foi enviado Currículo. \
							 <br><b>Nome</b>:' + POST.nome + 
							'<br><b>Email</b>:' + POST.email +
							'<br><b>Telefone</b>:' + POST.telefone +
							'<br><b>Último Emprego</b>:' + POST.emprego +
							'<br><b>Função</b>:' + POST.funcao +
							'<br><b>Pretensão Salarial</b> R$' + POST.pretensao_salarial +
							'<br><b>Mensagem</b>:<br>'+ POST.descricao +
							'<br>Não responda esta mensagem, ela é enviada automaticamente!');
	}
	
	res.json(data);
});

router.post('/site/uploadarquivo', function(req, res, next) {
  var sampleFile = req.files.arquivo;
  var nome = 'curriculo_'+ control.DateTimeForFile()+'_'+sampleFile.name;
  sampleFile.mv('./assets/files/documentos/' + nome,function(err){
  	if(err)
    	return res.status(500).send(err);
   	res.json(nome);
  })
});

module.exports = router;