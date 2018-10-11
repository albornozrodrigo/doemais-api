$(document).ready(function() {
	console.log('doemais');

	if(window.location.pathname !== '/') {
		$(".navbar").addClass('bg-white');
	} else {
		$(window).scroll(function() {
			$(this).scrollTop() > $("#intro").height() ? $(".navbar").addClass('bg-white') : $(".navbar").removeClass('bg-white');
		});
	}

	$("#contact-form").submit(function(e) {
		$('.errors').hide();
		var form = $(this);
		var url = form.attr('action');
	
		$.ajax({
			type: "POST",
			url: url,
			data: form.serialize(),
			success: function(data) {
				window.location.href = '/thanks';
			},
			error: function(errors) {
				var res = errors.responseJSON.errors;
				var output = '';
				res.forEach(function(item) {
					output += '<div class="alert alert-danger">'+item.msg+'</div>';
				});
				$('.errors').show().html(output);
			}
		});
	
		e.preventDefault();
	});
});
