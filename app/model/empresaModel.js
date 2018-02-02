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

class EmpresasModel {
	Empresas() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* FROM empresas as a WHERE a.deletado = ? ORDER BY a.id',[0]).then(data => {
				resolve(data);
			});
		});
	}
	Ver_Empresa(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM empresas WHERE deletado = ? AND id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	InsertEmpresa(table,POST) {
		return new Promise(function(resolve, reject) {
			var POST_pasta_pai,POST_pastas = {};

			helper.Insert(table, POST).then(id_empresa => {
				POST_pasta_pai= {id_empresa:id_empresa,arquivo:POST.nome_fantasia,tipo:1};

				helper.Insert('documentos', POST_pasta_pai).then(id_pasta_pai => {
					POST_pastas = {
						arquivo: [
						'Pagamentos',
						'Documentos',
						'Comprovantes',
						'Recibos'
						]
					};
					POST_pastas = helper.PrepareMultiple(POST_pastas, 'id_empresa', id_empresa);
					POST_pastas = helper.PrepareMultiple(POST_pastas, 'id_doc_pai', id_pasta_pai);
					POST_pastas = helper.PrepareMultiple(POST_pastas, 'tipo',1);

					helper.InsertMultiple('documentos',POST_pastas).then(id_pastas =>{
						resolve(id_empresa);
					});
				});
			});
		});
	}
	UpdateEmpresa(table,POST) {
		return new Promise(function(resolve, reject) {
			helper.Update(table, POST).then(data => {
						resolve(data);
			});
		});
	}
	DesativarEmpresa(table, POST) {
		return new Promise(function(resolve, reject) {
	  	helper.Desativar(table, POST).then(data=> {
	  		resolve(data);
	  	});
		});
	}
}
module.exports = EmpresasModel;