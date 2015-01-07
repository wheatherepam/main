define('app/app',
    ['../components/page/pageController',
     '../components/board/boardController',
     '../components/settings/settingsController'

    ], function(Page,Board,Settings) {
    'use strict';

        var App = function () {
             new Page({rootHolder:'#wrap'});
             new Board({rootHolder:'.gallery'});
             new Settings({rootHolder:'.settings'});
           // new Search();

        };

    return App;
});

