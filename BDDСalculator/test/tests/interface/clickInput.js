const clickInput = {
    pathPage:"index/index.html",
    name: "нажатие на кнопки",
    test:function (iframe){
        let errors = []
        const iframeDoc = iframe.contentDocument
        const data = iframe.contentWindow.data

        const inputsNumber = iframeDoc.getElementsByClassName("number")
        const inputClear = iframeDoc.getElementById("clear")
        const inputBackspace = iframeDoc.getElementById("backspace")
        const inputsOperator = iframeDoc.getElementsByClassName("operator")
        const inputPoint = iframeDoc.getElementById("point")
        /**проверка: стирания*/
        for (const inputNumberIdx in Array.from(inputsNumber)) {
            const inputOperatorIdx = inputNumberIdx%4
            const inputNumber = inputsNumber[inputNumberIdx]
            const inputOperator = inputsOperator[inputOperatorIdx]
            inputNumber.click()
            inputNumber.click()
            inputOperator.click()
        }
        inputClear.click()
        /**data глобальная переменная на уровне страничке которую мы тестируем*/
        if (data.numbers.length!=0 || data.operators.length!=0){
            pushError(errors, `кнопка ${inputClear.innerHTML} должна удалять все`)
        }

        /**проверка: цифры, числа и удаление цифр*/
        for (const inputNumberIdx in Array.from(inputsNumber)) {
            const inputNumber = inputsNumber[inputNumberIdx]
            inputNumber.click();
            if (data.numbers[0] != inputNumber.innerHTML){
                pushError(errors, `нажатие на цифру кнопка: ${inputNumber.innerHTML}`)
            }
            inputBackspace.click()
            if (data.numbers[0]){
                pushError(errors, `удаление одного символа`)
            }
            inputNumber.click()
            inputNumber.click()
            // const valueZeroIdx = inputNumber.innerHTML.toString()+inputNumber.innerHTML.toString()
            if (data.numbers[1]){
                pushError(errors, `цифры переносятся на второй число до нажатия на знак математической операции кнопка: ${inputNumber.innerHTML}`)
            }
            inputBackspace.click()
            if (data.numbers[0] != inputNumber.innerHTML){
                pushError(errors, `удаление ровной одного символа`)
            }


            inputsOperator[0].click()
            inputNumber.click()
            if (data.numbers[1] != inputNumber.innerHTML){
                pushError(errors, `нажатие на цифру после выбора оператора кнопка: ${inputNumber.innerHTML}`)
            }
            if (data.numbers[0] != inputNumber.innerHTML){
                pushError(errors, `целостность первого числа при добавление чисел ко второму числу кнопка: ${inputNumber.innerHTML}`)
            }
            inputBackspace.click()
            inputBackspace.click()
            if (data.numbers[1]){
                pushError(errors, `удаление второго числа кнопка: ${inputNumber.innerHTML}`)
            }
            if (data.numbers[0] != inputNumber.innerHTML){
                pushError(errors, `целостность первого числа при удаление последующих чисел и операторов кнопка: ${inputNumber.innerHTML}`)
            }
            inputClear.click()
        }
        /**проверка: операторы и удаление операторов*/

        for (const inputOperatorIdx in Array.from(inputsOperator)) {
            const inputOperator = inputsOperator[inputOperatorIdx]
            inputOperator.click()
            if (data.operators[0]){
                pushError(errors, `не возможность выбрать оператор до ввода числа кнопка: ${inputOperator.innerHTML}`)
            }
            inputsNumber[0].click()
            inputOperator.click()
            if (data.operators[0] != inputOperator.innerHTML){
                pushError(errors, `нажатие на оператор кнопка: ${inputOperator.innerHTML}`)
            }
            inputOperator.click()
            if (data.operators[1]){
                pushError(errors, `не возможность выбрать оператор до ввода числа кнопка: ${inputOperator.innerHTML}`)
            }
            inputBackspace.click()
            if (data.operators[0]){
                pushError(errors, `удаление оператора`)
            }
            inputOperator.click()
            inputsNumber[0].click()
            inputOperator.click()
            if (data.operators[1] != inputOperator.innerHTML){
                pushError(errors, `добавление второго оператора кнопка: ${inputOperator.innerHTML}`)
            }
            inputBackspace.click()
            inputBackspace.click()
            if (data.operators[0] != inputOperator.innerHTML){
                pushError(errors, `при удаление второго оператора не должен удалятся первый `)
            }
            if (data.operators[1]){
                pushError(errors, `удаление второго оператора`)
            }

            inputClear.click()
        }
        inputsNumber[0].click()
        inputsOperator[0].click()
        inputsNumber[0].click()
        inputsOperator[1].click()
        if (data.operators[0]==inputsOperator[1].innerHTML){
            pushError(errors, `следующий оператор перезаписывает пред идущий`)
        }
        inputClear.click()


        inputsNumber[0].click()
        inputsOperator[0].click()
        inputsOperator[1].click()
        if (data.operators[0]!=inputsOperator[1].innerHTML){
            pushError(errors, `операторы не перезаписывают друг друга`)
        }
        inputClear.click()


        /**проверка: '.'*/
        inputPoint.click()
        if (data.numbers[0]!="0"+inputPoint.innerHTML){
            pushError(errors, `если до точки нечего нету должен ставится 0`)
        }
        inputsOperator[0].click()
        if (data.operators[0]){
            pushError(errors, `оператор не должен ставится если цифра заканчивается на "."`)
        }
        inputsNumber[0].click()
        inputPoint.click()
        if (data.numbers[0][3]){
            pushError(errors, `ставится более 1 '.'`)
        }
        inputClear.click()
        return errors;
    }
}
export default clickInput

function pushError(errors, message){
    if (errors.indexOf(message)==-1)
        errors.push(message)
    return errors
}