/**
 * @author Shaumik Daityari
 * @copyright Copyright © 2013, The Blog Bowl, All rights reserved.
 */

var tbb = tbb || {};

tbb.nucleus = tbb.nucleus || {};

tbb.ajaxFunctions = tbb.ajaxFunctions || {};

(function(nucleus, ajaxFunctions) {

    var css = {
        follow : "blogger-follow-",
        upvote : "post-upvotes-",
        upvoteParent : "post-upvotes-link-",
        grayClass : "notupvoted",
        greenClass : "upvoted"
    };

    nucleus.bloggerFollow = function(slug) {
        var followUrl = "/blogger/" + slug + "/follow/",
            anchor = $("#" + css.follow + slug),
            followText = "Follow",
            unfollowText = "Unfollow";

        $.ajax({
            type: "GET",
            url: followUrl,
            success: function(message) {
                if (message === ajaxFunctions.successfulCode) {
                    anchor.text(anchor.text().trim() === followText ? unfollowText : followText);
                } else {
                    ajaxFunctions.generateDialog(message);
                }
            }
        });
    };

    nucleus.upvotePost = function(slug, isContest) {
        var followUrl = "/blog/" + slug + "/upvote/",
            anchor = $("#" + css.upvote + slug),
            anchorParent = $("#" + css.upvoteParent + slug),
            upvotes = parseInt(anchor.text().trim()),
            responses = {
                upvote : "UPVOTED",
                downvote : "DOWNVOTED"
            };

        if (isContest) {
            followUrl = "/contests" + followUrl;
        }

        $.ajax({
            type: "GET",
            url: followUrl,
            success: function(message) {
                if (message === responses.upvote) {
                    anchor.text(upvotes + 1);
                    anchorParent.removeClass(css.grayClass);
                    anchorParent.addClass(css.greenClass);
                } else if (message === responses.downvote) {
                    anchor.text(upvotes - 1);
                    anchorParent.removeClass(css.greenClass);
                    anchorParent.addClass(css.grayClass);
                } else {
                    ajaxFunctions.generateDialog(message);
                }
            }
        });

    };

})(tbb.nucleus, tbb.ajaxFunctions);
