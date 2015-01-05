(function ($) {

    var settings = {
        'wrapGallery': '.wrap-gallery',
        'gallery': '.gallery',
        'wrapContent': '.wrap-content',
        'item': '.item',
        'wrapCount': '.wrap-count',
        'counter': '.counter',
        'selected': '.selected',
        'start': 0
    }

    var items = [];

    var currentItem = 0;

    var galleryWidth;

    var manag={}

    var methods = {

        init: function () {

            galleryWidth = $(settings.gallery).width();

            //set wrapContent width
            $(settings.wrapContent).width(galleryWidth * (items.length + 1));


            for (var i = 0; i < items.length; i++) {

                //withdraw element in gallery
                var item = document.createElement('img')
                $(item).attr({'src': items[i]}).addClass('item');
                $(settings.wrapContent).append(item)

                //withdraw element in  counter and  set start gallery
                var counter = document.createElement('span');
                $(counter).addClass('counter');
                if (i == settings.start) {
                    $(counter).addClass('selected')
                }
                $(settings.wrapCount).append(counter)
            }
        },

        //Define shift of gallery
        shift: function (curitem) {
            var param= galleryWidth*curitem;
            $(settings.wrapContent).animate({'margin-left':-param},500)
        },

        addImg: function (file) {
            var order = 'img/' + file;
            items.push(order);
        },
        removeImageByIndex:function(index){
            items.splice(index,1)
        },

        size: function () {
            return items.length;
        },

        index: function (index) {
            $(item).removeClass(selected);
            $(item)[i].addClass(selected);
            return $(item)[i];
        },

        next: function () {
            if (currentItem <= items.length) {
                currentItem++;
            }
            else {
                currentItem = 0;
            }
        },

        prev: function () {
            if (currentItem == 0) {
                currentItem = items.length
            }
            else {
                currentItem--
            }
        }

    }

    $('.wrap-count').on('click', '.counter', function (e) {
        var current = e.target;

        $('.counter').removeClass('selected');

        $(current).addClass('selected');

        $(' .counter').each(function (i) {
            var cur = $('.counter')[i]
            if ($(cur).hasClass('selected')) {
                currentItem = i;
            }

        })

        methods.shift(currentItem);
    })

    $(settings.gallery).click(function(){
        methods.next();
        methods.shift(currentItem)
    })

    $.fn.Gallery = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.Gallery');
        }
    }
})(jQuery);



