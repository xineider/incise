// Eventos DOM
$(document).on('ready', function () {
	$('.modal').modal();
	// QUILL
	if($('#editor').length>0){
		var quill = new Quill('#editor', {
			theme: 'snow'
		});
	}
	if($('#tabela_filtrada').length>0){
		$('#tabela_filtrada').DataTable({			
			"paging":   false			
		});
	}

// FIM QUILL


adicionarLoader();
loadScripts();
FormatInputs();
activeCarousel();

$(document).on('change','.anexo-input', function(){
	$('.file-field').fadeOut();
});

$(document).on('click','.remove-arquivo',function() {
	$(this).parents('.remover_pai').remove();
	$('.file-field').fadeIn();
	$('.anexo-input').val('');
});

$('.menu-sistema-incise').height($('main').height());

$(document).ajaxComplete(function () {
	$('.collapsible').collapsible();
	loadScripts();
	FormatInputs();
	$('.menu-sistema-incise').height($('main').height());
	Materialize.updateTextFields();
	if($('#ajax-carousel').val()==0){
		$('#ajax-carousel').val(1);
	}else{
		$('#ajax-carousel').val(0)
	}
	$('#tabela_filtrada').DataTable({			
		"paging":   false			
	});

});
$(document).on('click', '.modal-remover-mount', function (e) {
	e.preventDefault();
	var modal = $(this).data('href');
	var texto = $(this).data('texto');
	var id = $(this).data('id');
	var to = $(this).data('to');
	var back = $(this).data('back');
	$(modal).modal('open');
	$(modal).find('#texto').text(texto);
	$(modal).find('#id').val(id);
	$(modal).find('button').data('href', to).data('action', back);
});

$(document).on('click', '.modal-pedir-aprovacao-pagamento-mount', function (e) {
	e.preventDefault();
	var modal = $(this).data('href');
	var texto = $(this).data('texto');
	var id_pagamento = $(this).data('id-pagamento');
	var to = $(this).data('to');
	var back = $(this).data('back');

	$(modal).modal('open');
	$(modal).find();

	/*Fazer botão de comprovante aparecer,limpar o input e remover a classe do anexo*/
	$(modal).find('.file-field').fadeIn();
	$(modal).find('.anexo-input').val('');
	$(modal).find('.remover_pai').remove();


	$(modal).find('#texto').text(texto);
	$(modal).find('#id_pagamento').val(id_pagamento);
	$(modal).find('button').data('href', to).data('action', back);
});

$(document).on('click', '.modal-aprovacao-pagamento-comp-mount', function (e) {
	e.preventDefault();

	var modal = $(this).data('href');
	var texto = $(this).data('texto');
	var id_pagamento = $(this).data('id-pagamento');
	var to = $(this).data('to');
	var back = $(this).data('back');
	/*Limpar textarea quando clicar para não ficar aparecendo depois de usar*/
	$(modal).find('#motivo_recusar_textarea').val('');
	$(modal).find('#texto').text(texto);
	$(modal).find('#id_pagamento').val(id_pagamento);
	$(modal).find('button').data('href', to).data('action', back);
	LoadComprovantes(id_pagamento,modal);
});


$(document).on('click', '.folder.active', function (e) {
	e.preventDefault();
	$(this).find('i:first-child:not(.fa-times)').toggleClass('fa-folder fa-folder-open');
	$(this).find('i:last-child').toggleClass('fa-caret-down fa-caret-up');
	if ($(this).data('ajax') == 1) {
		LoadArquivos($(this).data('id'), $(this));
	}
});

$(document).on('click', '.folder:not(.active)', function (e) {
	$(this).find('i:first-child:not(.fa-times)').toggleClass('fa-folder-open fa-folder');
	$(this).find('i:last-child').toggleClass('fa-caret-up fa-caret-down');
});

$(document).on('click', '.modal-mount', function (e) {
	e.preventDefault();     
	var modal = $(this).data('href');
	var link = $(this).data('link');
	MountModal(modal, link);
});
$(document).on('change', 'input[type="file"]', function () {
	console.log($(this));
	if($(this).hasClass('documento_input_file')){
		documentoUploadFile($(this));
	}
	else if($(this).val() != '') {
		UploadFile($(this));
	}
});
$(document).on('click', '.ajax-load', function(e) {
	e.preventDefault();
	var link = $(this).attr('href');
	console.log(link);
	GoTo(link, true);
});
$(document).on('click', '.ajax-submit', function(e) {
	e.preventDefault();
	var form = $(this).parents('form');
	var post = form.serializeArray();
	var link = $(this).data('href');
	var back = $(this).data('action');
	var metodo = $(this).data('method');
	var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
	if (VerificarForm(form) == true) {
		SubmitAjax(post, link, back, method);
	}
});


$(document).on('change', 'select[name="id_doc_pai"]', function (e) {
	if($(this).val() == 'Criar nova') {
		e.preventDefault();
		var modal = '#modalinfo2';
		var link = '/documentos/adicionar/pasta';
		MountModal(modal, link);
	}
});

								// var form = $(this).parents('form')[0];
								// var formData = new FormData(form);
								// // Main magic with files here
								// // formData.append('image', $('#foto_perfil')[0].files[0]); 
								// $.ajax({
								//     url: link,
								//     data: formData,
								//     type: 'POST',
								//     async: false,
								//     // THIS MUST BE DONE FOR FILE UPLOADING
								//     contentType: false,
								//     processData: false,
								//     dataType: "multipart/form-data",
								//     success: function (data) {
								//         console.debug(data);
								//     }, error: function (xhr, e, t) {
								//         console.debug((xhr.responseText));
								//     }
								// });
								$(document).on('submit', 'form:not(.submit-login)', function(e) {
									e.preventDefault();
								});
								$(document).on('change', '.cep', function () {
									GetEndereco($(this).val(), $(this).closest('.row'));
								});
								$(".button-collapse").sideNav();
								$('.change-bar').on('click', function () {
									if ($(this).data('ativo') == 'true') {
										changeBar(1);
									} else {
										changeBar(2);
									}
								});
								window.onpopstate = function() {
									GoTo(location.pathname, false);
								};
								$(document).on('change', '.empresa-banco', function () {
									LoadBancos($(this).val(), 'banco-empresa');
								});
								$(document).on('change', '.modo-emprestimo', function () {
									if ($(this).val() == 3) {
										$('.empresa-emprestimo').attr('disabled', false);
										DesativeOnConta(3);
									} else if ($(this).val() == 4) {
										LoadProprietarios($('select[name="id_empresa"]').val(), 'empregado_funcionario');
										DesativeOnConta(4);
									} else if ($(this).val() == 5) {
										LoadFuncionarios($('select[name="id_empresa"]').val(), 'empregado_funcionario');
										DesativeOnConta(5);
									} else {
										DesativeOnConta(0);
									}
								});
								$(document).on('change', '.empresa-emprestimo', function (e) {
									if ($(this).val() == $('.empresa-banco').val()) {
										alert('A empresa que realizara o emprestimo não pode ser a mesma a recebe-lo');
										$(this).val('');
									} else {
										LoadBancos($(this).val(), 'banco-empresa-emprestimo');
									}
								});
								$(document).on('change', '.observe-post', function () {
									if ($(this).val() != '') {
										$('.error').remove();
										$(this).removeClass('observe-post');
									}
								});

								$(document).on('click', '.alterar-senha-botao', function(e) {
									e.preventDefault();
									var form = $(this).parents('form');
									var post = form.serializeArray();
									var link = $(this).data('href');
									var back = $(this).data('action');
									var metodo = $(this).data('method');
									var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
									if (VerificarForm(form) == true) {
										SubmitAjax(post, link, back, method);
									}
									$('input[name="senha_atual"').val('');
									$('#alterar_senha').val('');
									$('#confirmar_alterar_senha').val('');
									$('.erro-alterar-senha').hide();

								});

		// Eventos Após DOM


	});
