function createGoodsList0(goods){
    var dom = document.createElement("li");
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.setAttribute('src', goods['imgUrl']);
    img.setAttribute('productId', goods['productId']);
    div.appendChild(img);
    var title = document.createElement('h3');
    title.textContent = goods['title'];
    dom.append(div);
    dom.appendChild(title);
    return dom;
}
function createGoodsList1(goods){
    var dom = document.createElement("li");
    var container = document.createElement('div');
    var subContainer = document.createElement('div');
    var imgDiv = document.createElement('div');
    var img = document.createElement('img');
    var price = document.createElement('em');

    img.setAttribute('src', goods['imgUrl']);
    img.setAttribute('productId', goods['productId']);
    imgDiv.appendChild(img);
    imgDiv.setAttribute('class', 'img');

    var title = document.createElement('p');
    var link = document.createElement('a');
    link.setAttribute('href', goods['goodsUrl']);
    link.textContent = goods['title'];
    title.appendChild(link);

    price.textContent = goods['price'];
    price.setAttribute('class', 'price');
    // title.textContent = goods['title'];

    subContainer.setAttribute('class', 'goods-subcontainer');
    subContainer.append(imgDiv);
    subContainer.append(price);
    subContainer.appendChild(title);

    container.setAttribute('class','goods-container');                
    container.appendChild(subContainer);

    dom.appendChild(container);

    return dom;
}

