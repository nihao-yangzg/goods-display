$(function(){
    var $nav = $('#nav');
    $nav.empty();
    $('body').prepend(
        '<div class="nav container" id="nav">'
            + '<div class="fixed">' 
            +    '<ul>'
            +        '<div class="dropdown" id="brand-menu">'
            +            '<a href="#" class="dropbtn"  >Brand</a>'
            +        '</div>'
            +        '<div class="dropdown" id="product-menu">'
            +            '<a href="#" class="dropbtn"  >Product</a>'
            +        '</div>'
            +        '<li><a href="../html/index.html" class="active">Home</a></li>'
            +    '</ul>'
            +'</div>'
        +'</div>'
    )
    var brandmenu = new MenuDropdown(document.getElementById("brand-menu"));
    brandmenu.create([
        {'target': 'http://www.baidu.com', 'label': 'Adidas'},
        {'target': '', 'label': 'Nike'},
        {'target': '', 'label': 'Lining'},        
    ]);
    var productMenu = new MenuDropdown(document.getElementById("product-menu"));
    productMenu.create([
        {'target': 'http://www.baidu.com', 'label': 'shirt'},
        {'target': '', 'label': 'shoe'},
        {'target': '', 'label': 'hat'},        
    ]);
})