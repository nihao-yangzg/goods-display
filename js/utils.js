function getItemFromUrl(name) {
    var queryStr = location.search.substring(1);
    var reg =  new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var result = queryStr.match(reg);
    if (result) {
        return result[2];
    }
}