$(window).on('load', function (e) {
	removerLoader();
	FormatInputs();
	// loadScripts();

	// $('.servicos-carousel-item').css({
	//    'margin-left':0,
	//    'opacity': 1});

	// $('.servicos-carousel-item').animate({
	//  marginLeft:0
	// },10000);



	// setInterval(function() {
 //    $('.servicos-carousel-item').css({
	//    'margin-left':0,
	//    'opacity': 1});
 //  }, 3000); 
});
// Funções
var slideDepoimento = {};




function adicionarLoader() {
		//$('body').css('overflow', 'hidden');
		$('.loader').fadeIn('fast');
	}
	function removerLoader() {
		$('body').css('overflow', 'auto');
		$('.loader').fadeOut('fast');
	}
	function changeBar(tipo) {
		if (tipo == 1) {
			$('.change-bar').data('ativo', 'false').removeClass('ativo');
			$('.nav-wrapper').removeClass('mini-nav');
			$('header').removeClass('l1').addClass('l2');
				//$('main').removeClass('l11').addClass('l10').removeClass('offset-l1').addClass('offset-l2');
				$('#big-nav').css('display', 'block');
				$('#small-nav').css('display', 'none');
				localStorage.bar = 1;
			} else if (tipo == 2) {
				$('.change-bar').data('ativo', 'true').addClass('ativo');
				$('.nav-wrapper').addClass('mini-nav');
				$('header').removeClass('l2').addClass('l1');
				//$('main').removeClass('l10').addClass('l11').removeClass('offset-l2').addClass('offset-l1');
				$('#big-nav').css('display', 'none');
				$('#small-nav').css('display', 'block');
				localStorage.bar = 2;
			}
		}
		function InitBar() {
			if (localStorage.bar != 2 && localStorage.bar != 1) {
				localStorage.setItem("bar", 1);
			}
			changeBar(localStorage.bar);
		}
		function GoTo(link, state) {
			$.ajax({
				method: "GET",
				async: true,
				url: link,

				beforeSend: function(request) {
					if (window.location.href.indexOf("sistema") != -1){
						console.log('estou no GoTo');
						request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
						request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
						request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
					}
					adicionarLoader();
				},
				success: function(data) {
					$('main').html(data);
				},
		error: function(xhr) { // if error occured
			alert("Error, contate o administrador ou reinicie a pagina.");
		},
		complete: function() {
			removerLoader();
			$('.material-tooltip').remove();
			$('.tooltipped').tooltip({delay: 50});
			$('.modal').modal('close');
			$('.collapsible').collapsible();
			$('.button-collapse').sideNav('hide');
		}
	});
			if (state == true) {
				window.history.pushState('Sistema Quorp', 'Sistema Quorp', link);
			}
		}
		function FormatInputs(focus) {
			$('.cnpj').mask('00.000.000/0000-00', {reverse: true});
			$('.cpf').mask('000.000.000-00', {reverse: true});
			$('.rg').mask('AAAAAAAAAAAAA', {reverse: true});
			$('.cep').mask('00000-000');
			$('.valor').mask('000000000.00', {reverse: true});
			$('.tel').mask('(00) Z0000-0000', {
				translation: {
					'Z': {
						pattern: /[0-9]/, optional: true
					}
				}
			});
			$('.money').mask('000000000000000,00', {reverse: true});
			$('.dropdown-button').dropdown();
	//var options = { $AutoPlay: 1 };
	// var jssor_slider1 = new $JssorSlider$('slider1_container', options);

	$('.parallax').parallax();
	ActiveMaterializeInput(focus);
}

