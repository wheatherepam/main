define(['vendor'] , function(Vendor) {
    var Hammer = Vendor.Hammer;
    $.fn.scrollbarInit = function(K){
        var handler = $(this),
            parent = handler.parent(),
            limit, handlerMove, handlerPan, currentLeft, initLeft, prevPos, newPos;
        /**
         * move scrollbar handler by pan event (iphone + ipad)
         */
        handlerPan = function(e){
            newPos = initLeft + e.deltaX;

            if(newPos < 0) newPos = 0;
            if(newPos > limit) newPos = limit;

            $(handler).css("left", newPos);
            $(".hours-holder").find("ul").css("left", ( newPos * K ) * -1);
        };
        /**
        * Adding listeners to pan events
        */
        function hammerListener(){
            /**
             * Get initial left position of handler and calculate offset from it
             * @type {Number}
             */
            limit = $(".hw-slider-box").width() - $(handler).width();
            initLeft = parseInt($(handler).css("left"));
        }
        /**
        * Adding event listener to handlers in each page with cities
        * @type {Hammer}
        */
        $.each(handler , function(i , val){
            "use strict";
            var hammer = new Hammer(val);
            hammer.on("panstart", hammerListener);
            hammer.on("panmove", handlerPan);
        });
        /**
         * move scrollbar handler by mousedown event
         */
        handlerMove = function(){
            limit = $(".hw-slider-box").width() - $(handler).width();
            $(document).on("mousemove",function(e){
                /**
                 * calculate new position of handler
                 * @type {number}
                 */
                prevPos = prevPos || e.clientX;
                currentLeft = parseInt($(handler).css("left"));
                newPos = currentLeft + e.clientX - prevPos;
                prevPos = e.clientX;

                if(newPos < 0) newPos = 0;
                if(newPos > limit) newPos = limit;
                $(handler).css("left", newPos);
                /**
                 * Move slider  to synchronize it with scrollbar handler
                 */
                parent.prev().css("left", ( newPos * K ) * -1);
            });
        };
        /**
         * Attach mouse event
         */
        $(handler).on("mousedown", handlerMove);
        /**
         * detach after mouse up
         */
        $(document).on("mouseup",function(){
            prevPos = null;
            currentLeft = null;
            $(document).off("mousemove");
        });
    };
    $.fn.hoursSlider = function(K){
        var self = $(this);
        $(this).on("mousedown",function(){
            var holder = $(this),
                prevPos,
                delta,
                currentLeft,
                parent = holder.parent(),
                limitCord = ($(holder).width() - ($(holder).find("li").width()*5.5)) * -1;
            /**
             * Calculate max-limit position , holder width + width of element with weather data (5 li elem) that
             * display in the one slide
             * @type {number}
             */
            $(document).on("mousemove",function(e){

                currentLeft = parseInt($(holder).css("left"));
                /**
                 * Set coordinate of first mousedown position if previous position doesn't exist
                 * @type {*|number|Number}
                 */
                prevPos = prevPos || e.clientX;
                /**
                 * Calculate delta of current and previous mouse position and stack it with the left coordinate
                 * @type {number}
                 */
                delta = currentLeft + e.clientX - prevPos;
                prevPos = e.clientX;
                /**
                 * check limit position
                 */
                ( delta <=  limitCord ) ? delta = limitCord : false;
                ( delta >= 0 ) ? delta = 0 : false;
                $(holder).css("left", delta);
                /**
                 * Move scrollbar handler to synchronize it with slider
                 */
                parent.find(".w-slider").css("left", ( Math.abs(delta) / K ));
            });
            $(document).on("mouseup",function(){
                prevPos = null;
                currentLeft = null;
                $(document).off("mousemove");
            });
        });

    };
});
