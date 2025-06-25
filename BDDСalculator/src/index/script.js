window.data = {
    numbers: [],
    operators: []
}

for (let inputNumber of document.getElementsByClassName("number")) {
    inputNumber.addEventListener("click", event=>{
        let index,
            value
        if (data.operators.length==data.numbers.length){
            index = data.numbers.length
            value = event.target.innerHTML
        }
        if (data.operators.length<data.numbers.length){
            index = data.numbers.length-1
            value = data.numbers[index] + "" + event.target.innerHTML
        }
        data.numbers[index] = value
        updatingVisibility()
    })
}
for (let inputOperator of document.getElementsByClassName("operator")) {
    inputOperator.addEventListener("click", event=>{
        let index,
            value
        if (data.operators.length==data.numbers.length&&data.operators.length>0){
            index = data.operators.length-1
            value = event.target.innerHTML
            data.operators[index] = value
        }
        if (data.operators.length<data.numbers.length &&
            data.numbers[data.numbers.length-1] &&
            data.numbers[data.numbers.length-1][data.numbers[data.numbers.length-1].length - 1] != '.'
        ){
            index = data.operators.length
            value = event.target.innerHTML
            data.operators[index] = value
        }
        updatingVisibility()
    })
}

document.getElementById("clear").addEventListener("click", event=>{
    data.operators = []
    data.numbers = []
    updatingVisibility()
})

document.getElementById("backspace").addEventListener("click", event=>{
    const typeItem = data.operators.length==data.numbers.length?"operators":"numbers"
    if (typeItem == "numbers" &&
        data[typeItem][data[typeItem].length-1].length!=1
    ){
        data[typeItem][data[typeItem].length-1] = data[typeItem][data[typeItem].length-1].slice(0, -1)
    }
    else {
        data[typeItem].pop()
    }
    updatingVisibility()
})
document.getElementById("point").addEventListener("click", event=>{
    let index,
        value
    for (const charIdx in data.numbers[data.numbers.length-1]) {
        const char = data.numbers[data.numbers.length-1][charIdx]
        if (char == "."){
            return
        }
    }

    if (data.operators.length==data.numbers.length){
        index = data.numbers.length
        value = "0"+event.target.innerHTML
    }
    if (data.operators.length<data.numbers.length){
        index = data.numbers.length-1
        value = data.numbers[index] + "" + event.target.innerHTML
    }
    data.numbers[index] = value
    updatingVisibility()
})


function updatingVisibility(){
    let value = ""
    for (let i = 0; i < data.numbers.length; i++) {
        value += data.numbers[i]?data.numbers[i]:""
        value += data.operators[i]?data.operators[i]:""
    }
    document.getElementById("input").innerHTML = value
}
