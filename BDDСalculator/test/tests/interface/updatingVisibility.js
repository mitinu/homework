import pushError from "/../../utilit/pushError.js"

const updatingVisibility = {
    type: "interface",
    testData: {
        numbers: ["10.1","31"],
        operators: ["+"]
    },
    resultExpected: "10.1+31",
    pathPage: "index/index.html",
    name: "визуальное отображение",
    test:function (iframe){
        let errors = []
        const iframeDoc = iframe.contentDocument

        iframe.contentWindow.data = this.testData;
        iframe.contentWindow.updatingVisibility();

        const resultReal = iframeDoc.getElementById("input").innerHTML
        if (this.resultExpected!=resultReal){
            pushError(errors, `ожидаем:${this.resultExpected} получаем:${resultReal}`)
        }
        return errors;

    }
}

export default updatingVisibility
