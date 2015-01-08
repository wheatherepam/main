define('app/app',
    ['../components/page/pageController',
     '../components/board/boardController',
     '../components/search/searchController',
     '../components/settings/settingsController'


    ], function(Page,Board,Search,Settings) {
    'use strict';

        var App = function () {
             new Page({rootHolder:'#wrap'});
             new Board({rootHolder:'.gallery'});
             new Search({rootHolder:'.left-wrap-iphone'});
             new Settings({rootHolder:'.bot-wrap'});
        };

    return App;
});

