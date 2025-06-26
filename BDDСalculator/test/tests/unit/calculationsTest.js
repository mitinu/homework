import pushError from "/../../utilit/pushError.js"


const updatingVisibility = {
    type: "function",
    testData: {
        numbers: ["10", "3", "4", "2" ,"4", "3"],
        operators: ["+", "*", "/", "-", "%"]
    },
    resultExpected:15,
    pathPage: "/index/calculations.js",
    name: "функция calculations",
    test:async function (){
        let errors = []

        const calculations = await import(this.pathPage);
        const resultReal = calculations.default.func(this.testData)
        if (resultReal!=this.resultExpected){
            pushError(errors, `ожидаем:${this.resultExpected} получаем:${resultReal}`)
        }
        return errors;

    }
}

export default updatingVisibility

