$(function(){
    $('input').on('focus', function(e){
        console.log('focus');
        var $this = $(this);
        var $parentDiv = $this.parents('div.form-unit');
        console.log($parentDiv.attr('class'));
        $parentDiv.siblings('div.form-unit').removeClass('active');
        if (!$parentDiv.hasClass('active')) {
            $parentDiv.addClass('active');
        }
    })

    $('#login').on('click', function(e) {
        var username = $('#username').val(),
            password = $('#passwd').val();
        $.ajax({
            url: '/api/login',
            data: {'username': username, 'password': password},
            type: 'post',
            dataType: 'json',
            success: function(res) {
                location.href='/html/manage.html'
            },
            error: function(res) {
                location.href='/html/main-manage.html'
                // alert('username or password error.');
            }
        })
    })

})