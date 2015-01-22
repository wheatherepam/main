define('components/page/pageController',[
    './pageView',
    'Vendor'],function(PageView,Vendor){
    'use strict';

    var $=Vendor.$,
        _=Vendor._,
        Class=Vendor.util.Class,
        Page;



    Page=Class.extend({

        defaultOptions:{},

        constructor:function(options){
            this.options= _.extend({},this.defaultOptions,options);
            this.initialize();
        },

        initialize:function(){

            this.view=new PageView({rootHolder: this.options.rootHolder});
            this.attachEvent();
        },

        attachEvent:function(){

            this.modeSideBar();

        } ,

        modeSideBar:function(){

            function changeSideBar() {
                var change = document.getElementsByTagName('body')[0].getElementsByClassName('settings')[0];
                change.classList.toggle("leftmove");
            }

            function changeHideMenuIcon() {
                var change = document.getElementsByTagName('body')[0].getElementsByClassName('hide-menu')[0];
                change.classList.toggle("rightmove");
            }

            $('.hide-menu').click(function(){
                changeHideMenuIcon();
                changeSideBar();
            });
        }
    });

    return Page;

});