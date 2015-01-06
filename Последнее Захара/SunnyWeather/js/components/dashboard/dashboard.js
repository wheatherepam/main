define(['vendor','./dashboardView','eventbus'], function(Vendor, View, eventbus){
   "use strict";
   var $ = Vendor.$,
       _ = Vendor._,
       moment = Vendor.m,
       Class = Vendor.utils.Class,
       Gallery = Vendor.utils.Gallery,
       Hammer = Vendor.Hammer,
       Dashboard;

   Dashboard = Class.extend({
      defaultOptions:{},
      constructor: function(opt){
         this.option = _.extend({},this.defaultOptions,opt);
         eventbus.on('ready', this.initialize, this);
         eventbus.on('updated', this.initialize, this);
      },
      initialize:function(data){
         this.render(data);
         this._initGallery();
         this._updateBtn();
      },
      render:function(data){
         var filteredData = [],
             self = this;
         _(data).forEach(function(o){
            var cr = o.forecast.currently,
                temp = {},
                hr = o.forecast.hourly,
                dl = o.forecast.daily;
               temp.city = o.city;
               temp.time = self._t.time(o.forecast.timezone);
               temp.day = self._t.day(o.forecast.timezone);
               temp.tale = self._t.tale(o.forecast.timezone);
               temp.month = self._t.month(o.forecast.timezone);
               temp.crnt = {};
                  temp.crnt.temp = cr.temperature^0;
                  temp.crnt.summary = cr.summary;
                  temp.crnt.icon = cr.icon;
                  temp.crnt.humidity = (cr.humidity * 100)^0; // return data between 0..1
                  temp.crnt.wSpeed = cr.windSpeed^0;
                  temp.crnt.wBearing = cr.windBearing;
                  temp.crnt.moonPhase = dl.data[1].moonPhase;
                  temp.crnt.sunRise = moment(dl.data[1].sunriseTime * 1000).format("H:mm");
                  temp.crnt.sunSet = moment(dl.data[1].sunsetTime * 1000).format("H:mm");
            /**
             * Adding data with forecast of 7 day
             * @type {Array}
             */
               temp.week = [];
               _(dl.data).forEach(function(o, i){
                  if(i >= 7) return;
                  temp.week.push(
                      {
                         max: o.temperatureMax^0,
                         min: o.temperatureMin^0,
                         icon: o.icon,
                         day: i == 0 ? "TODAY" : self._t.day(false, o.time*1000)
                     }
                  )
               });
               temp.hourly = [];
            _(hr.data).forEach(function(o, i){
               if(i >= 24) return;
               temp.hourly.push(
                   {
                      temp: o.temperature^0,
                      time: moment(o.time * 1000).format("H:mm"),
                      icon: o.icon
                   }
               )
            });
            filteredData.push(temp);
         });
         /**
         * Dashboard's view initiation
         */
         new View(filteredData);
      },
      _initGallery:function(){
         var initValue = localStorage.getItem('galleryState'),
             gallery = new Gallery($('#content-wrap'), $('#content'), $('.component'), initValue);
         /**
          * Event listeners adding
          */
         gallery.resizer();
         $(window).on('resize', function(){gallery.resizer()});
         $(window).on('orientationchange', function(){gallery.resizer()});
         /**
          * Pagination
          */
         $('#pagination').on('click', 'li', function(){
            gallery.moveTo($(this).data('index'));
         });
         /**
          * Listener for swipe events
          * Event listener added to the #content, argument shouldn't be a jQuery obj.
          */
         this.hammer = new Hammer( gallery.viewport[0]);
         this.hammer.on("swipeleft", function(){
            gallery.next();
         });
         this.hammer.on("swiperight", function(){
            gallery.prev();
         });
      },
      _updateBtn:function(){
         /**
          * Rotate update button buy tap on it
          */
         $(".icon-refresh").on("click",function(){
            eventbus.trigger('update');
            $(this).addClass("rotate");
            setTimeout(function() {
               $(".icon-refresh").removeClass("rotate");
            },500);
         });
      },
      /**
       * Functions-helpers for data time parsing
       */
      _t: {
         time: function (zone) {
            var h = 3600000; //  hour in ms
            if(moment().tz(zone).isDST()){
               return moment().tz(zone).format("H:mm");
            }
            return moment(moment() - h).tz(zone).format("H:mm");
         },
         day: function (zone, msTime) {
            if(msTime){
               var t = moment(msTime).format("dddd");
               return t.slice(0,3).toUpperCase();
            }
            return moment().tz(zone).format("dddd");
         },
         month: function (zone) {
            return moment().tz(zone).format("MMMM");
         },
         tale: function (zone) {
            return moment().tz(zone).format("DD");
         }
      }
   });
   return Dashboard;
});