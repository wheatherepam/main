define(['../components/dashboard/dashboard',
        '../components/search/search',
        '../components/setting/setting',
        '../components/model/collection'
],function (Dashboard, Search, Setting, Collection){

    setTimeout(function(){
        "use strict";
        new Dashboard();
    },800);
    setTimeout(function(){
        "use strict";
        new Search();
    },900);
    setTimeout(function(){
        "use strict";
        new Setting();
    },1000);

    return {};
});