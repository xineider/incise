'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class VerificacaoModel {
	VerificarUsuario(id, hash,nivel) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, id_empresa FROM usuarios WHERE id = ? AND hash_login = ? AND nivel = ?', [id, hash,nivel]).then(data => {
				resolve(data);
			});
		});
	}

	AddLog(ip, method, rota, user_agent, id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Insert('log', {ip: ip, method: method, rota: rota, user_agent: user_agent, id_usuario: id_usuario}).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = VerificacaoModel;
