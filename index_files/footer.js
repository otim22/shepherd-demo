/*
 * @author Shaumik Daityari
 */

(function () {
    var header = $("#header"),
        wrapper = $("#wrapper"),
        messages = $("#messages"),
        footer = $("#footer"),
        height = $(window).height(),
        difference = height - (header.height() + wrapper.height() + messages.height() + footer.height());

        if (difference > 0) {
            footer.css("margin-top", difference);
        }

})();