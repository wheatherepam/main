define(['../components/dashboard/dashboard',
        '../components/search/search',
        '../components/setting/setting',
        '../components/model/collection'
],function (Dashboard, Search, Setting, Collection){
        new Dashboard();
        new Search();
        new Setting();
        new Collection();
});