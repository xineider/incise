'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class VagasAbertasModel {
	Vagas() {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT a.* FROM vagas_abertas as a WHERE a.deletado = ? ORDER BY a.id', [0]).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}

	Ver_Vaga(id) {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT * FROM vagas_abertas WHERE deletado = ? AND id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	
	UpdateVaga(POST) {
		return new Promise(function (resolve, reject) {
			helper.Update('vagas_abertas', POST).then(data => {
				resolve(data);
			});
		});
	}
	DesativarVaga(POST) {
		return new Promise(function (resolve, reject) {
			helper.Desativar('vagas_abertas', POST).then(data => {
				resolve(data);
			});
		});
	}

	InsertVaga(POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert('vagas_abertas', POST).then(data => {
						resolve(data);
			});
		});
	}
}
module.exports = VagasAbertasModel;