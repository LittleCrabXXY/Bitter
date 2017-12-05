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

    let maxDepth = getMaxNestLevel();

    let domDetailValues = [
        {
            title: "总DOM节点数",
            value: domNumbers,
            target: "< 1,500 nodes"
        },
        {
            title: "DOM深度",
            value: maxDepth,
            target: "< 32"
        }
    ]

    let dom = {
        dom: document.documentElement.outerHTML,
        displayValue: `${domNumbers} nodes`,
        rawValue: domNumbers,
        optimalValue: '< 1,500 nodes',
        extendedInfo: {
            value: domDetailValues
        },
        description: '避免过多DOM数',
        helpText:"建议页面节点数 < 1500个，单个节点深度 < 32，否则大的DOM会增加内存使用量和更长的样式绘制计算"
    };
    return JSON.stringify(dom);
}

getDomInfo();