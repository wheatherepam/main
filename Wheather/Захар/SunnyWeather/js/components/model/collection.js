define(['vendor','./model'], function (Vendor, Model) {
    "use strict";
    var Class = Vendor.utils.Class,
        _ = Vendor._,
        mainCollection,
        Collection;

        Collection = Class.extend({
            defaultOptions: {},

            constructor: function (opt) {
                this.options = _.extend({}, this.defaultOptions, opt);
                this.collection = [];
                this.initialize();
            },

            initialize: function () {
                var self = this;


                this.addNew([{id:'CjQwAAAADu00FCzvsJWyoO-OrxJFhKvBpLTysNuEBIwcRJ6Wh8jO_FwvekK_xmPMQjC27rbPEhBd7tkyN18sFNIb1Eniqc56GhQXcQn2H8yzeYZHi8w0abtCm0qO_w', city:'Kiev'},
                            {id:'CjQuAAAAKnxJp0Sd3izOeJ6zFkrrzSqCieg5HJvyzIV8VvimZRw6Y2nDUAIIWeaCw29d_3_3EhA1wQ9dgzCeJGvxCe12VDgSGhSwpg53mWw8rSY2da980RPI9q_YVg', city:'London'},
                            {id:'CjQrAAAAalaIwoJ8P0Y7qml7SMcOUYLgNTYtWJekO1_NzeyjB_KE-VvYUdPpl4Zvk1Wxou5cEhDr5ni8qLJ4rXUtm3VuR5BGGhSOmQlRPzsVOc-9WMmCKlqwloIchA', city:'Instanbul'}]);

            },
            addNew: function(data) {
                var self = this,
                    temp = null;
                _(data).forEach(function(o){
                    temp = new Model(o.id, o.city);
                    self.collection.push(temp);
                });
            }
        });
    mainCollection = new Collection();
    window.d = mainCollection.collection;

    return mainCollection;
});