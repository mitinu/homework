import pushError from "/../../utilit/pushError.js"

const updatingVisibility = {
    type: "interface",
    testData: {
        numbers: ["10.1","31"],
        operators: ["+"]
    },
    pathPage: "index/index.html",
    name: "визуальное отображение",
    test:function (iframe, testData=updatingVisibility.testData){
        console.log(testData)
        let errors = []
        const iframeDoc = document.getElementById("externalPage").contentDocument

        iframe.contentWindow.data = testData
        iframe.contentWindow.updatingVisibility()
        const resultExpected =(()=>{
            let value = ""
            for (let i = 0; i < testData.numbers.length; i++) {
                value += testData.numbers[i]
                value += testData.operators[i]?testData.operators[i]:""
            }
            return value
        })();

        const resultReal = iframeDoc.getElementById("input").innerHTML
        if (resultExpected!=resultReal){
            pushError(errors, `ожидаем:${resultExpected} получаем:${resultReal}`)
        }
        return errors;

    }
}

export default updatingVisibility
