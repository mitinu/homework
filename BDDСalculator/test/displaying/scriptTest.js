import clickInput from "/tests/interface/clickInput.js"
import updatingVisibility from "/tests/interface/updatingVisibility.js"

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
        status?console.log(errors):console.log();
        const htmlCode = `
            <div class="test-item ${status?"passed":"failed"}">
                <div class="test-info">
                    <div class="test-name">${test.name}</div>
                </div>
                <div class="test-status">${status?"Пройден":"Провален"}</div>
            </div>
        `
        document.getElementById("test_list").insertAdjacentHTML('beforeend', htmlCode);
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


