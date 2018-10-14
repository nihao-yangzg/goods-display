$(function(){
    // $('#general-info').on('click', function(event) {
    //     var $this = $(this);
    //     $this.addClass('hidden');
    //     var $generalEditor = $('<div id="general-editor" class="editor"></div>');
    //     $this.parent('div.general').append($generalEditor);
    //     $generalEditor.textEditor({ fileUploadError: $.showErrorAlert} );
        
    //     window.prettyPrint && prettyPrint();
    // })
    var $generalEditor = $('#general-editor');
    $generalEditor.textEditor({ fileUploadError: $.showErrorAlert} );
    window.prettyPrint && prettyPrint();
    $('#desc-info').on('click', function(event) {
        var $this = $(this);
        $this.addClass('hidden');
        var $descEditor = $('<div id="desc-editor" class="editor"></div>');
        $this.parent().append($descEditor);
        var content = $this.html();
        
        $this.siblings('div.editor').append(content);
        $descEditor.textEditor({ fileUploadError: $.showErrorAlert} );
        
        window.prettyPrint && prettyPrint();
    })

    var $descEditor = $('#desc-editor');
    $descEditor.textEditor({ fileUploadError: $.showErrorAlert} );
    window.prettyPrint && prettyPrint();


    $('#add-imgurl').on('click', function(event){
        $('#img-url-creator').removeClass('hidden').children('input').focus().select();
        var $this = $(this);
    })
    $('#url-input').on('keydown', function(event) {
        if (event.keyCode === 13) {
            var url = $(this).val();
            addImage(url);
        }
    });
    $('#url-cancel').on('click', function(event) {
        $('#img-url-creator').addClass('hidden');
    })
    var addImage = function(url) {
        if (!url) {
            return;
        }
        var liDom = document.createElement('li');
        liDom.style.position='relative';
        liDom.setAttribute('class', 'gphoto');
        var imgDom = document.createElement('img');
        imgDom.setAttribute('src', url);
        liDom.appendChild(imgDom);
        var $imgContainer = $('#imageul');
        $imgContainer.append($(liDom));
        $(liDom).on('mouseenter', function(event) {
            event.stopPropagation();
            var $self = $(this);
            var $deleteImg = $('<span class="fa fa-times-circle" id="deleteImg" style="position:absolute; right:1px; top:1px; z-index：1000; color:rgb(223, 81, 81);" ></span>');
            $deleteImg.on('click', function(event) {
                $self.remove();
            })
            $self.append($deleteImg);

        }).on('mouseleave', function(event) {
            console.log(event.target.tagName);
           
            event.stopPropagation();
            var $self = $(this);
            $self.children('span').remove();
        })
        console.log(imgDom);
       
        $('#img-url-creator').addClass('hidden');
    }
    $('#url-confirm').on('click', function(event) {
        var $this = $(this);
        var url = $this.siblings('input').val();
        console.log(url);
        addImage(url);
    });
    $('#final-submit').on('click', function(){
        var imageUrls = [],
            title,
            price,
            generalInfo,
            goodsRealUrl,
            description;
        var $images = $('#imageul').find('img');
        var url;
        $images.each(function(index,item){
            imageUrls.push($(item).attr('src'));
        })
        console.log(imageUrls);

        title = $('#title').val();
        price = $('#price').val();
        goodsRealUrl = $("#realUrl").val();
        generalInfo = $('#general-editor').html();
        description = $('#desc-editor').html();
        id = getItemFromUrl('productId');
        var data = {'imageUrls': imageUrls,'title': title, 'price': price, 'generalInfo': generalInfo, 'goodsRealUrl': goodsRealUrl, 'description': description};
        if (id) {
            url = 'edit';
            data.id = id;
        } else {
            url = 'add';
        }
        $.ajax({
            url: '/api/goods/' + url,
            data:  data,
            type: 'post',
            dataType: 'json',
            success: function(res) {

            },
            error: function(err) {

            }
        })
    })

    function initPage() {
        var productId = getItemFromUrl('productId');
        if (productId) {
            $.ajax({
                url: '/api/goods/detail?id=' + productId,
                type: 'get',
                dataType: 'json',
                success: function(res) {
                    var data = res.data;
                    loadDataToPage(data);
                }
            })
        }
    }
    function loadDataToPage(data) {
        if (data && data.length) {
            var imageUrls = data.imageUrls,
                title = data.title,
                price = data.price,
                generalInfo = data.generalInfo,
                goodsRealUrl = data.goodsRealUrl,
                description = data.description;
            if (imageUrls && imageUrls.lenght) {
                imageUrls.each(function(index, item) {
                    addImage(item);
                })
            }
            if (title) {
                $('#title').val(title);
            }
            if (price) {
                $('#price').val(price);
            }
            if (generalInfo) {
                $('#general-editor').html(generalInfo);
            }
            if (goodsRealUrl) {
                $('#realUrl').val(goodsRealUrl);
            }
            if (description) {
                $('#desc-editor').html(description);
            }
        }
    }
});