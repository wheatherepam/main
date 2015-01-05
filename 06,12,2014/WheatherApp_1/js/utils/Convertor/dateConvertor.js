define(['Vendor'],function(Vendor){

   var moment=Vendor.moment,
       tz=Vendor.moment_tz;

    return{

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