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