function loadScripts (){
	$('.carousel.carousel-slider').carousel({
		fullWidth: true,
		indicators: true});

	var primeiro = false;

	$(document).on('scroll', function (event) {         
		if ($(window).scrollTop() >= 200 && $(window).scrollTop() <= 1130 && primeiro == false) {
			primeiro = true;
			$('#circulo1').circleProgress({
				value: 0.92,
				size: 180,
				fill: '#006cbf'
			});
			$('.contador-titulo').removeClass('hide');
			$('#circulo2').circleProgress({
				value: 0.90,
				size: 180,
				fill: {
					gradient: ["#23F731", "#00FFEE","#00D1C3"]
				}
			});
			$('#circulo3').circleProgress({
				value: 0.85,
				size: 180,
				fill: {
					gradient: ["#F8FF29", "#FF7700"]
				}
			});
			$('#circulo4').circleProgress({
				value: 1,
				size: 180,
				fill: {
					gradient: ["#006400", "#228B22", "#00FF00"]
				}
			});
		}
	});
	criarDepoimentos();
}

function activeCarousel(){
	setTimeout(function() {
		if(typeof $('#ajax-carousel').val() != 'undefined'){
			$('.carousel').carousel('next');
		}
		activeCarousel();
	},5000);
}

function SubmitAjax(post, link, back, method) {
	console.log(post);
	console.log(link);
	console.log(back);
	console.log(method);
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			if (window.location.href.indexOf("sistema") != -1){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			}
			adicionarLoader();
		},
		success: function(data) {
			if (typeof data != undefined && data > 0) {
				Materialize.toast('<div class="center-align" style="width:100%;">Cadastrado com sucesso</div>', 5000, 'rounded');
			}
			if (typeof back != 'undefined' && back != '') {
				GoTo(back, true);
			}
			if (data == 'errorsenha') {
				$('form').prepend('<div class="card-panel red darken-1 center-align erro-alterar-senha" style="margin-bottom: 25px;"> <span class="white-text">Senha atual incorreta, tente novamente.</span> </div>');
			}
		},
		error: function(xhr) { // if error occured
			alert("Error, contate o administrador ou reinicie a pagina.");
		},
		complete: function() {
			removerLoader();
		}
	});
}
function Reestruturar(str) {
	var i = 1;
	$('.'+ str +' > div').each(function () {
		$(this).data('num', ''+i+'');
		i += 1;
	});
	return i;
}
function ActiveMaterializeInput(focus) {
	if (focus != undefined && focus != 'undefined') {
		console.log(focus);
		focus.first().focus();
		return true;
	}
	$('main textarea:not(disabled):not(.not_me)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
		}
	});
	$('main input:not(disabled):not(.not_me)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
			$('main input:not([disabled]):not([type="hidden"]):not(.not_me)').first().focus();
		}
	});
}
function MountModal(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			if (window.location.href.indexOf("sistema") != -1){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			}
			adicionarLoader();
		},
		success: function(data) {
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');
		},
		error: function(xhr) { // if error occured
			alert("Error, contate o administrador ou reinicie a pagina.");
		},
		complete: function() {
			removerLoader();
			$('.material-tooltip').remove();
			$('.tooltipped').tooltip({delay: 50});
			FormatInputs();
		}
	});
}

