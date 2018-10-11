$(document).ready(function () {
	console.log('doemais');

	if (window.location.pathname !== '/') {
		$(".navbar").addClass('bg-white');
	} else {
		$(window).scroll(function () {
			$(this).scrollTop() > $("#intro").height() ? $(".navbar").addClass('bg-white') : $(".navbar").removeClass('bg-white');
		});
	}

	$('#contact-form').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			name: {
				required: "Este campo é obrigatório."
			},
			email: {
				required: "Este campo é obrigatório."
			},
			subject: {
				required: "Este campo é obrigatório."
			},
			message: {
				required: "Este campo é obrigatório."
			}
		},
		submitHandler: function (form) {
			$('.errors').hide();
			var form = $(form);
			var url = form.attr('action');

			$.ajax({
				type: "POST",
				url: url,
				data: form.serialize(),
				timeout: 3000,
				success: function (data) {
					window.location.href = '/thanks';
				},
				error: function (errors) {
					var output = '';
					if (errors.status == 0 || errors.statusText == 'timeout') {
						output = '<div class="alert alert-danger">Ocorreu um erro por favor tente novamente<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" >&times;</span></button></div>';
					} else {
						var res = errors.responseJSON.errors;
						res.forEach(function (item) {
							output += '<div class="alert alert-danger">' + item.msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" >&times;</span></button></div>';
						});
					}
					$('.errors').show().html(output);
				}
			});

			return false;
		}
	});
});
