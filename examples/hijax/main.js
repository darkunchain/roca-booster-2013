/*jslint vars: true, white: true */
/*global jQuery */

(function($) {

"use strict";

var notification = $('<p id="notification" />').prependTo(document.body).hide();

// hijack navigation links
$("#nav").on("click", "a", function(ev) {
	var url = $(this).attr("href");
	$("#content").load(url + " #content", notify);
	ev.preventDefault();
});

// hijack form submissions
$("form").on("submit", function(ev) {
	var form = $(this);
	var uri = form.attr("action");
	var method = form.attr("method") || "get";
	$.ajax({
		url: uri,
		type: method,
		success: function(html, status, xhr) {
			var selector = "#content";

			html = jQuery.parseHTML(html); // sanitize
			html = $("<div />").append(html).find(selector);
			$(selector).html(html);

			notify(html, status, xhr);
		}
	});
	ev.preventDefault();
});

function notify(data, status, xhr) {
	var cls = "alert alert-" + status;
	notification.text(status).
			removeAttr("class").addClass(cls).
			finish().slideDown().delay(1000).slideUp();
}

}(jQuery));
