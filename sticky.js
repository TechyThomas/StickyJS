(function($) {
    $.fn.sticky = function(options) {
        var settings = $.extend({
            mode: "scroll",
            class: "now-sticky",
            trigger: "body",
            offset: 2
        }, options);

        var stickyElement = $(this);
        var lastScrollValue = 0;

        var elementHeight = stickyElement.outerHeight();
        var elementClass = stickyElement.attr("class");
        var positionProps = ["margin", "top", "bottom"];
        var elementPosition = stickyElement.css(positionProps);

        elementPosition["width"] = stickyElement.outerWidth();

        if (settings.mode == "scroll" || settings.mode == "header") {
            stickyElement.addClass("is-sticky");
        }

        var scrollOffset = settings.offset;

        if (settings.mode == "header") {
            $("body").css("padding-top", elementHeight);
            scrollOffset = $(settings.trigger).offset().top + settings.offset;
        }
        else if (settings.mode == "triggerStart") {
            settings.trigger = stickyElement;
            stickyElement.parent().append('<div class="sticky-trigger"></div>');
            scrollOffset = $(settings.trigger).offset().top + settings.offset;
        }
        else if (settings.mode == "triggerEnd") {
            settings.trigger = stickyElement;
            stickyElement.parent().append('<div class="sticky-trigger"></div>');
            scrollOffset = $(settings.trigger).offset().top + $(settings.trigger).outerHeight() + settings.offset;
        }

        $(window).scroll(function() {
            var currentScrollValue = $(this).scrollTop();
            
            if (currentScrollValue >= scrollOffset) {
                if (settings.mode == "triggerStart" || settings.mode == "triggerEnd") {
                    stickyElement.css("width", stickyElement.outerWidth());
                    $(".sticky-trigger").css(elementPosition).addClass(elementClass);
                }

                stickyElement.addClass("is-sticky" + " " + settings.class);

                if (currentScrollValue > lastScrollValue) {
                    if (settings.mode == "triggerStart" || settings.mode == "triggerEnd") {
                        $(".sticky-trigger").css({
                            "height": stickyElement.outerHeight(),
                            "background": "transparent"
                        });
                    }
                }
                else {
                    
                }
            }
            else {
                stickyElement.removeClass("is-sticky" + " " + settings.class);

                if (settings.mode == "triggerStart" || settings.mode == "triggerEnd") {
                    var resetCSS = positionProps.concat(["width", "height", "background"]);

                    for (var i = 0; i < resetCSS.length; i++) {
                        $(".sticky-trigger").css(resetCSS[i], "");
                    }

                    $(".sticky-trigger").removeClass(elementClass);
                }
            }

            lastScrollValue = currentScrollValue;
        });
    };
}(jQuery));