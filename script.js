document.addEventListener("DOMContentLoaded", () => {
    let balance = 0; // Start at 0 until deposit is entered
    const balanceElement = document.getElementById("balance");
    const depositInput = document.getElementById("depositAmount");
    const betInput = document.getElementById("betAmount");
    const spinButton = document.getElementById("spinButton");
    const startGameButton = document.getElementById("startGame");
    const gameContainer = document.getElementById("game-container");
    const depositContainer = document.getElementById("deposit-container");
    const reels = document.querySelectorAll(".reel");
    const resultMessage = document.getElementById("resultMessage");
    const SYMBOLS_MAP = window.slotMachine.SYMBOLS_MAP; //  Use emoji dictionary

    // Handle Deposit
    startGameButton.addEventListener("click", () => {
        let deposit = parseInt(depositInput.value);
        
        if (isNaN(deposit) || deposit <= 0) {
            alert("Please enter a valid deposit amount.");
            return;
        }

        balance = deposit;
        balanceElement.innerText = balance;
        
        // Hide deposit input and show game
        depositContainer.style.display = "none";
        gameContainer.style.display = "block";
    });

    // Handle Spin Button
    spinButton.addEventListener("click", () => {
        let bet = parseInt(betInput.value);

        if (isNaN(bet) || bet <= 0 || bet > balance) {
            resultMessage.innerText = "Invalid bet!";
            return;
        }

        balance -= bet;

        const reelsResult = window.slotMachine.spin();
        const rows = window.slotMachine.transpose(reelsResult);

        // Reset all reels to default color
        reels.forEach(reel => reel.classList.remove("win-reel"));

        // Update all 3 rows visually with emojis
        reels.forEach((reel, index) => {
            let row = Math.floor(index / 3);
            let col = index % 3;
            reel.innerText = SYMBOLS_MAP[rows[row][col]]; // ✅ Convert letter to emoji
        });

        const winnings = window.slotMachine.getWinnings(rows, bet, 3);
        balance += winnings;
        balanceElement.innerText = balance;

        if (winnings > 0) {
            resultMessage.innerHTML = `🎉 You won $${winnings}!`;

            // ✅ Find winning rows and highlight only winning reels
            rows.forEach((symbols, rowIndex) => {
                if (symbols.every(symbol => symbol === symbols[0])) { // If all are the same
                    for (let col = 0; col < 3; col++) {
                        reels[rowIndex * 3 + col].classList.add("win-reel"); // ✅ Turn winning reels light green
                    }
                }
            });
        } else {
            resultMessage.innerHTML = `❌ You lost.`;
        }

        if (balance <= 0) {
            resultMessage.innerText = "Game Over! You ran out of money.";
            spinButton.disabled = true;
        }
    });
});
