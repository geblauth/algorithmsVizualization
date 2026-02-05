const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const BAR_COUNT = 40;
const MAX_HEIGHT = canvas.height;

const algorithms = {
    bubble: bubbleSortSteps,
    selection: selectionSortSteps,
    insertion: insertionSortSteps
};


let values = []
let steps = []
let stepIndex = 0

function randomize() {

    values = Array.from({ length: BAR_COUNT }, () =>
        Math.floor(Math.random() * MAX_HEIGHT)
    );


    draw();
}

function draw(highlight = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / BAR_COUNT;

    values.forEach((value, i) => {
        ctx.fillStyle = highlight.includes(i) ? "red" : "steelblue";
        ctx.fillRect(
            i * barWidth,
            canvas.height - value,
            barWidth - 1,
            value
        );
    });
}

document.getElementById("shuffle").onclick = randomize;

randomize();


function bubbleSortSteps(arr) {
    steps = [];
    let a = [...arr];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            steps.push({ type: "compare", indices: [j, j + 1] });

            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                steps.push({ type: "swap", indices: [j, j + 1] });
            }
        }
    }
    return steps
}

function selectionSortSteps(arr) {
    const steps = []
    const a = [...arr]

    for (let i = 0; i < a.length - 1; i++) {
        let min = i

        for (let j = i + 1; j < a.length; j++) {

            steps.push({ type: "compare", indices: [min, j] })

            if (a[j] < a[min]) { min = j }
        }
    

    if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]]
        steps.push({ type: "swap", indices: [i, min] })
    }
    }
    return steps

}

function insertionSortSteps(arr){

    const steps = []
    const a  = [...arr]

    for(let i= 1; i<a.length; i++){
        let j =i
        while(j>0){
            steps.push({type: "compare", indices: [j-1,j]})

            if(a[j-1] > a[j]){
                [a[j-1], a[j]] =  [a[j], a[j-1]]
                steps.push({type: "swap", indices: [j-1,j]})
                j--
            }else{
                break
            }

        }
    }
    return steps
}


function play() {
    if (stepIndex >= steps.length) return;

    const step = steps[stepIndex]

    if (step.type === "compare") {
        draw(step.indices);
    }

    if (step.type === "swap") {
        const [i, j] = step.indices;
        [values[i], values[j]] = [values[j], values[i]];
        draw(step.indices)
    }

    stepIndex++;
    setTimeout(play, 5);

}

document.getElementById("start").onclick = () => {
    stepIndex = 0


    const select = document.getElementById("algorithm")

    const algoName = document.getElementById("algorithm").value
    const generateSteps = algorithms[algoName];

    steps = generateSteps(values)
    play()
}
