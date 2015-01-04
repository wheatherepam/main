define(function () {
    var Gallery = function (holder, viewport, item, initValue){
        this.holder = holder;
        this.viewport = viewport;
        this.items = item;
        this.activeItem = initValue || 0;
        this.pagination = $('#pagination');
        // pagination rendering
        this.moveTo(this.activeItem);
        this._render();
        this.resizer();
    };
    Gallery.prototype = {
        resizer: function(){
              this.items.css("width",  this.viewport.width());
              this.holder.css("margin-left", this.viewport.width() * this.activeItem * -1);
        },
        moveTo: function(k){
            this.activeItem = k;
            this._saveState();
            this.holder.css("margin-left", this.viewport.width() * k * -1);
            /**
             * adding highlights
             */
            this.pagination.find('li').removeClass('active');
            this.pagination.find('li').eq(k).addClass('active');
        },
        next: function(){
            if(this.items.length == +this.activeItem + 1) return;
            this.moveTo(+this.activeItem + 1);
        },
        prev: function(){
            if(this.activeItem == 0) return;
            this.moveTo(+this.activeItem - 1);
        },
        _render: function(){
            var documentFragment = $(document.createDocumentFragment()),
                elem;
            for(var i=0; i < this.items.length; i++){
                elem = $('<li/>');
                elem.data("index", i);
                if(this.activeItem == i){elem.addClass('active')}
                documentFragment.append(elem);
            }
            this.pagination.append(documentFragment);
        },
        _saveState: function(){
            localStorage.setItem('galleryState', +this.activeItem);
        }
    };
    return Gallery;
});