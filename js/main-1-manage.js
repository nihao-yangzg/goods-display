$(function() {
    var $addBtn = $('#add-btn');
    $addBtn.on('click', function(e) {
        var $this = $(e.target);
        
        // e.preventDefault();
        e.stopPropagation();
        var $addForm = $('#mask');
        $addForm.removeClass('hidden');
        $addBtn.attr('style', 'cursor: auto;');
    })

    var $submit = $('#submit'),
        $cancel = $('#cancel'),
        $catalogs = $('#catalogs');
    var $edit = $('#catalogs');
    $edit.on('click', function(e) {
        var target  = e.target;
        var $this = $(target);
        console.log(target.nodeName);
        if (target.nodeName === 'IMG') {
            var title = $this.parent('.catalog').find('label').children('a').text();
            console.log(title);
            showModal({'title':title});
        }
    })

    $submit.on('click', function(e) {
        var $this = $(e.target);
        var imageUrl = $("#imgUrl").val(),
            imageTitle = $('#imgTitle').val();
        if (!imageUrl || !imageTitle) {
            return;
        }
        $.ajax({
            url: '/api/main/addcatalogs',
            type: 'post',
            data: {'imgUrl': imageUrl, 'type': imageTitle},
            dataType: 'json',
            success: function(res) {
                var catalogs = res.data;
                showCatalogs(catalogs, $('#catalogs'), $('#menus'));
            }, error: function(err) {

            }
        })

        /** 
         * temp
         */
        showCatalogs([{'image': imageUrl, 'title': imageTitle}], $('#catalogs'), $('#menus'));

        hideModal();
    })
    $cancel.on('click', function(){
        hideModal();
    })
    function clearModal() {
        $('#imgTitle').val('');
        $('#imgUrl').val('');
        $('#localImg').val('');
        $('#mask span.tip').empty();
    }
    function showModal(item) {
        var $modal = $("#mask");
        $modal.removeClass('hidden');
        var $titleInput = $modal.find('#imgTitle');
        $titleInput.val(item.title ? item.title: '');
        // $titleInput.focus();
        $titleInput.select();
    }
    function hideModal() {
        clearModal();
        var $modal = $('#mask');
        $modal.addClass('hidden');
    }
    function showCatalogs(catalogs, $catalogs) { //, $menus) {
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
            
            input = document.createElement('input');
            input.setAttribute('type', 'checkbox');

            spanDom = document.createElement('a');
            spanDom.innerText = item['title'];

            divDom1 = document.createElement('div');
            label = document.createElement('label');
            label.appendChild(input);
            label.appendChild(spanDom);
            divDom1.appendChild(label);

            divDom.appendChild(imgDom);
            divDom.appendChild(divDom1);

            liDom.append(divDom);

            $(liDom).insertBefore('#myadd');

            // menuLiDom = document.createElement('li');
            // menuLiDom.setAttribute('data-id', item['id']);

            // menuADom = document.createElement('a');
            // menuADom.innerText = item['title'];
            // menuADom.setAttribute('target', '_blank');
            // menuADom.setAttribute('href', '/html/manage.html?typeId=' + item['id']);

            // menuLiDom.appendChild(menuADom);

            // $menus.append($(menuLiDom));
        })
    }

    showCatalogs([{'image': '../images/Adidas.jpg', 'title': 'Adidas'}], $('#catalogs'), $('#menus'));
    showCatalogs([{'image': '../images/Nike.jpg', 'title': 'Nike'}], $('#catalogs'), $('#menus'));

    showCatalogs([{'image': '../images/GUCCI.jpg', 'title': 'GUCCI'}], $('#catalogs'), $('#menus'));
    showCatalogs([{'image': '../images/Calvin Klein.jpg', 'title': 'Calvin Klein'}], $('#catalogs'), $('#menus'));
    $('#catalogs').sortable();
    $('#catalogs').disableSelection();


    $("a.upload").on("change","input[type='file']",function(){
        var filePath=$(this).val();
        if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
            $(".errorTip").html("").hide();
            var arr=filePath.split('\\');
            var fileName=arr[arr.length-1];
            var fLength = fileName.length;
            if (fLength > 10) {
                fileName = fileName.substring(0, 5) + '...' + fileName.substring(fLength - 5,fLength);
            }
            $(".showFileName").html(fileName);
        }else{
            $(".showFileName").html("");
            $(".errorTip").html("文件类型有误！").show();
            return false 
        }
    })
    /**
      * duplicated
      */
    // $('#final-delete').on('click', function(e) {
    //     var $checkboxies = $('#catalogs').find('input[type=checkbox]');
    //     var $target;
    //     if ($checkboxies.length > 0) {
            
    //         $checkboxies.each(function(index, item) {
    //             console.log($(item).is(':checked'));
    //             if ($(item).is(':checked')) {
    //                 console.log($checkboxies.length);
    //                 var title = $(item).siblings('a').text();
    //                 $target = $(item).parents('li[data-id]');
                    
    //                 $target.remove();
    //                 _deleteMenuItem(title);
    //             }
    //         })
    //     }
    // })
    $('#final-delete').on('click', function(e) {
        var $checkboxies = $('#catalogs').find('input[type=checkbox]');
        var targets = [], id;
        if ($checkboxies.length > 0) {
            $checkboxies.each(function(index, item) {
                if ($(item).is(':checked')) {
                    id = $(item).parents('li[data-id]').attr('data-id');
                    if (id) {
                        targets.push({'id': id});
                    }
                }
            });
            _deleteCatalogs(targets);
        }
    })
    function _deleteCatalogs(catalogIds) {
        if (catalogIds && catalogIds.length) {
            $.ajax({
                url: '/api/catalogs/delete',
                data: catalogIds,
                dataType: 'json',
                type: 'POSt',
                success: function(res) {
                    refreshCatalogs();
                },
                error: function(res) {

                }
            })
        }
    }
    function refreshCatalogs() {
        $.ajax({
            url: '/api/catalogs/all',
            dataType: 'json',
            type: 'GET',
            success: function(res) {
                showCatalogs(res.data, $('#catalogs'), $('#menus'));
            }
        })
    }
    function _deleteMenuItem(value) {
        if (!value) {
            return;
        }
        var $menu = $("#menus").find('li[data-id]');
        var $a;
        $menu.each(function(index, item) {
            
            $a = $(item).children('a');
            if ($a[0].innerText === value) {
                $(item).remove();
            }
        })
    }

    $('#final-submit').on('click', function(e) {
        var $items = $('#catalogs').children('li[data-id]');
        var data = [], element , id;
        $items.each(function(index, item) {
            element = {};
            id = $(item).attr('data-id') ;
            if (id) { element['id'] = id; }
            element['index'] = index + 1;
            data.push(element);
        })
        $.ajax({
            url: '/api/catalogs/order/edit',
            data: data,
            dataType: 'json',
            type: 'POST',
            success: function(res) {
                refreshCatalogs();
            },
            error: function(err) {

            }
        })
    })
   
    
})