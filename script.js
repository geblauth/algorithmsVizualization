const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const BAR_COUNT = 40;
const MAX_HEIGHT = canvas.height;

const algorithms = {
  bubble: bubbleSortSteps,
  selection: selectionSortSteps
};


let values = []

function randomize() {

    values = Array.from({ length: BAR_COUNT }, () =>
        Math.floor(Math.random() * MAX_HEIGHT)
    );


    draw();
}

function draw(highlight = []){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    const barWidth = canvas.width / BAR_COUNT;

    values.forEach((value, i) =>{
        ctx.fillStyle = highlight.includes(i) ? "red" : "steelblue";
        ctx.fillRect(
             i*barWidth,
             canvas.height - value,
             barWidth -1,
             value
        );
    });
}

document.getElementById("shuffle").onclick = randomize;

randomize();

let steps = [];

function bubbleSortSteps(arr){
    steps = [];
    let a = [...arr];

    for(let i = 0; i < a.length; i++){
        for(let j = 0; j<a.length -i - 1; j++){
            steps.push({ type: "compare", indices: [j, j+1]});

            if(a[j] > a[j+1]){
                [a[j], a[j+1]] = [a[j+1], a[j]];
                steps.push({type: "swap", indices: [j,j+1]});
            }
        }
    }
}

function selectionSortSteps(arr){

    for(let i=0; i<arr.length -1; i++){
        let min = i

        for(let j=i+1;j<arr.length;j++){

            steps.push({type: "compare", indices: [min,j]})
            
            if(arr[j] < arr[min])
                minIndex = j
        }
    }

    if(min !== i){
        [arr[i], arr[min]] = [arr[min], arr[i]]
        steps.push({type: "swap", indices: [i,min]})
    }

}

let stepIndex = 0;

function play(){
     if (stepIndex >= steps.length) return;

     const step = steps[stepIndex]

     if (step.type === "compare"){
        draw(step.indices);
     }

     if(step.type ==="swap"){
        const [i,j] = step.indices;
        [values[i], values[j]] = [values[j], values[i]];
        draw(step.indices)
     }

     stepIndex++;
     setTimeout(play,5);

}

document.getElementById("start").onclick = () =>{
    stepIndex = 0
    bubbleSortSteps(values)
    play()
}

const select = document.getElementById("algorithm")

const algoName= select.value
const generateSteps = algorithms[algoName];

steps = generateSteps(values)

