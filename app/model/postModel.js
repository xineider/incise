'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class PostModel {
	Post() {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT a.* FROM node_post as a WHERE a.deletado = ? ORDER BY a.id', [0]).then(data => {
				
				console.log(data);
				resolve(data);
			});
		});
	}
	Ver_Post(id) {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT * FROM node_post WHERE deletado = ? AND id = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}

	

	UpdatePost(table, POST) {
		return new Promise(function (resolve, reject) {
			helper.Update(table, POST).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	DesativarPost(table, POST) {
		return new Promise(function (resolve, reject) {
			helper.Desativar(table, POST).then(data => {
				resolve(data);
			});
		});
	}

	InsertPost(table,POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert(table, POST).then(data => {
						resolve(data);
			});
		});
	}
}
module.exports = PostModel;