let inputDir = {x:0, y:0};
let speed = 4;
let lastPainttime = 0;
let snakeArr = [
    {x:13, y:15}
];

let food = {x:6, y:7};
let score = 0;

let board = document.getElementById("board");
let scorebox = document.getElementById("scorebox");


// Game Funciton
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if((ctime - lastPainttime)/1000 < 1/speed){
        return
    }
    lastPainttime = ctime;
    gameEngine();
}

function isCollide(sArr){
    // if snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }    
    }

    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0 ){
        return true;
    }
    return false;
}


function gameEngine(){
    if(isCollide(snakeArr)){
        inputDir = {x:0, y:0};
        alert("Game Over, Press any Key to Play Again");
        snakeArr = [
            {x:13, y:15}
        ]
        score = 0; 
        scorebox.innerHTML = "Score:" + score;
    }

// if snake has had the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        scorebox.innerHTML = "Score:" + score;
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random()) }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    }

// moving the snake
for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;


//displaying the snake and food 
    // displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((element,index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart =  element.x;
        
        if(index === 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    // displaying the food
    let foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart =  food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);

}

// main llogic starts here, we use animation frame for any animation;
window.requestAnimationFrame(main);


window.addEventListener('keydown', (e)=>{
    inputDir = {x:0, y:1};
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
                break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})