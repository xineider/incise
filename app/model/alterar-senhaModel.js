'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class DocumentosModel {

	Usuario(id,senhaAtual) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id = ? AND senha = ?', [0, id,senhaAtual]).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarPasta(POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert('documentos', POST).then(id_arquivo => {
				resolve(id_arquivo);
			});
		});
	}

	UpdateUsuario(table,POST) {
		return new Promise(function(resolve, reject) {
			helper.Update(table, POST).then(data => {
						resolve(data);
			});
		});
	}
}			

module.exports = DocumentosModel;