const articleType = document.getElementById("type");
const articleTypeFilling = document.getElementById("typeFilling");
const articleAdditionally = document.getElementById("additionally");
const articleResul = document.getElementById("resul");

articleType.style.display = "none";
articleTypeFilling.style.display = "none";
articleAdditionally.style.display = "none";
articleResul.style.display = "none";

class Page {
    constructor(currentBlock){
        this.currentBlock = currentBlock
        this.currentBlock.style.display = "block";
    }
    swapBlock(newBlock){
        this.currentBlock.style.display = "none";
        this.currentBlock = newBlock
        this.currentBlock.style.display = "block";
    }
}
class Burger{
    price = 0
    calories = 0
    type
    ingredients = []
    constructor(type){
        this.type = type;
        switch (type) {
            case "little":
                this.price+=50;
                this.calories+=20;
                break;
            case "big":
                this.price+=100;
                this.calories+=40;
                break;
        }
    }
    addIngredient(type){
        if (this.ingredients.indexOf(type)==-1) {
            this.ingredients.push(type)
            switch (type) {
                case "cheese":
                    this.price+=10;
                    this.calories+=20;
                    break;
                case "salad":
                    this.price+=20;
                    this.calories+=5;
                    break;
                case "potato":
                    this.price+=15;
                    this.calories+=10;
                    break;
                    
                case "spice":
                    this.price+=20;
                    this.calories+=5;
                    break;
                case "mayonnaise":
                    this.price+=15;
                    this.calories+=10;
                    break;
            } 
        }
        
    }
    removeIngredient(type){
         if (this.ingredients.indexOf(type)!=-1) {
            this.ingredients.splice(this.ingredients.indexOf(type),1)
            switch (type) {
                case "cheese":
                    this.price-=10;
                    this.calories-=20;
                    break;
                case "salad":
                    this.price-=20;
                    this.calories-=5;
                    break;
                case "potato":
                    this.price-=15;
                    this.calories-=10;
                    break;
                    
                case "spice":
                    this.price-=20;
                    this.calories-=5;
                    break;
                case "mayonnaise":
                    this.price-=15;
                    this.calories-=10;
                    break;
            } 
        }
        
    }
    getIngredients(){
        return this.ingredients
    }
    toString(){
        return `цена: ${this.price}\nкалории: ${this.calories}`
    }
}
const page = new Page(articleType)
let burger = null

document.getElementById("typeFillingResume").addEventListener("click", event=>{
    page.swapBlock(articleAdditionally);
});
document.getElementById("additionallyResume").addEventListener("click", event=>{
    printStatMyBurger();
    page.swapBlock(articleResul);
});
function printStatMyBurger(){
    document.getElementById("resulPriceAndCalories").innerHTML = burger;
}

function swapTextSelectIngredient(type, itemMenu, selectionFlag){
     switch (type) {
            case "cheese":
                if (selectionFlag) {
                    itemMenu.innerHTML = "Без сыра";
                }
                else{
                    itemMenu.innerHTML = "С сыром";
                }
                break;
            case "salad":
                if (selectionFlag) {
                    itemMenu.innerHTML = "Без салата";
                }
                else{
                    itemMenu.innerHTML = "С салатом";
                }
                break;
            case "potato":
                if (selectionFlag) {
                    itemMenu.innerHTML = "Без картофеля";
                }
                else{
                    itemMenu.innerHTML = "С картофелем";
                }
                break;
                
            case "spice":
                if (selectionFlag) {
                    itemMenu.innerHTML = "несыпать приправы";
                }
                else{
                    itemMenu.innerHTML = "посыпать приправой";
                }
                break;
            case "mayonnaise":
                if (selectionFlag) {
                    itemMenu.innerHTML = "нелить майонез";
                }
                else{
                    itemMenu.innerHTML = "полить майонезом";
                }
                break;
        } 
}


for (let menuIdx = 0; menuIdx < document.getElementsByClassName("menu").length; menuIdx++) {
    const itemMenu = document.getElementsByClassName("menu")[menuIdx];
    itemMenu.addEventListener("click", event=>{
        const itemMenu = event.target;
        const nameClasses = itemMenu.classList;
        console.log(nameClasses)
        if (nameClasses[1]=="type") {
            burger = new Burger(nameClasses[2])
            page.swapBlock(articleTypeFilling);
        }
        else{
            const selectionFlag = nameClasses[2]=="on"
            if (selectionFlag) {
                burger.addIngredient(nameClasses[1])
                nameClasses.remove('on');
                nameClasses.add('off');
            }
            else{
                burger.removeIngredient(nameClasses[1])
                nameClasses.remove('off');
                nameClasses.add('on');
            }
            swapTextSelectIngredient(nameClasses[1], itemMenu, selectionFlag)
        }
       
        console.log(burger)
    });
}