function VerificarForm() {
	var error = false;
	var textoErro = 'Complete Corretamente'

	$('.error').remove();
	$('input:enabled:not([type="hidden"])[required="true"]').each(function(){
		if(VerificaItem($(this),textoErro) == true) {
			error = true;
			return false;
		};

		if($('#alterar_senha').val() != $('#confirmar_alterar_senha').val())
		{
			AddError($('#confirmar_alterar_senha'),'Senhas são diferentes');
			error = true;
			return false;
		}
	});


	$('textarea:enabled[required="true"]').each(function(){
		if(VerificaItem($(this),textoErro) == true) {
			error = true;
			return false;
		};
	});
	$('select:enabled[required="true"]').each(function(){
		if(VerificaItem($(this),textoErro) == true) {
			error = true;
			return false;
		};
	});
	if (error == false) {
		return true;
	}
}
function VerificaItem(isso,texto) {
	if (isso.val() == '') {
		AddError(isso,texto);
		return true;
	}
}
function AddError(isso,texto) {
	isso.focus().addClass('observe-post').parent().append('<div class="error">'+texto+'</div>');
}

// function AddErrorText(isso,texto){

// }
function AddErrorAjax() {
	$('.error_ajax').fadeIn();
}
function DesativeOnConta(modo) {
	if (modo == 3) {
		$('.empregado_funcionario').attr('disabled', true).val('');
	} else if (modo == 4) {
		$('.empresa-emprestimo').attr('disabled', true).val('');
		$('.banco-empresa-emprestimo').attr('disabled', true).val('');
	} else if (modo == 5) {
		$('.empresa-emprestimo').attr('disabled', true).val('');
		$('.banco-empresa-emprestimo').attr('disabled', true).val('');
	} else {
		$('.empregado_funcionario').attr('disabled', true).val('');
		$('.empresa-emprestimo').attr('disabled', true).val('');
		$('.banco-empresa-emprestimo').attr('disabled', true).val('');
	}
}

