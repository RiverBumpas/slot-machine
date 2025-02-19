const ROWS = 3;
const COLS = 3;

// ✅ Dictionary to map letters to casino-themed emojis 🎰
const SYMBOLS_MAP = {
    "A": "🍒",  // Cherry
    "B": "🔔",  // Bell
    "C": "🍇",  // Grapes
    "D": "⭐"   // Star
};

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

function spin() {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

function transpose(reels) {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

function getWinnings(rows, bet, lines) {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = symbols.every(symbol => symbol === symbols[0]);

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}

function generatePaytable() {
    const paytableBody = document.querySelector(".paytable tbody"); // ✅ Select only <tbody>
    const SYMBOLS_COUNT = {
        "A": 2,
        "B": 4,
        "C": 6,
        "D": 8
    };

    const SYMBOLS_MAP = {
        "A": "🍒",
        "B": "🔔",
        "C": "🍇",
        "D": "⭐"
    };

    const SYMBOL_VALUES = {
        "A": 5,
        "B": 4,
        "C": 3,
        "D": 2
    };

    paytableBody.innerHTML = ""; // ✅ Clear only the table body, not the header

    for (const symbol in SYMBOLS_MAP) {
        let emoji = SYMBOLS_MAP[symbol];
        let multiplier = `x${SYMBOL_VALUES[symbol]}`;
        let odds = `${SYMBOLS_COUNT[symbol]}/20`;

        let row = `<tr>
            <td>${emoji}</td>
            <td>${multiplier}</td>
            <td>${odds}</td>
        </tr>`;

        paytableBody.innerHTML += row;
    }
}

// Run this function after the page loads
document.addEventListener("DOMContentLoaded", generatePaytable);



// Export functions & SYMBOLS_MAP for script.js
window.slotMachine = { spin, transpose, getWinnings, SYMBOLS_MAP };
