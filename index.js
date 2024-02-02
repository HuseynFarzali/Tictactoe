const winningSequences = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7]
];

const xElement = `<svg class="h-[100px] text-red-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>`;

const oElement = `<svg class="h-[100px] text-blue-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z"/></svg>`;

const xSequence = [];
const oSequence = [];
let currentPlayer = "x";

const ordinateNodes = document.querySelectorAll('[ordinate]');
const gameStartButton = document.querySelector('[game-start]');
const playerButtons = document.querySelectorAll('[player]');
const conclusionSection = document.querySelector('[conclusion-section]');

playerButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        playerButton = event.target;
        currentPlayer = playerButton.getAttribute('player');

        const playerSelection = document.querySelector('[player-selection]');
        playerSelection.classList.add('hidden');

        gameStartButton.classList.remove('hidden');
    })
})

let gameActive = false;

gameStartButton.addEventListener('click', (event) => {
    if (!gameActive) {
        var btn = event.target;
        const logoElement = btn.children[0];
        logoElement.classList.remove('text-[0px]', 'ml-[-2px]', 'opacity-0');
        logoElement.classList.add('text-[20px]', 'ml-4', 'opacity-100');

        btn.innerText = `Game Active`;
        btn.appendChild(logoElement);

        btn.classList.remove('bg-green-600', 'hover:bg-green-700', 'active:px-8', 'active:py-2', 'active:h-[50px]', 'active:bg-green-500', 'active:rounded-none');
        btn.classList.add('bg-sky-600', 'hover:bg-gray-400');

        const mainContent = document.querySelector('main');
        mainContent.style.display = 'block';

        gameActive = true;
    }
    else {
        const btn = event.target;
        const logoElement = btn.children[0];
        console.log(logoElement);
        logoElement.classList.add('animate-bounce');
        let timeOut = setTimeout(() => {
            logoElement.classList.remove('animate-bounce');
        }, 3000);
    }
});

let clickCount = 0;

ordinateNodes.forEach(ordinateNode => {
    ordinateNode.addEventListener('click', implementOrdinateNodeLogic);
});