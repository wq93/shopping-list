/*
*  jQuery分页插件sPage
*  by 凌晨四点半
*  20190719
*  v1.1.0
*  https://github.com/jvbei/sPage
*/
; (function ($, window, document, undefined) {
    'use strict';
    var defaults = {
        page: 1,//当前页
        pageSize: 10,//每页显示多少条
        total: 0,//数据总条数
        showTotal: false,//是否显示总条数
        totalTxt: "共{total}条",//数据总条数文字描述
        showSkip: false,//是否显示跳页
        showPN: true,//是否显示上下翻页
        prevPage: "上一页",//上翻页按钮文字
        nextPage: "下一页",//下翻页按钮文字
        backFun: function (page) {
            //点击分页按钮回调函数，返回当前页码
        }
    };
    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this.pageNum = 1,
        this.pageList = [],
        this.init();
    }
    $.extend(Plugin.prototype, {
        init: function () {
            if (this.settings.total > 0) {
                this.viewHtml();
                this.clickBtn();
            }
        },
        creatHtml: function (i) {
            if (i == this.settings.page) {
                this.pageList.push('<span class="active" data-page=' + i + '>' + i + '</span>');
            } else {
                this.pageList.push('<span data-page=' + i + '>' + i + '</span>');
            }
        },
        viewHtml: function () {
            var settings = this.settings;
            var pageTatol = Math.ceil(settings.total / settings.pageSize);
            var pageArr = [];//分页元素集合，减少dom重绘次数
            this.pageNum = settings.page;
            this.element.empty();

            if (settings.showTotal) {
                pageArr.push('<div class="spage-total">' + settings.totalTxt.replace(/\{(\w+)\}/gi, settings.total) + '</div>');
            }
            pageArr.push('<div class="spage-number">');
            this.pageList = [];//页码元素集合，包括上下页
            if (settings.showPN) {
                settings.page == 1 ? this.pageList.push('<span class="span-disabled" data-page="prev">' + settings.prevPage + '</span>') : this.pageList.push('<span data-page="prev">' + settings.prevPage + '</span>');
            }
            if (pageTatol <= 6) {
                for (var i = 1; i < pageTatol + 1; i++) {
                    this.creatHtml(i);
                }
            } else {
                if (settings.page < 5) {
                    for (var i = 1; i <= 5; i++) {
                        this.creatHtml(i);
                    }
                    this.pageList.push('<span data-page="none">...</span><span data-page=' + pageTatol + '>' + pageTatol + '</span>');
                } else if (settings.page > pageTatol - 4) {
                    this.pageList.push('<span data-page="1">1</span><span data-page="none">...</span>');
                    for (var i = pageTatol - 4; i <= pageTatol; i++) {
                        this.creatHtml(i);
                    }
                } else {
                    this.pageList.push('<span data-page="1">1</span><span data-page="none">...</span>');
                    for (var i = settings.page - 2; i <= Number(settings.page) + 2; i++) {
                        this.creatHtml(i);
                    }
                    this.pageList.push('<span data-page="none">...</span><span data-page=' + pageTatol + '>' + pageTatol + '</span>');
                }
            }
            if (settings.showPN) {
                settings.page == pageTatol ? this.pageList.push('<span class="span-disabled" data-page="next">' + settings.nextPage + '</span>') : this.pageList.push('<span data-page="next">' + settings.nextPage + '</span>');
            }
            pageArr.push(this.pageList.join(''));
            pageArr.push('</div>');
            if (settings.showSkip) {
                pageArr.push('<div class="spage-skip">跳至&nbsp;<input type="text" />&nbsp;页&nbsp;&nbsp;<span data-page="go">go</span></div>');
            }
            this.element.html(pageArr.join(''));
            if (settings.showSkip) {
                this.element.children(".spage-skip").children("input").val(settings.page);
            }
        },
        clickBtn: function () {
            var that = this;
            var settings = this.settings;
            var ele = this.element;
            var pageTatol = Math.ceil(settings.total / settings.pageSize);
            this.element.off('click', "span");
            this.element.on('click', "span", function () {
                var pageText = $(this).data("page");
                switch (pageText) {
                    case "prev":
                        settings.page = settings.page - 1 >= 1 ? settings.page - 1 : 1;
                        pageText = settings.page;
                        break;
                    case "next":
                        settings.page = Number(settings.page) + 1 <= pageTatol ? Number(settings.page) + 1 : pageTatol;
                        pageText = settings.page;
                        break;
                    case "none":
                        return;
                    // break;
                    case "go":
                        var p = parseInt(ele.children(".spage-skip").children("input").val());
                        if (/^[0-9]*$/.test(p) && p >= 1 && p <= pageTatol) {
                            settings.page = p;
                            pageText = p;
                        } else {
                            return;
                        }
                        break;
                    default:
                        settings.page = pageText;
                }
                // 点击或跳转当前页码不执行任何操作
                if (pageText == that.pageNum) {
                    return;
                }
                that.pageNum = settings.page;
                that.viewHtml();
                settings.backFun(pageText);
            });
            this.element.on('keyup', "input", function (event) {
                if (event.keyCode == 13) {
                    var p = parseInt(ele.children(".spage-skip").children("input").val());
                    if (/^[0-9]*$/.test(p) && p >= 1 && p <= pageTatol) {
                        settings.page = p;
                        that.pageNum = p;
                        that.viewHtml();
                        settings.backFun(p);
                    } else {
                        return;
                    }
                }
            });
        }
    });

    $.fn.sPage = function (options) {
        return new Plugin(this, options);
    }

})(jQuery, window, document);
