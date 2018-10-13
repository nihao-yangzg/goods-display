$(function(){
    var menus = '<div class="header">'
        + '<div class="content">'
        +   '<div class="title">'
        +        'Enjoy Your Life'
        +   '</div>'
        +   '<div id="logout" class="menu fa fa-power-off"> Logout</div>'
        +   '<div id="myaccount" class="menu fa fa-user-o"> My account</div>'
        + '</div>'
        + '</div>';
    $('body').prepend($(menus));


    var logoutModal = ''
        + '<div class="display-modal hidden" id="logout-modal">'
        +    '<div class="dmodal-content">'
        +        '<div class="dmodal-header">'
        +           '<h2>Logout</h2>'
        +        '</div>'
        +        '<div class="dmodal-body">'
        +            '<div class="message">'
        +                '<span>要退出系统吗？</span>'
        +            '</div>'
        +        '</div>'
        +        '<div class="dmodal-footer">'
        +            '<div class="action">'
        +                '<button class="cancel">取消</button>'
        +                '<button class="ok">确定</button>'
        +            '</div>'
        +        '</div>'
        +    '</div>'
        + '</div>';
    $('body').append($(logoutModal));
    function _showLogoutModal() {
        $('#logout-modal').removeClass('hidden');
    }
    function _hideLogoutModal() {
        $('#logout-modal').addClass('hidden');
    }

    $('#logout').on('click', function(){
        _showLogoutModal();
    })
    $('#logout-modal button.ok').on('click', function() {
        $.ajax({
            url: '/api/logout',
            type: 'POST',
            data: 'json',
            success: function(res) {
                location.href="/html/login.html";
            },
            error: function(err){
                
            }
        })
        //for test
        location.href="/html/login.html";
    })
    $('#logout-modal button.cancel').on('click', function(){
        _hideLogoutModal();
    })
    $("#myaccount").on('click', function(){
        window.open('/html/userinfo.html');
    })
})