function UploadFile(isso) {
	var link = isso.data('href');
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);

	$.ajax({
		url: link,
		type: 'POST',
		data: formData,
		dataType: 'json',
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			if (window.location.href.indexOf("sistema") != -1){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			}
			adicionarLoader();
		},
		success: function (data) {
			$('.file-path').val('').prop('required',false);

			isso.closest('.row').append('\
				<div class="col s12 m6 center-align relative remover_pai">\
				<div class="card-panel grey lighten-4">\
				<input type="hidden" name="arquivo" value="'+data+'">\
				<button class="btn-floating btn waves-effect waves-light red close-button remove-arquivo"><i class="fa fa-times" aria-hidden="true"></i></button>\
				<b>Arquivo: '+data+' <br>\
				</div>\
				</div>\
				');
			console.debug(data);
		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
		},
		complete: function() {
			removerLoader();
		}
	});
}


function documentoUploadFile(isso){
	var link = isso.data('href');
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);

	$.ajax({
		url: link,
		type: 'POST',
		data: formData,
		dataType: 'json',
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			if (window.location.href.indexOf("sistema") != -1){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			}
			adicionarLoader();
		},
		success: function (data) {
			$('.file-path').val('');
			isso.closest('.row').append('\
				<div class="col s12 m6 center-align relative remover_pai">\
				<div class="card-panel grey lighten-4">\
				<input type="hidden" name="documento_arquivo[arquivo][]" value="'+data+'">\
				<button class="btn-floating btn waves-effect waves-light red close-button remove-arquivo"><i class="fa fa-times" aria-hidden="true"></i></button>\
				<b>Arquivo: '+data+' <br>\
				</div>\
				</div>\
				');
			console.debug(data);
		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
		},
		complete: function() {
			removerLoader();
		}
	});
}
var conteudomostrar = [];



function slidesDepoimento(nomeAutor,imagemAutor,nomeEmpresa,depoimento){
	slideDepoimento = {
		author: {
			name: nomeAutor,
			url: '/',
			avatar: imagemAutor
		},
		company: {
			name: nomeEmpresa,
			url: ''
		},
		quote: depoimento
	}
	return slideDepoimento;
}

function criarDepoimentos(){
	var testimonial;
	var optionsTesti = {
		width: 650,
		timeout: 6000,
		autostart: true,
		slideCount: 3
	};
	if($('#testimonial-slider').length>0){
		testimonial = new Testimonial('#testimonial-slider', optionsTesti);
		testimonial.add(slidesDepoimento('Simone Breitenbach','/assets/imgs/depo_simone.jpg','','A Incise é a contadoria mais rápida e confiável da região de Porto Alegre'));
		testimonial.add(slidesDepoimento('Paulo Pazze','/assets/imgs/depo_paulopazze.jpg','','Meus problemas foram resolvidos pela Incise! Nota 10!'));
		testimonial.add(slidesDepoimento('Mateus Barcellos','/assets/imgs/depo_mateus.jpg','','Equipe ágil e competente. Adorei!'));
	}
}


function LoadComprovantes(id,modal){
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/pagamentos/comprovantes/'+id,
		beforeSend: function(request) {
			if (window.location.href.indexOf("sistema") != -1){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			}
			adicionarLoader();
		},
		success: function(data) {
			$('#comprovantes').html(data);
		},
		error: function(xhr) { // if error occured
			alert("Erro, contate o administrador ou reinicie a pagina.");
		},
		complete: function() {
			$(modal).modal('open');
			removerLoader();
		}
	});
}

function LoadArquivos(id, isso) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/documentos/arquivos/'+id,
		beforeSend: function(request) {
			if (window.location.href.indexOf("sistema") != -1){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			}
			adicionarLoader();
		},
		success: function(data) {
			isso.parent().find('.collapsible-body').html(data);
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			setTimeout(function(){}, 10000);
			removerLoader();
		}
	});
}



// var target = $('#contato_parallax');


// var targetHeight = target.outerHeight();

// $(document).scroll(function(e){
//  console.log(target);
//  console.log(targetHeight);
//  var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
//     if(scrollPercent >= 0){
//         target.css('opacity', scrollPercent);
//     }
// });