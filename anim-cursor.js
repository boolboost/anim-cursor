(function ($) {
	var $cursor = $('<div class="anim-cursor" style="position:absolute;display:none;pointer-events:none"/>');

	$(function () {
		$cursor.appendTo('body');
	});

	$.fn.animCursor = function (options) {
		options = $.extend({
			offset: {
				left: 0,
				top: 0
			},
			className: 'cursor'
		}, options);


		var status = {
			mouseenter: false,
			mousedown: false
		};

		return this.each(function () {

				$(this).on('mousedown', function () {
					status.mousedown = true;

					$cursor.addClass('state-down');
				});

				$(window).on('mouseup', function () {
					status.mousedown = false;

					$cursor.removeClass('state-down');
					if (!status.mouseenter) {
						$cursor.hide();
						$('body').css({cursor: ''});
					}
				});

				$(this).on('mouseenter', function () {
					status.mouseenter = true;
					$cursor.addClass(options.className).show();
					$('body').css({cursor: 'none'});
				});

				$(this).on('mouseleave', function () {
					status.mouseenter = false;
					if (!status.mousedown) {
						$cursor.hide();
						$('body').css({cursor: ''});
					}
				});

				$(window).on('mousemove', function (e) {
					var posCursor = {
						left: e.pageX,
						top: e.pageY
					};

					$cursor.css({
						left: posCursor.left - options.offset.left,
						top: posCursor.top - options.offset.top
					});
				});
			}
		)
	};

})
(jQuery);