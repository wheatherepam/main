define('components/settings/settingsView', [
    'Vendor',
    'text!./settingsTmpl.html',

], function (Vendor, settingsTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class =Vendor.util.Class,
        SettingsView;

    SettingsView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {

            this.options = _.extend({}, this.defaultOptions, options);

            this.tmpl = _.template(settingsTemplate);

            this.initialize();

        },

        initialize: function () {
            //Определяем что вставлять
            this.$holder = $(this.options.rootHolder);
            //Вставляем теиплейт в холдер
            this.$holder.append(this.tmpl({}));


        }


    });


    return SettingsView;

});