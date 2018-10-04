
var initPager = function(realPages) {
    var divDom = document.createElement('div'),
        ulDom = document.createElement('ul');
    divDom.setAttribute('class','pager');
    
    var initLength = 10;
    if (initLength > realPages) {
        initLength = realPages;
    }
    var aDom,liDom;
    for (var i = 0; i < initLength + 2; i++) {
        aDom = document.createElement('a');
        aDom.setAttribute('class', 'page-link');
        if (i === 0) {
            aDom.innerText = '<Previous';
            aDom.setAttribute('page-action', '-1');
            aDom.setAttribute('class', 'page-link hidden');
        } else if (i <= initLength) {
            aDom.innerText = i;
            aDom.setAttribute('page-data', i);
        } else {
            aDom.innerText = 'Next>';
            aDom.setAttribute('page-action', '+1');
            if (i > realPages) {
                aDom.setAttribute('class', 'page-link hidden');
            }
        }
        aDom.setAttribute('href','');
        liDom = document.createElement('li');
        liDom.setAttribute('class', 'page-container');
        liDom.appendChild(aDom);
        ulDom.appendChild(liDom);
    }
    divDom.appendChild(ulDom);
    return divDom;
}
window.myPage = {'initPager': initPager};
    