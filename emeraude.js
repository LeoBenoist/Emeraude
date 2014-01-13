/**
 * @author Léo Benoist
 */
(function ($, window) {
    var Emeraude = {};

    Emeraude.linkToAjax = function (self) {
        self.click(function (e) {
            e.preventDefault();
            var href = self.attr('href');

            if(href.charAt(0) == '#'){
                href = href.substring(1);
            }

            $.ajax({
                type: 'GET',
                url: href,
                success: function (data) {
                    if(self.data('em-return-destination')){
                        $(self.data('em-return-destination')).html(data);

                        $(self.data('em-return-destination')).find("form[data-em-ajax='true']").each(function (i) {
                            var self = $(this);
                            Emeraude.formToAjax(self);
                        });
                    }
                }
            });

            if(self.data('em-ajax-remove') == true){
                $(this).remove();
            }

            if(self.data('em-ajax-switch-href')){
                var oldHref = self.attr("href");
                self.attr("href", self.data('em-ajax-switch-href'));
                self.data('em-ajax-switch-href', oldHref);
            }

            if(self.data('em-ajax-switch-class')){
                var oldClass = self.attr("class");
                self.attr("class", self.data('em-ajax-switch-class'));
                self.data('em-ajax-switch-class', oldClass);
            }

            if(self.data('em-ajax-switch-text')){
                var old = self.text();
                self.text(self.data('em-ajax-switch-text'));
                self.data('em-ajax-switch-text', old);
            }

            if(self.data('em-ajax-switch-once') == true){
                self.unbind('click');
            }
        });
    }

    Emeraude.linkToListener = function () {
        $("a[data-em-ajax='true']").each(function (i) {
            Emeraude.linkToAjax($(this));
        });
    }

    Emeraude.formToAjax = function (self, succesFundtion) {
        self.submit(function (e) {
            e.preventDefault();
            self.find('input[type="submit"], button[type="submit"]').attr("disabled", "disabled");
            $.ajax({
                type: 'POST',
                url: self.attr('action'),
                data: self.serialize(),
                success: function (data) {
                    if(self.data('em-ajax-enable') == true){
                        self.find('input[type="submit"], button[type="submit"]').removeAttr("disabled", "disabled");
                        self.find('input[type="text"], input[type="email"]').val('');
                    }else{
                        var dataTemp = data;
                        if(dataTemp.length > 100){
                            dataTemp = 'Error';
                        }
                        self.find('input[type="submit"], button[type="submit"]').val(dataTemp);
                        self.find('input[type="submit"], button[type="submit"]').text(dataTemp);
                    }
                    if(self.data('em-return-destination')){
                        $(self.data('em-return-destination')).html(data);
                        $(self.data('em-return-destination')).find("form[data-em-ajax='true']").each(function (i) {
                            var self = $(this);
                            Emeraude.formToAjax(self);
                        });
                    }
                    if (typeof succesFundtion !== "undefined") {
                        succesFundtion(data);
                    }
                }
            });

        });
    }

    Emeraude.formToAjaxListener = function () {
        $("form[data-em-ajax='true']").each(function (i) {
            var self = $(this);
            Emeraude.formToAjax(self);
        });
    }

    Emeraude.textToLink = function (self) {
        self.html(self.html());
    }

    Emeraude.textToLinkListener = function () {
        $("p[data-em-parse-link='true']").each(function (i) {
            var self = $(this);
            Emeraude.textToLink(self);
        });
    }

    Emeraude.linkToListener();
    Emeraude.formToAjaxListener();
    Emeraude.textToLinkListener();

    window.emeraude = Emeraude;
})($, window);