$(function(){
    var _testBrand = [
        {'value': 'Adidas', 'id': 1},
        {'value': 'Nike', 'id': 2},
        {'value': 'Lining', 'id': 3},
        {'value': 'Anta', 'id': 4},
    ];
    createBrandSelect(_testBrand);
    function getBrandList(catalogId) {
        if (catalogId) {
            $.ajax({
                url: '/api/brand/all?catalogId=' + catalogId,
                type: 'get',
                dataType: 'json',
                success: function(res) {
                    createBrandSelect(res.data);
                },
                error: function(err){

                }
            })
        }
    }
    function createBrandSelect(data) {
        var optionDom;
        if (data && data.length) {
            var $brandList = $('#brand-list');
            data.forEach(function(item,index){
                optionDom = document.createElement('option');
                optionDom.setAttribute('value', item['value']);
                optionDom.innerText = item['value'];
                $brandList.append($(optionDom));
            })
        }
    }
    $('.brand-select').val("").select2({
        placeholder: "Select a brand",
        allowClear: true
    });

    $('.brand-select').on('change', function(e){
        var brandId = $(this).val();
        var catalogId = getItemFromUrl('catalogId');
        $.ajax({
            url: '/api/goods/search?brandId=' + brandId + '&catalogId=' + catalogId,
            type: 'get',
            dataType: 'json',
            success: function(res) {

            }, error: function(err) {

            }
        })
    })
    // $('.sorted').val("").select2({
    //     placeholder: "Sorted by",
    //     allowClear: true
    // })
    function getGoodsByPage(page) {
        if (page > 0) {
            $.ajax({
                url: '/api/goods?page=' + page,
                type: 'get',
                dateType: 'json',
                success: function(res) {
                    console.log(res.data);
                },
                error: function(err) {
                    console.log(err.responseText);
                }
            })
        }
    }
    var goodslist = [
        {'imgUrl': '../images/a.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewata', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
        {'imgUrl': '../images/b.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewatb', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
        {'imgUrl': '../images/c.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewatc', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
        {'imgUrl': '../images/d.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewatd', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
        {'imgUrl': '../images/e.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewate', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
        {'imgUrl': '../images/f.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewatf', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
        {'imgUrl': '../images/g.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewatg', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
        {'imgUrl': '../images/h.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewath', 'price': '$25.4', 'goodsUrl': 'http://www.baidu.com'},
    ];
    var maxPageNo = 30;
    function goodsShow(goodslist) {
        $goodsList = $('#goods-list');
        $goodsList.empty();
        goodslist.forEach(function(goods, index) {
            // var dom = createGoodsList0(goods);
            var dom = createGoodsList1(goods);

            if (index % 3 === 0) {
                dom.setAttribute('class', 'first');
            } else if (index % 3 === 2) {
                dom.setAttribute('class', 'last');
            }
            $goodsList.append(dom);
        });
    }
    goodsShow(goodslist);
    // $('.goods ul').on('mouseover', function(event) {
    //     console.log(event.target.nodeName);
    //     if (event.target.nodeName === 'IMG') {
    //         var $img = $(this);
    //         var height = $img.height(),
    //             width = $img.width();
    //         var hover = document.createElement('div');
    //         hover.style.height = height;
    //         hover.style.width = width;
    //         hover.setAttribute('id', 'img-hover');
    //         hover.style.position = 'relative';
    //         hover.style.top = '0';
    //         hover.style.left = '0';
    //         hover.style.backgroundColor = '#ccc';
    //         hover.textContent = 'click';
    //         console.log(hover);
    //         $img.parent('div').append(hover);
    //     }
    // }).on('mouseout', function() {
    //     $('#img-hover').remove();
    // })
    $('.goods ul').on('click', function(event) {
        if (event.target.nodeName === 'IMG') {
            var id = $(event.target).attr('productId');
            console.log(id);
            window.open('./detail.html?id=' + id);
        }
    });
    var $pager = $('div.page-foot');
    var pager = new Pager(undefined, 'goods-pager');
    $pager.append($(pager.dom));
    $pager.on('click', function(e) {
       
        var target = e.target;
        var $this = $(target);
        var page, action, targetPage;
        if (target.nodeName === 'A') {
            page = getPageData($this);
            if (!page) {
                page = getCurrentPage();
                action = getPageAction($this);
                if (isNext(action)) {
                    targetPage = +(page) + 1;
                } else {
                    targetPage = +(page) - 1;
                }
            } else {
                targetPage = +page;
            }
            _pageActive($this);
            // getGoodsByPage(targetPage);
            
            if (targetPage !== 1) {
                setPreventButton(true);
            } else {
                setPreventButton(false);
            }

            if (targetPage !== maxPageNo) {
                setNextButton(true);
            } else {
                setNextButton(false);
            }
        }
    })
    function setPreventButton(show) {
        var $a = $('#goods-pager>ul').children('li:nth-child(1)').children('a');
        if (show) {
            $a.removeClass('hidden');
        } else {
            $a.addClass('hidden');
        }
    }
    function setNextButton(show) {
        var $a = $('#goods-pager>ul').children('li:last-child').children('a');
        if (show) {
            $a.removeClass('hidden');
        } else {
            $a.addClass('hidden');
        }
    }
    
    function _pageActive($this) {
        
        var value;
        if (getPageData($this)) {
            value = +($this.attr('page-data'));
            // index = $this.parents('li').index() - 1;
        } else {
            var action = getPageAction($this);
            var currentPage = getCurrentPage();
            var index = getCurrentPageIndex();
            
            if (isNext(action)) {
                value = currentPage + 1;
                $this = $this.parents('#goods-pager>ul').find('li:nth-child(' + (index + 1 > 11 ? 11 : (index + 1)) + ')').children('a');
            } else {
                value = currentPage - 1;
                $this = $this.parents('#goods-pager>ul').find('li:nth-child(' + (index - 1 > 2 ? (index - 1) : 2) + ')').children('a');
            }
            console.log('value', value);
            console.log($this[0]);
        }
        $this.parents('div.pager>ul').find('a.active').removeClass('active');
        // var $adoms = $this.parents('#goods-pager').find('a.page-link');
        if (value > 5 && value < maxPageNo) {
            setNextButton(true);
            var sequenceStart, sequenceEnd;
            sequenceStart = value - 5 > 0 ? (value - 5) : 1;
            sequenceEnd = value + 4 < maxPageNo ? (value + 4) : maxPageNo;
            if (sequenceEnd === maxPageNo) {
                sequenceStart = maxPageNo - 10 + 1;
                $this.addClass('active');
            } else {
                $this.parents('#goods-pager>ul').children('li:nth-child(7)').children('a.page-link').addClass('active');
            }
            _sequenceUpdate([sequenceStart, sequenceEnd]);
        } else if (value <= 5 || value > maxPageNo - 4) {
            $this.addClass('active');                   
        }
    }
    function _sequenceUpdate(sequence) {
        var start = sequence[0] > 0 ? sequence[0] : 1,
            end = sequence[1] > 10 ? sequence[1] : 10;
        var size = end - start + 1;
        var currentValue;
        $('#goods-pager').find('a.page-link').each(function(index, dom) {
            if (index === 0 || index > size) {
                return true;
            } else {
                currentValue = start + index - 1;
                $(dom).attr('page-data', currentValue).text(currentValue);
            }
        })
    }
    function getPageAction($this) {
        return $this.attr('page-action');
    }
    function getPageData($this) {
        return $this.attr('page-data');
    }
    function isNext(value) {
        return value === '+1';
    }
    function isPrevent(value) {
        return value === '-1';
    }
    function isPage(value) {
        var numReg = /\d+/;
        return numReg.test(value);
    }
    function getCurrentPage() {
        var $currentPage = $('a.page-link.active');
        return +($currentPage.attr('page-data'));
    }
    function getCurrentPageIndex() {
        return $('a.page-link.active').parent('li').index() + 1;
    }
})