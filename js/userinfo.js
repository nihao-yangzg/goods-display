 /**
  * $this为input的父jquery dom.
  */
 $(function(){

function inputToSpan($this) {
    var $inputs = $this.find('input');
    var text, spanDom;
    $inputs.each(function(index, dom){
        var $dom = $(dom);
        text = $dom.val();
        spanDom = document.createElement('span');
        spanDom.setAttribute('title', 'click to edit');
        spanDom.innerText = text;
        $dom.parents('div.info-value').append($(spanDom));
        $dom.remove();
    })
}
/**
 * $this 为 span的父节点
 */
function spanToInput($this) {
    var text = $this.children('span').text();
        $this.empty();
    var inputDom = document.createElement('input');
    inputDom.setAttribute('type', 'text');
    inputDom.setAttribute('class', 'userinfo-input')
    inputDom.value = text;
    inputDom.setAttribute('autofocus', 'autofocus');
    inputDom.select();
    $this.append($(inputDom));
}

function toggleHidden() {
    var $submitButtonDiv = $('#submit-buttons');
    if ($submitButtonDiv.hasClass('hidden')) {
        $submitButtonDiv.removeClass('hidden');
    }
}
function dumpData(data) {
    var $id = $('#userid'),
    $userName = $('#username'),
    $phone = $('#phone'),
    $mailAddr = $('#mailaddr');
    var undefinedStr = '------';
    $id.text(userinfo.id ? userinfo.id : undefinedStr);
    $userName.text(userinfo.username ? userinfo.username : undefinedStr);
    $phone.text(userinfo.phone? userinfo.phone: undefinedStr);
    $mailAddr.text(userinfo.emailAddr ? userinfo.emailAddr : undefinedStr);
}
     

$('.info-value').on('click', function(e) {
    e.stopPropagation();
    var target = e.target;
    if (target.nodeName === 'INPUT') {
        return;
    }
    var $this = $(this);
    if ($this.hasClass('uneditable')) {
        return;
    }
    if ($this.has("span").length) {
        spanToInput($this);
        toggleHidden();
    }
})

var userinfo = {
    'username': 'abcd',
    'id': 'niewhoitewjo[j',
    'phone': '239753264080',
    'emailAddr': 'abcd@email.com'
};
$.ajax({
    url: '/api/user/userinfo',
    type: 'get',
    success: function(res){

    },
    error: function(){

    }
});

$('#cancel').on('click', function(e){
    var target = e.target,
        $this = $(this);
    // $this.parents('#submit-buttons').addClass('hidden');
    inputToSpan($('div.info-value'));
})

$('#submit').on('click', function(e) {
    var target = e.target,
        $this = $(this);

    $.ajax({
        url: '/user/edit',
        data: {'username': username, 'id': id, 'phone': phone, 'emailAddr': emailAddr},
        dataType: 'json',
        type: 'post',
        success: function(res) {
            dumpData(res.data);
        },
        error: function() {

        }
    })
})

dumpData(userinfo);
})