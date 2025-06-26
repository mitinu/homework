

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
