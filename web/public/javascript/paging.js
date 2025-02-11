(function ($) {
	var zp = {
		init: function (obj, pageinit) {
			return (function () {
				zp.addhtml(obj, pageinit);
				zp.bindEvent(obj, pageinit);
			}());
		},
		addhtml: function (obj, pageinit) {
			return (function () {
				obj.empty();
				/*Previous Page*/
				if (pageinit.current > 1) {
					obj.append('<a href="javascript:;" class="prebtn">Previous</a>');
				} else {
					obj.remove('.prevPage');
					obj.append('<span class="disabled">Previous</span>');
				}
				/*Middle Page*/
				if (pageinit.current > 4 && pageinit.pageNum > 4) {
					obj.append('<a href="javascript:;" class="zxfPagenum">' + 1 + '</a>');
					obj.append('<a href="javascript:;" class="zxfPagenum">' + 2 + '</a>');
					obj.append('<span>...</span>');
				}
				if (pageinit.current > 4 && pageinit.current <= pageinit.pageNum - 5) {
					var start = pageinit.current - 2,
						end = parseInt(pageinit.current) + 2;
				} else if (pageinit.current > 4 && pageinit.current > pageinit.pageNum - 5) {
					var start = pageinit.pageNum - 4,
						end = pageinit.pageNum;
				} else {
					var start = 1,
						end = 9;
				}
				for (; start <= end; start++) {
					if (start <= pageinit.pageNum && start >= 1) {
						if (start == pageinit.current) {
							obj.append('<span class="current">' + start + '</span>');
						} else if (start == pageinit.current + 1) {
							obj.append('<a href="javascript:;" class="zxfPagenum nextpage">' + start + '</a>');
						} else {
							obj.append('<a href="javascript:;" class="zxfPagenum">' + start + '</a>');
						}
					}
				}
				if (end < pageinit.pageNum - 4) {
					obj.append('<span>...</span>');
				}
				/*Next Page*/
				if (pageinit.current >= pageinit.pageNum) {
					obj.remove('.nextbtn');
					obj.append('<span class="disabled">Next</span>');
				} else {
					obj.append('<a href="javascript:;" class="nextbtn">Next</a>');
				}
				/*End*/
				obj.append('<span>' + 'Totally&nbsp' + '<b>' + pageinit.pageNum + '</b>' + '&nbspPages,' + '</span>');
				obj.append('<span>' + '&nbspGo to page' + '<input type="number" class="zxfinput" value="1"/>' + '.' + '</span>');
				obj.append('<button class="zxfokbtn btn btn-lg" id="zxfokbtn-confirm">' + 'Confirm' + '</button>');
			}());
		},
		bindEvent: function (obj, pageinit) {
			return (function () {
				obj.on("click", "a.prebtn", function () {
					var cur = parseInt(obj.children("span.current").text());
					var current = $.extend(pageinit, {
						"current": cur - 1
					});
					zp.addhtml(obj, current);
					if (typeof (pageinit.backfun) == "function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click", "a.zxfPagenum", function () {
					var cur = parseInt($(this).text());
					var current = $.extend(pageinit, {
						"current": cur
					});
					zp.addhtml(obj, current);
					if (typeof (pageinit.backfun) == "function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click", "a.nextbtn", function () {
					var cur = parseInt(obj.children("span.current").text());
					var current = $.extend(pageinit, {
						"current": cur + 1
					});
					zp.addhtml(obj, current);
					if (typeof (pageinit.backfun) == "function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click", "button.zxfokbtn", function () {
					var cur = parseInt($("input.zxfinput").val());
					var current = $.extend(pageinit, {
						"current": cur
					});
					zp.addhtml(obj, {
						"current": cur,
						"pageNum": pageinit.pageNum
					});
					if (typeof (pageinit.backfun) == "function") {
						pageinit.backfun(current);
					}
				});
				obj.on('input propertychange', '.zxfinput', function () {
					var page = $(this).val();
					if (parseInt(page) > pageinit.pageNum) {
						$("#zxfokbtn-confirm").attr("class", $("#zxfokbtn-confirm").attr("class") + " disabled");
					} else {
						$("#zxfokbtn-confirm").attr("class", $("#zxfokbtn-confirm").attr("class").replace(" disabled",""));
					}
				});

			}());
		}
	}
	$.fn.createPage = function (options) {
		var pageinit = $.extend({
			pageNum: 15,
			current: 1,
			backfun: function () {}
		}, options);
		zp.init(this, pageinit);
	}
}(jQuery));