define(['Vendor','./Forecast'],function(Vendor,Model){

    var Class=Vendor.util.Class,
        _=Vendor._,
        SearchModel;

    SearchModel=Class.extend({

            /*Model take string on input and returns id and description of find place*/
            constructor: function (str) {
                this.id = null;
                this.filterData = [];
                this.options = _.extend({}, str);
                this.filter(str);
            },

            filter: function (str) {
                var selfFilter=this;
                var inputdata = new Model(str);

                $.when(inputdata.promise).then(function(){
                    _(inputdata.forecast).forEach(function (key) {
                            var temp={};
                            temp.city=key.description;
                            temp.id=key.id;
                            selfFilter.filterData.push(temp);
                        });
                });
            }
    });

 return SearchModel;

});