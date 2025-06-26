import clickInput from "/tests/interface/clickInput.js"
import updatingVisibility from "/tests/interface/updatingVisibility.js"

const htmlCountTestAll = document.getElementById("countTestAll")
const htmlCountTestPassed = document.getElementById("countTestPassed")
const htmlCountTestFailed = document.getElementById("countTestFailed")

document.getElementById("filter_select").addEventListener("change", event=>{
    const htmlPassedTests = Array.from(document.getElementsByClassName("passed"))
    const htmlFailedTests = Array.from(document.getElementsByClassName("failed"))
    switch (event.target.value){
        case "all":
            for (const htmlPassedTest of htmlPassedTests) {
                htmlPassedTest.style.display = "block"
            }
            for (const htmlFailedTest of htmlFailedTests) {
                htmlFailedTest.style.display = "block"
            }
            break
        case "passed":
            for (const htmlPassedTest of htmlPassedTests) {
                htmlPassedTest.style.display = "block"
            }
            for (const htmlFailedTest of htmlFailedTests) {
                htmlFailedTest.style.display = "none"
            }
            break
        case "failed":
            for (const htmlPassedTest of htmlPassedTests) {
                htmlPassedTest.style.display = "none"
            }
            for (const htmlFailedTest of htmlFailedTests) {
                htmlFailedTest.style.display = "block"
            }
            break

    }
})





const iframe = document.getElementById("externalPage")
const tests = [
    clickInput,
    updatingVisibility
]


document.addEventListener('DOMContentLoaded', allTest);
async function allTest(){
    for (const test of tests) {
        console.log(test)
        const errors = await startTest(iframe, test);
        const status = errors.length==0
        status?console.log():console.log(errors);
        const htmlCode = `
            <div class="test-item ${status?"passed":"failed"}">
                <div class="test-info">
                    <div class="test-name">${test.name}</div>
                </div>
                <div class="test-status">${status?"Пройден":"Провален"}</div>
            </div>
        `
        document.getElementById("test_list").insertAdjacentHTML('beforeend', htmlCode);
        htmlCountTestAll.innerHTML = parseInt(htmlCountTestAll.innerHTML)+1;
        if (status)
            htmlCountTestPassed.innerHTML = parseInt(htmlCountTestPassed.innerHTML)+1;
        else
            htmlCountTestFailed.innerHTML = parseInt(htmlCountTestFailed.innerHTML)+1;


    }
}
async function startTest(iframe, test){

    return new Promise((resolve) => {
        iframe.src = test.pathPage;
        iframe.onload = () => {
            resolve(test.test(iframe))
        };

    })
}


