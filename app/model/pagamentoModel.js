'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

// FAZER LEITURA DAS CONFIGURAÇÕES
var config = helper.Config();

// CONEXÃO MYSQL
var mysql      = require('mysql');
var connection = mysql.createConnection(config['mysql']);
connection.connect();
var query = '';
var array = [];

class PagamentosModel {
	Pagamentos(id_empresa) {
		var ad_query = typeof id_empresa != 'undefined' & id_empresa != 0 ? ' AND a.id_empresa = ?' : '';
		var values = typeof id_empresa != 'undefined' & id_empresa != 0 ? [0,id_empresa] : [0];
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, \
										(SELECT b.nome_fantasia FROM empresas as b WHERE b.id = a.id_empresa) as empresa \
											FROM pagamentos as a WHERE a.deletado = ?'+ad_query+' ORDER BY a.status',values).then(data => {
				resolve(data);
			});
		});
	}
	Ver_Pagamento(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM pagamentos WHERE deletado = ? AND id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	InsertPagamento(table,POST) {
		return new Promise(function(resolve, reject) {
			var POST_Historico = {};
			helper.Insert(table, POST).then(data => {
				POST_Historico = {id_pagamento: data,status:3};
				helper.Insert('pagamento_historico',POST_Historico).then(data_historico => {
					resolve(data);
				});
			});
		});
	}
	UpdatePagamento(table,POST) {
		return new Promise(function(resolve, reject) {
			helper.Update(table, POST).then(data => {
						resolve(data);
			});
		});
	}
	DesativarPagamento(table, POST) {
		return new Promise(function(resolve, reject) {
	  	helper.Desativar(table, POST).then(data=> {
	  		resolve(data);
	  	});
		});
	}

	Comprovantes(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.motivo_recusar,\
										(SELECT b.arquivo FROM pagamentos_comprovantes as b WHERE a.id = b.id_pagamento ORDER BY b.id DESC LIMIT 1) as arquivo\
										FROM pagamentos as a WHERE a.deletado = ? AND a.id = ?',[0,id]).then(data => {
				resolve(data);
			});
		});
	}

	RecusarPagamento(POST){
		return new Promise(function(resolve, reject) {
			var POST_Pagamento,POST_Historico = {}
			POST_Pagamento = {id: POST.id_pagamento,status:4};
			POST_Historico = {id_pagamento: POST.id_pagamento,status:4}

			if(POST.motivo_recusar != ""){
				POST_Pagamento = {id: POST.id_pagamento,status:4,motivo_recusar:POST.motivo_recusar};
				POST_Historico = {id_pagamento: POST.id_pagamento,status:4,motivo_recusar:POST.motivo_recusar};
			}
			
			helper.Insert('pagamento_historico',POST_Historico).then(data_historico => {
				helper.Update('pagamentos',POST_Pagamento).then(data => {
					resolve(data);
				});
			});	
		});
	}

	InsertDocumento(POST,nomePasta){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM documentos WHERE deletado = ? AND id_empresa= ? AND arquivo= ? ORDER BY id ASC LIMIT 1',[0,POST.id_empresa,nomePasta]).then(data=>{
				POST.id_doc_pai = data[0].id;
				helper.Insert('documentos', POST).then(data => {
					resolve(data);
				});
			});
		});
	}


	AprovacaoPagamento(POST){
		return new Promise(function(resolve, reject) {
			var POST_Pagamento,POST_Historico = {}
			POST_Pagamento = {id: POST.id_pagamento,status:1};
			POST_Historico = {id_pagamento: POST.id_pagamento,status:1}

			if(POST.motivo_recusar != ""){
				POST_Pagamento = {id: POST.id_pagamento,status:1,motivo_recusar:POST.motivo_recusar};
				POST_Historico = {id_pagamento: POST.id_pagamento,status:1,motivo_recusar:POST.motivo_recusar};
			}

			helper.Insert('pagamento_historico',POST_Historico).then(data_historico => {
				helper.Update('pagamentos',POST_Pagamento).then(data => {
					resolve(data);
				});
			});
		});
	}

	DadosAprovacao(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id,a.id_empresa, \
										(SELECT b.nome_fantasia FROM empresas as b WHERE b.id = a.id_empresa) as empresa \
											FROM pagamentos as a WHERE a.deletado = ? AND a.id = ? ORDER BY a.status',[0,id]).then(data => {
				resolve(data);
			});
		});
	}

	PedirAprovacaoPagamento(table,POST){
		return new Promise(function(resolve, reject) {
			delete POST.empresa;
			var POST_Pagamento,POST_Historico,POST_Comprovante = {}
			POST_Pagamento = {id:POST.id,status:2};
			POST_Historico = {id_pagamento: POST.id,status:2};
			POST_Comprovante ={id_pagamento: POST.id,arquivo:POST.arquivo};

			helper.Insert('pagamento_historico',POST_Historico).then(data_historico => {
				helper.Update('pagamentos',POST_Pagamento).then(data_pagamento =>{
					helper.Insert(table, POST_Comprovante).then(data => {
						resolve(data);
					});
				});
			});	
		});
	}

	EmailsCliente(id_empresa){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT GROUP_CONCAT(email) as email FROM usuarios WHERE deletado = ? AND id_empresa = ? GROUP BY id_empresa', [0,id_empresa]).then(data => {
				resolve(data);
			});
		});
	}

	EmailsClientePorPagamento(id_pagamento){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT GROUP_CONCAT(email) as email FROM usuarios WHERE deletado = ? AND id_empresa = (SELECT id_empresa FROM pagamentos WHERE id = ?) GROUP BY id_empresa', [0,id_pagamento]).then(data => {
				resolve(data);
			});
		});
	}


	Empresas(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id, a.nome_fantasia FROM empresas as a WHERE a.deletado = ? ORDER BY id', [0]).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = PagamentosModel;