// взятиие всех блоков 
const articleType = document.getElementById("type");
const articleTypeFilling = document.getElementById("typeFilling");
const articleAdditionally = document.getElementById("additionally");
const articleResul = document.getElementById("resul");

//отключение у них видимости
articleType.style.display = "none";
articleTypeFilling.style.display = "none";
articleAdditionally.style.display = "none";
articleResul.style.display = "none";

//класс для упровление отоброжений блоков
class Page {
    constructor(currentBlock){
        this.currentBlock = currentBlock
        this.currentBlock.style.display = "block";
    }
    //изменение видимового блока
    swapBlock(newBlock){
        this.currentBlock.style.display = "none";
        this.currentBlock = newBlock
        this.currentBlock.style.display = "block";
    }
    // изменение текста у блоков выбора
    swapTextSelectIngredient(type, itemMenu, selectionFlag){
        const nameClasses = itemMenu.classList
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
        if (selectionFlag) {
            nameClasses.remove('on');
            nameClasses.add('off');
        }
        else{
            nameClasses.remove('off');
            nameClasses.add('on');
        }
    }
    // вывод статистики бургера
    printStatBurger(burger){
    document.getElementById("resulPriceAndCalories").innerHTML = burger;
}
}

// класс бургера
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

// инитиализация класса
const page = new Page(articleType)
let burger = null

// кнопки для перехода на следующию таблицу 
document.getElementById("typeFillingResume").addEventListener("click", event=>{
    page.swapBlock(articleAdditionally);
});
document.getElementById("additionallyResume").addEventListener("click", event=>{
    page.printStatBurger(burger);
    page.swapBlock(articleResul);
});


// добовляем ко всем дивам у которых класс menu ивент по нажатию 
for (let menuIdx = 0; menuIdx < document.getElementsByClassName("menu").length; menuIdx++) {
    const itemMenu = document.getElementsByClassName("menu")[menuIdx];
    itemMenu.addEventListener("click", event=>{
        // берем все классы у дива по которому нажали
        const itemMenu = event.target;
        const nameClasses = itemMenu.classList;

        // если 2 клас равен type то создаем бургер с типом каторому равен 3 класс
        if (nameClasses[1]=="type") {
            burger = new Burger(nameClasses[2])
            page.swapBlock(articleTypeFilling);
        }
        else{
            // иначе удаляем / добовляем инградиенты в наш бургер 
            // берм 3 класс как переключатель
            const selectionFlag = nameClasses[2]=="on"
            // удаляем / добовляем инградиент
            if (selectionFlag) {
                burger.addIngredient(nameClasses[1])
            }
            else{
                burger.removeIngredient(nameClasses[1])
            }
            // изменяем текст
            page.swapTextSelectIngredient(nameClasses[1], itemMenu, selectionFlag)
        }
        console.log(burger)
    });
}