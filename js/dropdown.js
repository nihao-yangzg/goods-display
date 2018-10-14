'use strict';

var MenuDropdown = function(dom) {
    this.dom = dom
}
MenuDropdown.prototype = {
    menuDom: undefined,
    create: function(menus) {
        if (menus && menus.hasOwnProperty('length')) {
            this.initMenuDom();
            this.createDom(menus);

            this.dom.appendChild(this.menuDom);
            this.dom.addEventListener('mouseover', this.show(this.menuDom));
            this.dom.addEventListener('mouseout', this.hide(this.menuDom));
        }
    },
    initMenuDom: function() {
        this.menuDom = document.createElement('div');
        this.menuDom.className = "dropdown-content";
    },
    _createMenuItem: function(menu) {
        var link = document.createElement('a');
        link.setAttribute('href', menu['target']);
        link.text = menu['label'];
        return link
    },    
    createDom: function(menus) {
       if (menus && menus.length > 0) {
           var self = this;
            menus.forEach(function(menu, i) {
               self.menuDom.appendChild(self._createMenuItem(menu));
           })
       }
    },
    show: function(menuDom) {
        return function() {
            menuDom.style.display="block";
        }
    },
    hide: function(menuDom) {
        return function() {
            menuDom.style.display = 'none';
        }
    }
}