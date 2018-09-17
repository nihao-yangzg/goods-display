$(function(){
    $('.tablist').on('click', function(){
        console.log('click');
        $index = $(this).index();
        $active = $(this).siblings('.active');
        if (!$active) {
            return;
        }
        $active.removeClass('active');
        $(this).addClass('active');
        // var length = $(".content-container").children('div').length();
        $(".content-container").children('div').each(function(index,dom) {
            console.log(dom);
            var $dom = $(dom);
            if ($dom.hasClass('hidden')) {
                if (index === $index) {
                    $dom.removeClass('hidden');
                }
            } else {
                if (index !== $index) {
                    $dom.addClass('hidden');
                }
            }
        })
    })
    // $('.gphoto').on('click', function(event) {
    //     var $this = $(this);
    //     var imgUrl = $this.children('img').attr('src');
    //     console.log(imgUrl);
    //     $siblings = $this.siblings('.active');
    //     if ($siblings) {
    //         $siblings.removeClass('active');
    //     }
    //     $this.addClass('active');
    //     $('#img-detail').css({
    //         'background-image': 'url("' + imgUrl + '")'
    //     })
    // })
    
    $('.gphoto').on('mouseover', function(event) {
        // var $this = $(this);
        // var imgUrl = $this.children('img').attr('src');
        // console.log(imgUrl);
        // $siblings = $this.siblings('.active');
        // if ($siblings) {
        //     $siblings.removeClass('active');
        // }
        // $this.addClass('active');
        // var imgdom = document.createElement('img');
        // imgdom.setAttribute('src', imgUrl);
        // // imgdom.setAttribute('width', 800);
        // // imgdom.setAttribute('height', 800);
        // $('#img-zoom').empty().append(imgdom);
    });
    // $('#img-zoom').zoom();
   

   $('#title').on('click', showTitleInput);
   $('#price').on('click', showPriceInput);
})

function showTitleInput(event) {
    $this = $(this);
    var origintext, newtext;
    if (!$this.children('input').length) {
        origintext = $this.children('h3').text();
        $this.empty();                
        var $input = $('<input type="text" name="title" placeholder="title" style="margin:15.21px 0; width:100%;" autofocus>');
        $input.on('blur keydown', function(event){
            // event.stopPropagation();
            if (event.type === 'keydown' && event.keyCode !== 13) {
                return;
            }
            var newtext = $input.val();
            if (!newtext) {
                newtext = origintext;
            }
            console.log(newtext);
            $this.empty();
            $this.append('<h3>' + newtext + '</h3>');
        });
        $this.append($input);
        $input.focus();
    }
}
var numreg = /^[0-9]{1,}([\.]?[0-9]+)?$/;
function showPriceInput(event) {
    console.log(event);
    console.log(event.target.nodeName);
    if (event.target.nodeName !== 'H3') {
        return;
    }
    $this = $(this);
    var originPrice, newPrice;
    if (!$this.children('input').length) {
        originPrice = $this.children('h3').text().substring(1).trim();
        $this.empty();
        var $dollar = $('<div style="display:inline-block; margin: 0;10px; width:20px;">$</div>');
        var $input = $('<input type="text" name="price" placeholder="price" style="margin:15.21px 0; " autofocus>');
        $input.on('blur keydown', function(event){
            // event.stopPropagation();
            if (event.type === 'keydown' && event.keyCode !== 13) {
                return;
            }
            var newPrice = $input.val();
            if (!newPrice) {
                newPrice = originPrice;
            }
            $this.empty();
            $this.append('<h3>$ ' + newPrice + '</h3>');
        });
        if (numreg.test(originPrice)) {
            $input.val(originPrice);
        }
        $this.append($dollar);
        $this.append($input);
        $input.focus();
        $input.select();
        console.log(originPrice);
        
        
        return true;
    }
}