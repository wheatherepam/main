$(document).ready(function () {
    var flag = $(this).hasClass('checked-unit');

    $('#change-c').click(function () {
        if (!flag) {
            var kelvin = document.getElementsByClassName('degree-val');
            for (var i = 0; i < kelvin.length; i++) {
                var curkelvin = parseInt(kelvin[i].innerHTML);
                var curkcelje = curkelvin - 32;
                kelvin[i].innerHTML = curkcelje;
                $('#change-c').addClass('checked-unit');
                $('#change-f').removeClass('checked-unit');
                $('.degree').removeClass('celje-val');
            }

        }
    })

    $('#change-f').click(function () {
        if (!flag) {
            //$(this).addClass('checked-unit');
            $('#change-c').removeClass('checked-unit');
            var celje = document.getElementsByClassName('degree-val');
            for (var i = 0; i < celje.length; i++) {
                var curcelje = parseInt(celje[i].innerHTML);
                var curkelvin = curcelje + 32;
                celje[i].innerHTML = curkelvin;
                $('#change-f').addClass('checked-unit');
                $('#change-c').removeClass('checked-unit');
                $('.degree').removeClass('kelvin-val')
            }
        }
    })
})