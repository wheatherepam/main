define(['vendor','./searchModel'], function (Vendor, Model) {
    "use strict";
    var Class = Vendor.utils.Class,
        _ = Vendor._,
        SearchCollection,
        collection;

    SearchCollection = Class.extend({
        defaultOptions: {},

        constructor: function(opt){
            this.options = _.extend({}, this.defaultOptions, opt);
            this.collection = [];
            this.initialize();
        },
        initialize: function(){},

        sendResponse: function(str){
            var result = [],
                self = this,
                interval,
                autocomplete,
                options = {
                    types: ['(cities)'],

                    //Строка , которую ввёл пользователь
                    input: str
                };
            /**
             * Send request to google API
             * str - String , entered user's value in the search field
             */
            //Автокомплит объект гугла
            autocomplete = new google.maps.places.AutocompleteService();

            //Возвращает города по введенной букве
            autocomplete.getPlacePredictions( options, function(resp, code){
                if(code == "OK"){
                    result = resp;
                } else {
                    throw new Error('Server error, check your connection ' + code);
                }
            });
            /**
             * Check that google API send response
             * @type {number}
             */

            //Поскольку запрос асинхронный то, делаем сетинтервал, чтобы отловить пришло ли значение(даем маленькую задержку, чтобы всё прокатило)
            interval = setInterval(function(){
                if(result.length){
                    self._createCollection(result);
                    result = null;
                    clearInterval(interval);
                }
            }, 10, self);
        },
        getData: function(){
            return  this.collection;
        },
        /**
         *
         * @param array of objects with data for searched city
         * @private
         */
        //CОЗдаем данные, которые пришли с сет интервала
        _createCollection: function(arr) {
            var tmp = null,
                t_arr = [];
            console.log(arr);
            _(arr).forEach(function(el){

                //Тупо выводит то, что должно быть в seath после введение города. Id прокидывается в основную модель
                tmp = {
                    city: _(el.terms).first().value,
                    country: _(el.terms).last().value,
                    id: el.reference
                };
                /**
                 * Creating an Model's items that contain city and country as value
                 */
                //Это на случай расширения дополнительные функционалом(по суте сейчас не надо)
                t_arr.push( new Model(tmp));
            });
            /**
             * create models collection
             * @type {Array}
             */
            //Делаем глобальной
            this.collection = t_arr;
            $(this).trigger('changeCollection', this.collection);
        }
    });
    collection = new SearchCollection();
    return collection;
});