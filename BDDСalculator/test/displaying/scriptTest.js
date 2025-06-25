import clickInput from "/tests/interface.js"

const iframe = document.getElementById("externalPage")

const tests = [
    clickInput,
]

startClickInputTest()

async function startClickInputTest(){
    for (const test of tests) {
        for (const pathPage of test.pathsPage) {
            iframe.src = pathPage;
            iframe.onload = () => {
                const iframeWindow  = iframe.contentWindow;
                const errors =  test.test(iframeWindow.data);
                let htmlCode
                if (errors.length==0){
                    htmlCode = `
                    <div class="test-item passed">
                        <div class="test-info">
                            <div class="test-name">${test.name}</div>
                        </div>
                        <div class="test-status">Пройден</div>
                    </div>
                `
                }
                else {
                    console.log(errors)
                    htmlCode = `
                    <div class="test-item failed">
                        <div class="test-info">
                            <div class="test-name">${test.name}</div>
                        </div>
                        <div class="test-status">Провален</div>
                    </div>
                `
                }
                document.getElementById("test_list").innerHTML += htmlCode

            };
        }
    }
}


