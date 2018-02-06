// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('../control.js');
var control = new Control;
var pagamentoModel = require('../../model/pagamentoModel.js');
var model = new pagamentoModel;
var data = {};
var app = express();
//var Boleto = require('node-boleto').Boleto;
app.use(require('express-is-ajax-request'));

/*Especifico para eu poder saber que o usuario comum não deve entrar em páginas que o mesmo não possua poder */
var parseurl = require('parseurl');

router.use(function (req, res, next) {
	var pathname = parseurl(req).pathname;
	if ((pathname.indexOf('cadastrar') != -1 || pathname.indexOf('editar') != -1 || pathname.indexOf('desativar') != -1) && req.session.usuario.nivel == 3) {
   res.redirect('/sistema/pagamentos');
 }else{
 	next();
 }	
});

/* GET pagina inicial. */
router.get('/', function(req, res, next) {
	model.Pagamentos(req.session.usuario.id_empresa).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/pagamento/index', data: data, usuario: req.session.usuario});
	});
});

router.get('/cadastrar', function(req, res, next) {
	model.Empresas().then(data_empresa => {
		data['empresas'] = data_empresa;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/pagamento/pagamento_cadastrar', data: data, usuario: req.session.usuario});
	});		
});

	/* GET pagina de editar. */
router.get('/editar/:id', function(req, res, next) {
	model.Empresas().then(data_empresa => {
		data['empresas'] = data_empresa;
		model.Ver_Pagamento(req.params.id).then(data_pagamento => {		
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/pagamento/pagamento_editar', data: data_pagamento, usuario: req.session.usuario});
		});
	});
});		

router.get('/comprovantes/:id', function(req, res, next) {
	model.Comprovantes(req.params.id).then(data_comprovante => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/pagamento/comprovantes', data: data_comprovante, usuario: req.session.usuario});
	});
});	

router.get('/pedir-aprovacao-pagamento/:id', function(req, res, next) {
	model.DadosAprovacao(req.params.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/pagamento/pedir_aprovacao', data: data, usuario: req.session.usuario});
	});
});

router.get('/aprovacao-pagamento/:id', function(req, res, next) {
	model.DadosAprovacao(req.params.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorSistema', {html: 'sistema/pagamento/aprovar', data: data, usuario: req.session.usuario});
	});
});


router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.InsertPagamento('pagamentos',POST).then(data => {
			var POST_Doc = {id_empresa:POST.id_empresa,arquivo:POST.arquivo,tipo:2};
			model.InsertDocumento(POST_Doc,'Pagamentos').then(dataDocumento => {
				model.EmailsCliente(POST.id_empresa).then(emailsCliente =>{
					control.SendMailAttachment(emailsCliente[0].email,'Envio de Pagamento da Incise','Envio de Pagamento pela Incise',
						'Olá foi enviado um pagamento para ser efetuado o arquivo é: '+POST.arquivo+' .'+
						'<br>Referente a '+POST.descricao+
						'<br>No valor de R$'+POST.valor+
						'<br>Acesse <a href="http://www.incise.com.br/sistema" target="_blank"> http://www.incise.com.br/sistema</a> na parte de Pagamentos para poder pedir a aprovação do pagamento, não '+
						'se esqueça de enviar o comprovante no Sistema.'+
						'<br>Por-favor não responda essa mensagem, ela é enviada automaticamente',
						POST.arquivo,'./assets/files/pagamentos/'+POST.arquivo);
					console.log(data);
					res.json(data);
				});
			});
		});
});


router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarPagamento('pagamentos', POST).then(data=> {
		res.json(data);
	});
});


router.post('/pedir-aprovacao-pagamento', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;

	if(typeof POST.arquivo != 'undefined')
	{
		control.SendMailAttachment('markosss13@gmail.com', 'Pedido de Análise de Pagamento','Envio de Comprovante',
			'Olá foi enviado um comprovante de pagamento: '+POST.arquivo+' da Empresa '+POST.empresa+ '.'+
							'<br>Por-favor avaliar se o comprovante está correto conforme o pagamento'+
							'<br>Por-favor não responda essa mensagem, ela é enviada automaticamente',
							POST.arquivo,'./assets/files/comprovantes/'+POST.arquivo);
		var POST_Doc = {id_empresa:POST.id_empresa,arquivo:POST.arquivo,tipo:2};
		//Se existe arquivo para aprovar colocar ele na pasta
		model.InsertDocumento(POST_Doc,'Comprovantes').then(dataDocumento => {
		});
	}
	else{
		control.SendMail('markosss13@gmail.com', 'Pedido de Análise de Pagamento','Envio de Comprovante',
			'Olá o cliente da Empresa '+POST.empresa+' pediu para avaliar o pagamento porém o mesmo não enviou comprovante.'+
							'<br>Por-favor avaliar se o pedido está correto.'+
							'<br>Por-favor não responda essa mensagem, ela é enviada automaticamente');
	}
	model.PedirAprovacaoPagamento('pagamentos_comprovantes', POST).then(data=> {
		res.json(data);
	});
});


router.post('/recusar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.RecusarPagamento(POST).then(data=> {
		model.EmailsClientePorPagamento(POST.id_pagamento).then(emailsCliente =>{
			model.Ver_Pagamento(POST.id_pagamento).then(dadosPagamento=>{
				control.SendMailAttachment(emailsCliente[0].email,'Pagamento Recusado pela Incise','Pagamento Recusado pela Incise',
					'Olá seu pagamento referente a '+dadosPagamento[0].descricao +' no valor de R$' +dadosPagamento[0].valor+ '.Foi recusado pelo seguinte motivo:'+
					'<br>'+POST.motivo_recusar+
					'<br>Por-favor não responda essa mensagem, ela é enviada automaticamente');
					res.json(data);
			});
		});
	});
});


router.post('/aprovacao-pagamento', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;

	model.AprovacaoPagamento(POST).then(data=> {
		model.EmailsClientePorPagamento(POST.id_pagamento).then(emailsCliente =>{
			model.Ver_Pagamento(POST.id_pagamento).then(dadosPagamento=>{
				control.SendMailAttachment(emailsCliente[0].email,'Pagamento Aprovado pela Incise','Aprovação de Pagamento pela Incise',
					'Olá foi aprovado o pagamento refente a '+dadosPagamento[0].descricao + ' no valor de R$'+dadosPagamento[0].valor+
					'<br>Por-favor não responda essa mensagem, ela é enviada automaticamente');
					res.json(data);
			});
		});
	});
});


router.post('/atualizar/:id', function(req, res, next) {
// Recebendo o valor do post
	POST = req.body;

	model.UpdatePagamento('pagamentos', POST).then(data_clientes => {
		res.json(data_clientes);
	});
});

router.post('/uploadpagamento', function(req, res, next) {
  var sampleFile = req.files.arquivo;
  var nome = control.DateTimeForFile()+'_'+sampleFile.name;
  sampleFile.mv('./assets/files/pagamentos/' + nome,function(err){
  	if(err)
    	return res.status(500).send(err);
   	res.json(nome);
 });
});

router.post('/uploadcomprovante', function(req, res, next) {
  var sampleFile = req.files.arquivo;
  var nome = control.DateTimeForFile()+'_'+sampleFile.name;
  sampleFile.mv('./assets/files/comprovantes/' + nome,function(err){
  	if(err)
    	return res.status(500).send(err);
   	res.json(nome);
 });
});


module.exports = router;