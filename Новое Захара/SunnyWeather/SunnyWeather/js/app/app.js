define(['../components/dashboard/dashboard',
        '../components/search/search',
        '../components/setting/setting',
        '../components/model/collection'
],function (Dashboard, Search, Setting, Collection){
    var APIKEY = '2294241a4a509e5c7aabcffe6f5ed44c';
    setTimeout(function(){
        "use strict";
        new Dashboard();
    },800);
    setTimeout(function(){
        "use strict";
        new Search();
    },800);
    setTimeout(function(){
        "use strict";
        new Setting();
    },800);

    return {};
});