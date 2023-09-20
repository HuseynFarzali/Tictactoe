const cellBlocks = document.querySelectorAll('div[data-block="cell"]');
let currentIcon = 'cross';
const xmarkString = '<i class="fa-solid fa-xmark"></i>';
const xmarkMem = [];

const circleString = '<i class="fa-regular fa-circle"></i>';
const circleMem = [];

let clickCount = 0;

const winningSequences = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7]
]

function getIconContainer(iconType) {
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = 
        iconType === 'cross'
            ? xmarkString // if type -> cross
            : circleString; // if type -> circle
    
    resultDiv.classList.add(
        'h-[200px]',
        'w-[200px]',
        'text-[150px]',
        'flex',
        'justify-center',
        'items-center'
    );

    return resultDiv;
}

function toggleIcon () {
    currentIcon = currentIcon === 'cross' ? 'circle' : 'cross';
}

function postMem(iconType, dataLocation) {
    if (iconType === 'cross') {
        xmarkMem.push(dataLocation);
        console.log(`xMem: ${xmarkMem}`);

    } else if (iconType === 'circle') {
        circleMem.push(dataLocation);
        console.log(`circleMem: ${circleMem}`);
    }
}

function deepEqual(sequence, mem) {
    console.log(`seq:${sequence} mem:${mem}`);
    if (mem.length < 3) {return false;}
    return sequence.every((seqChunk) => mem.includes());
}

function checkForWinner() {
    let xmarkWon = winningSequences.some((seq) => deepEqual(seq, xmarkMem));
    let circleWon = winningSequences.some((seq) => deepEqual(seq, circleMem));

    console.log(`xmark: ${xmarkWon}`);
    console.log(`circle: ${circleWon}`);
    
    if (xmarkWon) {
        alert("X mark won!!");
    } else if (circleWon) {
        alert("Circle mark won");
    }
}

function declareDraw() {
    alert("Draw!!!");
}

cellBlocks.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        const cellFilled = e.target.getAttribute('data-exist');

        if (cellFilled === 'false') {
            e.target.appendChild(
                getIconContainer(currentIcon)
            );
            const dataLocationOfCell = e.target.getAttribute('data');
            postMem(currentIcon, dataLocationOfCell);

            checkForWinner();
            clickCount++;

            if (clickCount >= 9) {
                declareDraw();
            }
            toggleIcon();
        }

        e.target.setAttribute('data-exist', 'true');
    });
});