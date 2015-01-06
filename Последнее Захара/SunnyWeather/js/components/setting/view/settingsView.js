define(['jquery','jqueryUi','jqueryUiTouch'], function ($) {
    var render = function(){
        /**
         * Adding event listener to settings buttons and temperature controls
         */
        $(".slide-hide").on("click",function(){
            var side = $("#sidebar");
            if($(this).hasClass("hide-btn")){
                $(this).removeClass("hide-btn");
                side.css("left","");
                return;
            }
            $(this).addClass("hide-btn");
            side.css("left","100%");
        });
        /**
         * Show search input
         */
        $(".add-btn").on("click",function(){
            var search = $("#search-form");
            if(search.css("display") == "none"){
                $(this).css("color","red");
                search.css("display","inline-block");
            } else {
                search.css("display","none");
                $(this).css("color","#fff");
            }
        });
        /**
         * Adding temperature state button
         */
        $(".temp-f").on("click",function(){
            $(this).toggleClass("temp-active");
            $(".temp-c").toggleClass("temp-active");
        });
        $(".temp-c").on("click",function(){
            $(this).toggleClass("temp-active");
            $(".temp-f").toggleClass("temp-active");
        });
    };
    return {resizer:render};
});