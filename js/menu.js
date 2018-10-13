$(function(){
    var $nav = $('#nav');
    $nav.empty();
    $('body').prepend(
        '<div class="nav" id="nav">'
            + '<div class="fixed">' 
            +    '<ul>'
            // +        '<div class="dropdown" id="brand-menu">'
            // +            '<a href="#" class="dropbtn"  >Brand</a>'
            // +        '</div>'
            // +        '<div class="dropdown" id="product-menu">'
            // +            '<a href="#" class="dropbtn"  >Product</a>'
            // +        '</div>'
            +         '<div class="dropdown" id="catalog-menu">'
            +            '<a href="#" class="dropbtn">Catalogs</a>'
            +        '</div>'
            +        '<li><a href="../html/main.html" class="active">Home</a></li>'
            +    '</ul>'
            +'</div>'
        +'</div>'
    )
    // var brandmenu = new MenuDropdown(document.getElementById("brand-menu"));
    // brandmenu.create([
    //     {'target': 'http://www.baidu.com', 'label': 'Adidas'},
    //     {'target': '', 'label': 'Nike'},
    //     {'target': '', 'label': 'Lining'},        
    // ]);
    // var productMenu = new MenuDropdown(document.getElementById("product-menu"));
    // productMenu.create([
    //     {'target': 'http://www.baidu.com', 'label': 'shirt'},
    //     {'target': '', 'label': 'shoe'},
    //     {'target': '', 'label': 'hat'},        
    // ]);

    var catalogsMenu = new MenuDropdown(document.getElementById("catalog-menu"));
    $.ajax({
        url: '/api/catalogs/all',
        type: 'get',
        success: function(res){
            var catalogs = res.data;
            catalogsMenu.create(_formatConvert(catalogs));
        }
    })

    var _testCatalogs = [
        {'id': '123456', 'image': '../images/3.jpg', 'title': 'Women\'s Clothes'},
        {'id': '123456', 'image': '../images/4.jpg', 'title': 'Men\'s Clothes'},
        {'id': '123456', 'image': '../images/5.jpg', 'title': 'Underclothes'},
        {'id': '123456', 'image': '../images/9.jpg', 'title': 'Women\'s Shoes'},
        {'id': '123456', 'image': '../images/7.jpg', 'title': 'Men\'s Shoes'},
        {'id': '123456', 'image': '../images/10.jpg', 'title': 'Watch'},
        {'id': '123456', 'image': '../images/8.jpg', 'title': 'Jewelry'},
        {'id': '123456', 'image': '../images/11.jpg', 'title': 'Eye Glass'},
        {'id': '123456', 'image': '../images/12.jpg', 'title': 'Home textiles'},
        {'id': '123456', 'image': '../images/13.jpg', 'title': 'Cosmetic'},
        {'id': '123456', 'image': '../images/14.jpg', 'title': 'Toiletries'}
    ];
    function _formatConvert(_testCatalogs) {
        var final = [];
        if (_testCatalogs && _testCatalogs.length) {
            _testCatalogs.forEach(function(item, index){
                final.push({'label': item.title, 'target': '/html/index.html?catalogId='+item.id});
            })
        }
        return final;
    }

    // for test;
    catalogsMenu.create(_formatConvert(_testCatalogs));
})