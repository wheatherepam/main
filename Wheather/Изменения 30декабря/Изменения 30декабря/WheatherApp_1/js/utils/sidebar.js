define('sidebar',['jquery'],function($){

        function changeSideBar() {

            var change = document.getElementsByTagName('body')[0].getElementsByClassName('settings')[0];
            change.classList.toggle("leftmove");
        }

        function changeHideMenuIcon() {

            var change = document.getElementsByTagName('body')[0].getElementsByClassName('hide-menu')[0];
            change.classList.toggle("rightmove");
        }

        //var showhide = document.getElementsByClassName('hide-menu')[0];
        function Sidebar(){
            $('.hide-menu').click(function(){
                changeHideMenuIcon();
                changeSideBar();
            });
        };

return Sidebar;
});

