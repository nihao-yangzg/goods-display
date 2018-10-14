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
        var $this = $(this);
        var imgUrl = $this.children('img').attr('src');
        console.log(imgUrl);
        $siblings = $this.siblings('.active');
        if ($siblings) {
            $siblings.removeClass('active');
        }
        $this.addClass('active');
        var imgdom = document.createElement('img');
        imgdom.setAttribute('src', imgUrl);
        // imgdom.setAttribute('width', 800);
        // imgdom.setAttribute('height', 800);
        $('#img-zoom').empty().append(imgdom);
    });
    // $('#img-zoom').zoom();
   
})

function initImageDetail() {
    var imgUrl = $('.gphoto').nt
}