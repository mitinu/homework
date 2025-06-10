const articleType = document.getElementById("type");
const articleTypeFilling = document.getElementById("typeFilling");
articleTypeFilling.style.display = "none";
const articleAdditionally = document.getElementById("additionally");
articleAdditionally.style.display = "none";
const articleResul = document.getElementById("resul");
articleResul.style.display = "none";

const myBurger = {
    price: 0,
    calories: 0
};
function closeAndOpenBlock(oldArticle, newArticle){
    oldArticle.style.display = "none";
    newArticle.style.display = "block";
}
document.getElementById("typeFillingResume").addEventListener("click", closeAndOpenBlock.bind(null, articleTypeFilling, articleAdditionally))
document.getElementById("additionallyResume").addEventListener("click", event=>{
    printStatMyBurger();
    closeAndOpenBlock(articleAdditionally, articleResul);
});
function printStatMyBurger(){
    document.getElementById("resulPrice").innerHTML = myBurger.price;
    document.getElementById("resulCalories").innerHTML = myBurger.calories;
}

for (let menuIdx = 0; menuIdx < document.getElementsByClassName("menu").length; menuIdx++) {
    const menu = document.getElementsByClassName("menu")[menuIdx];
    menu.addEventListener("click", event=>{
        const menu = event.target;
        for (let menuClassIdx = 0; menuClassIdx < menu.classList.length; menuClassIdx++) {
            const nameClass = menu.classList[menuClassIdx];
            switch (nameClass) {
                case "little":
                    myBurger.price+=50;
                    myBurger.calories+=20;
                    break;
                case "big":
                    myBurger.price+=100;
                    myBurger.calories+=40;
                    break;


                    
                case "cheese":
                    if (menu.innerHTML == "С сыром") {
                        myBurger.price+=10;
                        myBurger.calories+=20;
                        menu.innerHTML = "Без сыра";
                    }
                    else{
                        menu.innerHTML = "С сыром";
                        myBurger.price-=10;
                        myBurger.calories-=20;
                    }
                    break;
                case "salad":
                    if (menu.innerHTML == "С салатом") {
                        myBurger.price+=20;
                        myBurger.calories+=5;
                        menu.innerHTML = "Без салата";
                    }
                    else{
                        menu.innerHTML = "С салатом";
                        myBurger.price-=20;
                        myBurger.calories-=5;
                    }
                    break;
                case "potato":
                    if (menu.innerHTML == "С картофелем") {
                        myBurger.price+=15;
                        myBurger.calories+=10;
                        menu.innerHTML = "Без картофеля";
                    }
                    else{
                        menu.innerHTML = "С картофелем";
                        myBurger.price-=15;
                        myBurger.calories-=10;
                    }
                    break;
                    


                    
                case "spice":
                    if (menu.innerHTML == "посыпать приправой") {
                        myBurger.price+=20;
                        myBurger.calories+=5;
                        menu.innerHTML = "неыпать приправы";
                    }
                    else{
                        menu.innerHTML = "посыпать приправой";
                        myBurger.price-=20;
                        myBurger.calories-=5;
                    }
                    break;
                case "mayonnaise":
                    if (menu.innerHTML == "полить майонезом") {
                        myBurger.price+=15;
                        myBurger.calories+=10;
                        menu.innerHTML = "нелить майонез";
                    }
                    else{
                        menu.innerHTML = "полить майонезом";
                        myBurger.price-=15;
                        myBurger.calories-=10;
                    }
                    break;
            } 
            switch (nameClass) {
                case "type":
                    closeAndOpenBlock(articleType, articleTypeFilling);
                    break;
            }
        }
    });
}