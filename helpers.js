function implementOrdinateNodeLogic(event)  {
    let ordinateNode = event.target;

    if (checkInnerContent(ordinateNode)) {
        return;
    }

    if (currentPlayer === 'x') {
        ordinateNode.innerHTML = xElement;

        xSequence.push(getOrdinateNumber(ordinateNode));
        let success = checkForWin(currentPlayer);
        if (success) {
            declareWinner(currentPlayer);
        }

        currentPlayer = 'o';
    }
    else if (currentPlayer === 'o') {
        ordinateNode.innerHTML = oElement;

        oSequence.push(getOrdinateNumber(ordinateNode));
        let success = checkForWin(currentPlayer);
        if (success) {
            declareWinner(currentPlayer);
        }

        currentPlayer = 'x';
    }

    clickCount++;

    if (clickCount >= 9) {
        declareDraw();
    }
    console.log(clickCount);
}

function contentEqual(mainArray, comparingArray) {
    const threshold = 3;
    let equalityCount = 0;
    for (let element of mainArray) {
        let contains = comparingArray.includes(parseInt(element));
        if (contains) {
            equalityCount++; 
        }
            
        if (equalityCount >= threshold) return true;
    }

    return false;
}

function checkForWin(currentPlayer) {
    let sequence = null;
    if (currentPlayer === 'x') {
        sequence = xSequence
    }
    else if (currentPlayer === 'o') {
        sequence = oSequence;
    }

    console.log(`Checking for ${currentPlayer} win // sequence: ${sequence}`);

    let success = false;

    winningSequences.forEach(seq => {
        if (contentEqual(sequence, seq)) {
            console.log(`Winner found: ${currentPlayer}`);
            success = true;
        }
    });

    return success;
}

function getOrdinateNumber(element) {
    return element.getAttribute('ordinate');
}

function checkInnerContent(element) {
    if (element.innerHTML) {
        return true;
    }
    else {
        return false;
    }
}

function declareDraw() {
    conclusionSection.innerText = "No winner";
    conclusionSection.classList.remove('hidden');

    const restartButton = document.querySelector('[restart-button]');
    restartButton.classList.remove('hidden');
    restartButton.addEventListener('click', (event) => {
        location.reload();
    });

    ordinateNodes.forEach(ordinate => {
        ordinate.removeEventListener('click', implementOrdinateNodeLogic);
    });
}

function declareWinner(currentPlayer) {
    conclusionSection.innerText = `Player ${currentPlayer} wins!`;
    conclusionSection.classList.remove('hidden');

    const restartButton = document.querySelector('[restart-button]');
    restartButton.classList.remove('opacity-0');
    restartButton.classList.add('opacity-100');
    restartButton.addEventListener('click', (event) => {
        location.reload();
    });

    ordinateNodes.forEach(ordinate => {
        ordinate.removeEventListener('click', implementOrdinateNodeLogic);
    });
}