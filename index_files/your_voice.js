/**
 * @author Shaumik Daityari
 * @copyright Copyright © 2013, The Blog Bowl, All rights reserved.
 */

var tbb = tbb || {};

tbb.yv = tbb.yv || {};

tbb.ajaxFunctions = tbb.ajaxFunctions || {};

(function(yv, ajaxFunctions) {

    "use strict";

    // Add ids of comments to get the DOM elements
    var css = {
        postId : "post-",
    }, formSubmitted = false,
    post_title = $("#id_title");

    //Function to be called on clicking Delete for a comment or a post
    yv.deleteItem = function (options) {

        var defaults = {
            deleteMessage : "Are you sure you want to delete this post? This process is not reversible.",
            deleteTitle : "Delete Post",
            deleteId : "comment-delete-dialog",
        }, deleteUrl, deleteDialog;

        options = options || {};

        options = $.extend({}, defaults, options);

        deleteDialog = $("#" + options.deleteId);

        deleteUrl = "/your_voice/" + options.postId + "/delete/";
 
        var buttonOptions = {
            "Delete Post":  function (){
                $.ajax({
                    type: "GET",
                    url: deleteUrl,
                    success: function(message) {
                        itemOnDelete(message, options.postId, options.type);
                    }
                });
                deleteDialog.dialog("close");
            },
            "Cancel" :  function () {
                deleteDialog.dialog("close");
            }
        };

        // Create dialog for the page if it doesn't exist
        if (!deleteDialog.length) {
            deleteDialog = $("<div />", {
                title: options.deleteTitle,
                text: options.deleteMessage,
                id: options.deleteId
            }).appendTo($("body"));
        }

        deleteDialog.dialog({
            autoOpen: true,
            width: ajaxFunctions.dialogWidth,
            modal: true,
            closeOnEscape: false,
            buttons: buttonOptions
        });
    };

    //Callback function for AJAX Request
    var itemOnDelete = function (responseMessage, id) {
        if (responseMessage === ajaxFunctions.successfulCode) {
            $("#" + css.postId + id).fadeOut();
        } else {
            ajaxFunctions.generateDialog(responseMessage);
        }
    };

    yv.save = function (id) {
        var url = "/your_voice/" + id + "/save/",
            form = $("#generic_form");

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function(message) {
                ajaxFunctions.generateDialog(message, {
                    "ACTION_COMPLETED_SUCCESSFULLY": "Your post was saved successfully",
                    "FORM_ERRORS": "Title, Content or Category can not be null."
                });
            },
            error: function(message) {
                ajaxFunctions.generateDialog();
            }
        });
    };

    // Changing variable not to call onunload if form submitted
    $("input[type=submit]").click(function () {
        formSubmitted = true;
    });

    yv.checkBeforeUnload = function () {
        var url = "/your_voice/" + yv.pk + "/check_before_unload/",
            form = $("#generic_form");

        if (!formSubmitted) {
            $.ajax({
                type : "GET",
                async: false,
                url : url,
                success : function(message) {},
                error : function(message) {} 
            });
        }
    };

    // Telling user about url change on changing the title of the post
    post_title.keyup( function () {
        post_title.attr("title", "Changing the title after publishing would change the URL of the post- you would lose existing likes and comments.");
        post_title.tooltip({
            position: {
                my: "left+15 center",
                at: "right center"
            },
            opacity: "0.7"
        });
        post_title.tooltip("open");
    });

})(tbb.yv, tbb.ajaxFunctions);