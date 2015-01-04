define(['vendor','./dashboardView'], function(Vendor, View){
   "use strict";
   var $ = Vendor.$,
       _ = Vendor._,
       moment = Vendor.m,
       Class = Vendor.utils.Class,
       Gallery = Vendor.utils.Gallery,
       Hammer = Vendor.Hammer,
       Dashboard;

   Dashboard = Class.extend({
      defaultOptions:{
          initValue : localStorage.getItem('galleryState')
      },
      constructor: function(opt){
         this.option = _.extend({},this.defaultOptions,opt);
         this.initialize();
      },
      initialize:function(){

         //Заходит для рендера
         this.render(window.d);
         this._initGallery(this, this.option.initValue);
      },

      //Заглушка парсится
      render:function(data){
         var filteredData = [],
             self = this,
             temp = {};

         //temo.city -кастомная
         _(data).forEach(function(o){
            var cr = o.forecast.currently,
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
               temp.week = [
                  {
                     max: dl.data[0].temperatureMax^0,
                     min: dl.data[0].temperatureMin^0,
                     ico: dl.data[0].icon,
                     day: "TODAY"
                  },
                  {
                     max: dl.data[1].temperatureMax^0,
                     min: dl.data[1].temperatureMin^0,
                     ico: dl.data[1].icon,
                     day: self._t.day(false, dl.data[2].time*1000)
                  },
                  {
                     max: dl.data[2].temperatureMax^0,
                     min: dl.data[2].temperatureMin^0,
                     ico: dl.data[2].icon,
                     day: self._t.day(false, dl.data[3].time*1000)
                  },
                  {
                     max: dl.data[3].temperatureMax^0,
                     min: dl.data[3].temperatureMin^0,
                     ico: dl.data[3].icon,
                     day: self._t.day(false, dl.data[4].time*1000)
                  },
                  {
                     max: dl.data[4].temperatureMax^0,
                     min: dl.data[4].temperatureMin^0,
                     ico: dl.data[4].icon,
                     day: self._t.day(false, dl.data[5].time*1000)
                  },
                  {
                     max: dl.data[5].temperatureMax^0,
                     min: dl.data[5].temperatureMin^0,
                     ico: dl.data[5].icon,
                     day: self._t.day(false, dl.data[6].time*1000)
                  },
                  {
                     max: dl.data[6].temperatureMax^0,
                     min: dl.data[6].temperatureMin^0,
                     ico: dl.data[6].icon,
                     day: self._t.day(false, dl.data[7].time*1000)
                  }
               ];
               temp.hourly = [];
            filteredData.push(temp);
               temp = {};
         });
         /**
         * Dashboard's view initiation
         */

         //Отфильтрованные данные для вьюхи
         new View(filteredData);
      },
      _initGallery:function(that, initValue){
         var gallery = new Gallery($('#content-wrap'), $('#content'), $('.component'), initValue);
         /**
          * Event listeners adding
          */
         gallery.resizer();
         $(window).on('resize', function(){gallery.resizer()});
         $(window).on('orientationchange', function(){gallery.resizer()});
         /**
          * Pagination
          */
         $('#pagination').on('click', 'li' , function(){
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