define('app/app',
    ['../components/page/pageController',
     '../components/board/nBoardController',
     '../components/search/searchController',
     '../components/settings/settingsController'


    ], function(Page,Board,Search,Settings) {
    'use strict';

        var App = function () {
             new Page({rootHolder:'#wrap'});
             new Board({rootHolder:'.move-gallery'});
             new Search({rootHolder:'.changed-places'});
             new Settings({rootHolder:'.bot-wrap'});
        };

    return App;
});

