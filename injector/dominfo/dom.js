function getDomInfo() {
    let elementList = document.querySelectorAll('*');
    // dom 节点数量
    let domNumbers = elementList.length;

    // dom max depth
    function getMaxNestLevel() {
        var i = 1, sel = '* > *'; /* html > body is always present */
        while(document.querySelector(sel)) {
            sel += ' > *';
            i++;
        }
        return i;
    }


    let dom = {};
    dom.dom = document.documentElement.outerHTML;
    dom.domNumbers = domNumbers;
    dom.maxDepth = getMaxNestLevel()

    return JSON.stringify(dom);
}

getDomInfo();