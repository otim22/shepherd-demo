/**
 * @author Shaumik Daityari
 * @copyright Copyright © 2013, The Blog Bowl, All rights reserved.
 */

/* global jQuery */

var tbb = tbb || {};

tbb.dashboard = tbb.dashboard || {};

(function($, dashboard) {
    "use strict";

    var defaults = {
        menuItemSelector: "dashboardMenuItem",
        currentClass: "current",
        hiddenClass: "hidden",
        dataItemSelector: "dashboardControlItem",
        dataIdSelector: "dashboard-",
        dataAttribute: "data",
        followerClassSelector: "follower"
    }, menuItems, dataItems, currentData, followers;

    dashboard.init = function (options) {
        options = options || {};

        // Overwrite defaults with user provided options if present
        options = $.extend(defaults, options);

        menuItems = $("." + defaults.menuItemSelector);
        dataItems = $("." + defaults.dataItemSelector);

        // Add click handler
        menuItems.click( function(element) {
            var currentClass = options.currentClass,
                hiddenClass = options.hiddenClass,
                currentElement = $(element.target),
                currentData = $("#" + defaults.dataIdSelector + currentElement.attr(options.dataAttribute));

            // Hiding every data item and removing current class from all menu items
            menuItems.removeClass(currentClass);
            dataItems.addClass(hiddenClass);

            // Unhiding the new data to be shown and adding current class to selected menu item
            currentData.removeClass(hiddenClass);
            currentElement.addClass(currentClass);

            // Initialize Nanoscroller again
            $(".nano").nanoScroller({ scroll: 'top' });
        });
    };

    dashboard.followers = function (options) {
        options = options || {};

        // Overwrite defaults with user provided options if present
        options = $.extend(defaults, options);

        followers = $("." + options.followerClassSelector);

        followers.hover(function () {
            var currentElement = $(this);

            $(currentElement.children()[1]).fadeIn();
        }, function () {
            var currentElement = $(this);

            $(currentElement.children()[1]).fadeOut();
        });
    };

})(jQuery, tbb.dashboard);