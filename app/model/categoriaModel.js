'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class CategoriaModel {
	Categoria() {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT a.* FROM node_categoria as a WHERE a.deletado = ? ORDER BY a.id', [0]).then(data => {
				
				console.log(data);
				resolve(data);
			});
		});
	}
	Ver_Categoria(id) {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT * FROM node_categoria WHERE deletado = ? AND id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}

	

	UpdateCategoria(table, POST) {
		return new Promise(function (resolve, reject) {
			helper.Update(table, POST).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	DesativarCategoria(table, POST) {
		return new Promise(function (resolve, reject) {
			helper.Desativar(table, POST).then(data => {
				resolve(data);
			});
		});
	}

	InsertCategoria(table,POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert(table, POST).then(data => {
						resolve(data);
			});
		});
	}
}
module.exports = CategoriaModel;