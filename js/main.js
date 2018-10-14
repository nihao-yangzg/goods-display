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
            spanDom.innerText = item['title'];

            divDom.appendChild(imgDom);
            divDom.appendChild(spanDom);

            liDom.append(divDom);

            $catalogs.append($(liDom));

            menuLiDom = document.createElement('li');
            menuLiDom.setAttribute('data-id', item['id']);

            menuADom = document.createElement('a');
            menuADom.innerText = item['title'];

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