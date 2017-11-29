function getImages() {
    var objs = document.getElementsByTagName("img");
    var imgUrlStr = '';
    for (var i = 0; i < objs.length; i++) {
        if (i == 0) {
            if (objs[i].alt == '') {
                imgUrlStr = objs[i].src;
            }
        } else {
            if (objs[i].alt == '') {
                imgUrlStr += '#' + objs[i].src;
            }
        }
        objs[i].onclick = function () {
            if (this.alt == '') {
                document.location = "myweb:imageClick:" + this.src;
            }
        };
    };
    return imgUrlStr;
}

getImages();