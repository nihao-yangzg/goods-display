$(function() {
    var catalogs;
    $.ajax({
        url: '/api/main/catalogs',
        type: 'get',
        dateType: 'json',
        success: function(res) {
            catalogs = res.data;
        },
        error: function(err) {
            // console.log(err.responseText);
        }
    })
    catalogs = [
        {'id': '123456', 'image': '../images/Adidas.jpg', 'title': 'Adidas', 'number': 40},
        {'id': '123456', 'image': '../images/Nike.jpg', 'title': 'Nike','number': 13},
        {'id': '123456', 'image': '../images/Calvin Klein.jpg', 'title': 'Calvin Klein','number': 20},
        {'id': '123456', 'image': '../images/GUCCI.jpg', 'title': 'GUCCI', 'number': 17},
        {'id': '123456', 'image': '../images/LOUIS VUITTON.jpg', 'title': 'LOUIS VUITTON', 'number': 25},
        {'id': '123456', 'image': '../images/PLAYBOY.jpg', 'title': 'PLAYBOY', 'number': 13},
        {'id': '123456', 'image': '../images/PUMA.jpg', 'title': 'PUMA', 'number': 32}
    ];
    catalogs.sort(function(a,b){
        return -(a['number'] - b['number']);
    })
    console.log(catalogs);
    var $catalogs = $('#catalogs'),
        $menus = $('#menus');
   
    function showCatalogs(catalogs, $catalogs, $menus) {
        var liDom, divDom, imgDom, spanDom;
        var menuLiDom, menuADom;
        catalogs.forEach(function(item,index) {
            liDom = document.createElement('li');
            liDom.setAttribute('data-id', item['id']);

            divDom = document.createElement('div');
            divDom.setAttribute('class', 'catalog');

            imgDom = document.createElement('img');
            imgDom.setAttribute('src', item['image']);
            imgDom.setAttribute('alt', item['title']);

            spanDom = document.createElement('span');
            spanDom.innerText = item['title'] + '(' + item['number'] + ')';

            divDom.appendChild(imgDom);
            divDom.appendChild(spanDom);

            liDom.append(divDom);

            $catalogs.append($(liDom));

            menuLiDom = document.createElement('li');
            menuLiDom.setAttribute('data-id', item['id']);

            menuADom = document.createElement('a');
            menuADom.innerText = item['title'] ;

            menuLiDom.appendChild(menuADom);

            $menus.append($(menuLiDom));
        })
    }
    showCatalogs(catalogs, $catalogs, $menus);

    $('#menus, #catalogs').on('click', function(e){
        var target = e.target;
        var $target = $(target);
        console.log(target.nodeName);
        var catalogId ;
        if (target.nodeName === 'LI') {
            catalogId = $target.attr('data-id');
        } else {
            catalogId = $target.parents('li[data-id]').attr('data-id');
        }
        window.open('/html/index.html?catalogId=' + catalogId);
    })
})