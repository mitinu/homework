function calculations(data){
    const numbers = [...data.numbers]
    const operators = [...data.operators]
    for (let operatorIdx = 0; operatorIdx < operators.length; ) {
        const operator = operators[operatorIdx]
        if ((operator=="*"||operator=="/"||operator=="%")&&numbers[operatorIdx+1]){
            let numberNew
            if (operator=="*")
                numberNew = parseFloat(numbers[operatorIdx]) * parseFloat(numbers[operatorIdx+1])
            if (operator=="/")
                numberNew = parseFloat(numbers[operatorIdx]) / parseFloat(numbers[operatorIdx+1])
            if (operator=="%")
                numberNew = parseFloat(numbers[operatorIdx]) % parseFloat(numbers[operatorIdx+1])


            numbers.splice(operatorIdx+1, 1)
            numbers[operatorIdx] = numberNew
            operators.splice(operatorIdx, 1)
        }
        else {
            operatorIdx++
        }
    }
    for (let operatorIdx = 0; operatorIdx < operators.length; ) {
        const operator = operators[operatorIdx]
        if (numbers[operatorIdx+1]) {

            let numberNew
            if (operator=="+")
                numberNew = parseFloat(numbers[operatorIdx]) + parseFloat(numbers[operatorIdx+1])
            if (operator=="-")
                numberNew = parseFloat(numbers[operatorIdx]) - parseFloat(numbers[operatorIdx+1])
            numbers.splice(operatorIdx+1, 1)
            numbers[operatorIdx] = numberNew
            operators.splice(operatorIdx, 1)
        }
        else {
            operatorIdx++
        }
    }
    return numbers[0]
}

window.calculations = calculations
calculations = {func: calculations}
export default calculations
