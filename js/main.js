// overlay.js
// author: Layne Tcheng
(function(globals){

    // track if overlay is already being shown
    globals.OVERLAY = {overlayIsShowing: false};

    /**
     *
     * @param options
     */
    var Overlay = function(content, options){
        this.options = options = typeof options !== 'undefined' ? options : {};

        var self = this;

        if (globals.OVERLAY.overlayIsShowing){
            console.warn("You can't open more than one overlay.");
            return;
        }

        var width = options.width,
            height = options.height,
            closeOnOutsideClick = typeof options.closeOnOutsideClick !== 'undefined' ? options.closeOnOutsideClick : true,
            closeOnInsideClick = typeof options.closeOnInsideClick !== 'undefined' ? options.closeOnInsideClick : false,
            loadingMessage = options.loadingMessage;

        // test if DOM node or string (image URL) content
        if (content instanceof Element) { // doesn't work in IE
            //modalContents = content;
        }
        else if (typeof(content) === 'string' || content instanceof String){
            // make an image element
            var imgContainer = jQuery("<div/>"), img = jQuery("<img/>");

            // if there's a loading msg, make a node for that and show it until the image is fully loaded
            if (loadingMessage){
                var loadingMsgNode = jQuery("<p>" + loadingMessage + "</p>", {
                    'class': 'overlay-loading'
                })
                    .appendTo(imgContainer);

                img.css('display', 'none')
                    .on('load', function(){
                        loadingMsgNode.css('display', 'none');
                        img.css('display', 'block');
                    });
            }

            img.attr('src', content)
                .on('load', function(){
                    self.center(); // image may re-size the div
                })
                .appendTo(imgContainer);

            content = imgContainer;
        }

        // create modal underlay
        var underlay = this.underlay = jQuery("<div/>", {
            'class': 'overlay-underlay'
        });

        if (closeOnOutsideClick){
            underlay.click(function(e){
                self.close();
                e.stopPropagation();
            });
        }

        underlay.appendTo('body');

        // create modal div container
        var container = this.container = jQuery("<div/>", {
            'class': 'overlay-modal'
        });

        // add the passed-in content to the container
        jQuery(content).appendTo(container);

        // optionally set width and height
        if (width){
            container.width(width);
        }
        if (height){
            container.height(height);
        }

        // close on inside click handler
        if (closeOnInsideClick){
            container.click(function(e){
                self.close();
                e.stopPropagation();
            });
        }

        // show the modal
        container.appendTo('body');
        globals.OVERLAY.overlayIsShowing = true;

        // center in viewport
        this.center();

        return this;
    }

    /**
     * Close the modal
     */
    Overlay.prototype.close = function(){
        this.container.remove();
        this.underlay.remove();
        globals.OVERLAY.overlayIsShowing = false;
    }

    /**
     * Centers the modal
     */
    Overlay.prototype.center = function(){
        // adapted from http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
        var container = this.container;
        container.css("top", Math.max(0, ((jQuery(window).height() - container.outerHeight()) / 2) +
            jQuery(window).scrollTop()) + "px")
            .css("left", Math.max(0, ((jQuery(window).width() - container.outerWidth()) / 2) +
                jQuery(window).scrollLeft()) + "px");
    }

    globals.Overlay = Overlay;

})(this);
