'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class DocumentosModel {
	Login(POST) {
		// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
		query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
		array = [POST.login, POST.senha];
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			hlper.Query(query, array).then(data => {
			});
		});
	}
	VerDocumentosUsuario(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM documentos WHERE deletado = ? AND id_empresa = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	GetDocumentosTarefas(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT arquivo FROM documentos WHERE deletado = ? AND id_empresa = ?', [0, id]).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	DesativarDocumento(POST) {
		return new Promise(function(resolve, reject) {
			helper.Query('UPDATE documentos SET deletado = ? WHERE id = ? OR id_doc_pai = ?', [1, POST.id, POST.id]).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	GetDocumentos(id_empresa, id,nivel){
		return new Promise(function(resolve, reject) {
			var data = {};
			var ad_query = typeof nivel != 'undefined' & nivel == 3 ? ' AND id_empresa = ?' : '';
			var values = typeof nivel != 'undefined' & nivel == 3  ? [0,id_empresa,id] : [0,id];

			helper.Query('SELECT id_doc_pai FROM documentos WHERE id = ? AND id_doc_pai = ?',[id,0]).then(data_pai=>{
				data.excluir = data_pai.length>0 ? 0 : 1; 
				helper.Query('SELECT id, arquivo, tipo FROM documentos WHERE deletado = ?'+ad_query+' AND id_doc_pai = ?', values).then(data_documentos => {
					data.documentos = data_documentos;
	      	resolve(data);
				});
			});
		});
	}
	GetPastas(id_empresa,nivel) {
		return new Promise(function(resolve, reject) {
			var ad_query = typeof nivel != 'undefined' & nivel == 3 ? ' AND a.id_doc_pai = (SELECT b.id FROM documentos as b WHERE b.id_doc_pai = ? AND b.id_empresa = ?) AND a.id_doc_pai != ? AND a.id_empresa = ?' : ' AND a.id_doc_pai = ?';
			var values = typeof nivel != 'undefined' & nivel == 3  ? [0,1,0, id_empresa, 0,id_empresa] : [0,1,0];
			helper.Query('SELECT a.id, a.arquivo FROM documentos as a WHERE a.deletado = ? AND a.tipo = ?'+ad_query, values).then(data => {
      	resolve(data);
			});
		});
	}

	GetPastasTodas() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id, a.tipo, a.id_doc_pai, \
										IFNULL(CONCAT((\
											SELECT CONCAT((SELECT c.arquivo FROM documentos as c WHERE c.id = b.id_doc_pai), "/", b.arquivo)\
												FROM documentos as b WHERE b.id = a.id_doc_pai), "/", a.arquivo),\
													IFNULL(CONCAT((SELECT b.arquivo FROM documentos as b WHERE b.id = a.id_doc_pai), "/", a.arquivo), a.arquivo))\
														as arquivo FROM documentos as a WHERE a.deletado = ?  AND a.tipo = ?', [0, 1]).then(data => {
															console.log(data);
      	resolve(data);
			});
		});
	}

	CadastrarDocumento(POST) {
		return new Promise(function(resolve, reject) {

			helper.Query('SELECT id_empresa from documentos WHERE id= ?',[POST.id_doc_pai]).then(data_empresa =>{

				POST.documento_arquivo = helper.PrepareMultiple(POST.documento_arquivo, 'id_empresa', data_empresa[0].id_empresa);
				POST.documento_arquivo = helper.PrepareMultiple(POST.documento_arquivo, 'id_doc_pai', POST.id_doc_pai);

				helper.InsertMultiple('documentos', POST.documento_arquivo).then(id_arquivo => {
					resolve(id_arquivo);
				});
			});
		});
	}

	CadastrarPasta(POST) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id_empresa from documentos WHERE id= ?',[POST.id_doc_pai]).then(data_empresa =>{
				POST.id_empresa = data_empresa[0].id_empresa
				helper.Insert('documentos', POST).then(id_arquivo => {
					resolve(id_arquivo);
				});
			});
		});
	}
}			

module.exports = DocumentosModel;