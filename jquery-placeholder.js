/*!
 * jQuery Placeholder Plugin v1.0
 *
 * code: https://github.com/uhtred/Placeholder
 *
 * Copyright (C) 2012 Daniel França(drfranca.com.br)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Author: Daniel Ribeiro França
 */

;(function($, window, document, undefined) {

	"use strict";

	$.fn.placeholder = function() {

		// Native placeholder feature detect
		if ('placeholder' in document.createElement('input')) {
			return this;
		}

		// Vars
		var fields = this,
			ph, self, hiddenPassword, passwordField;

		// Main Object
		ph = {

			clearPlaceholders: function() {
				fields.each(function() {
					if ($.trim(this.value) === $(this).attr('placeholder')) {
						this.value = '';
					}
				});
			},
			isEmpty: function(value) {
				return $.trim(value) === '';
			},
			focusout: function() {
				if (ph.isEmpty(this.value)) {

					if ($(this).attr('type') === 'password') {
						$(this).hide()
							.next('input').show();
					} else {

						$(this).css('color', "#aaa");
						this.value = $(this).attr('placeholder');

					}
				}
			},
			focusin: function() {
				$(this).css('color', $(this).data('placeholder-old-color'));

				if ($.trim(this.value) === $(this).attr('placeholder')) {
					this.value = '';
				}
			},
			focusPassword: function() {
				passwordField = $(this).hide()
					.prev('input').show();

				//IE's hack
				setTimeout(function() {
					passwordField.trigger('focus');
				}, 50);
			},
			preparePasswordPlaceholder: function(self) {
				hiddenPassword = $($('<div>').append(self.clone()).html().replace(/type=["]?password["]?/, 'type="text"'))
					.addClass('placeholder-password')
					.removeAttr('id name')
					.removeClass('placeholder');

				self.hide().after(hiddenPassword);

				return hiddenPassword;
			},
			preparePlaceholder: function(self) {

				self.val(self.attr('placeholder'))
					.data('placeholder-old-color', self.css('color'))
					.css("color", "#aaa");

				return self;
			}

		};

		// Events
		$(document.body)
			.on('focusin.placeholder', '.placeholder', ph.focusin)
			.on('focusout.placeholder', '.placeholder', ph.focusout)
			.on('focus.placeholder', '.placeholder-password', ph.focusPassword)
			.on('submit.placeholder', 'form', ph.clearPlaceholders);

		// Init
		return fields.each(function() {

			self = $(this);

			if (ph.isEmpty(this.value) || $.trim(this.value) === self.attr('placeholder')) {

				self.addClass('placeholder');

				if (self.attr('type') === 'password') {

					self = ph.preparePasswordPlaceholder(self);
				}

				ph.preparePlaceholder(self);

			}
		});
	};

})(jQuery, window, document);