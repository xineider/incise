'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class UsuariosModel {
	Usuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, \
										(SELECT b.nome_fantasia FROM empresas as b WHERE b.id = a.id_empresa) as empresa \
											FROM usuarios as a WHERE a.deletado = ? AND a.nivel>1 ORDER BY a.id',[0]).then(data => {
				resolve(data);
			});
		});
	}
	Ver_Usuario(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	InsertUsuario(table,POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert(table, POST).then(data => {
				resolve(data);
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
	DesativarUsuario(table, POST) {
		return new Promise(function(resolve, reject) {
	  	helper.Desativar(table, POST).then(data=> {
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
module.exports = UsuariosModel;