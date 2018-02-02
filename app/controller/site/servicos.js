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

/* GET pagina da servicos. */
router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/index', data: data});
});

router.get('/acessoria_juridica', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/acessoria_juridica', data: data});
});
router.get('/area_contabil', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/area_contabil', data: data});
});
router.get('/area_fiscal', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/area_fiscal', data: data});
});
router.get('/area_trabalhista', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/area_trabalhista_e_social', data: data});
});
router.get('/controladoria', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/controladoria', data: data});
});
router.get('/imposto_de_renda', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/imposto_de_renda', data: data});
});
router.get('/legalizacao_do_societario', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/legalizacao_do_societario', data: data});
});
router.get('/outros_servicos', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/outros_servicos', data: data});
});
router.get('/regularizacoes', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'site/servicos/regularizacoes', data: data});
});

module.exports = router;