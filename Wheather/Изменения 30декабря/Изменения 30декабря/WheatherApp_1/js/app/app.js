define('app/app',
    ['../components/page/pageView',
     '../components/board/boardView',
     '../components/settings/settingsView',

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

