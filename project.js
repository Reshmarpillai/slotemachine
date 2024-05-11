// 1. Deposite some money from the user.

// importing the prompt-sync module, initializing it by calling the returned function, and assigning the result to the variable prompt. This allows to use the prompt function to synchronously get user input from the command line.
const prompt = require("prompt-sync")();

//declaration of global variable

const ROWS = 3;
const COLS = 5;

const SYMBOLS_COUNT = {
  $: 2,
  Q: 4,
  Z: 6,
  X: 8,
  W: 10,
};

const SYMBOLS_VALUE = {
  $: 5,
  Q: 4,
  Z: 3,
  X: 2,
  W: 1,
};

//function to get the deposite money from the user

const deposite = () => {
  while (true) {
    const depositeMoney = prompt("Enter your deposite money : ");
    const numberDeposite = parseFloat(depositeMoney);
    if (isNaN(numberDeposite) || numberDeposite <= 0) {
      console.log("sry. Please enter a valid amount!");
    } else {
      return numberDeposite;
    }
  }
};

//2. Determine no.of lines to bet on

const betlines = () => {
  while (true) {
    const lines = prompt(
      " Please enter the no of lines you would like to bet on (1-3) : "
    );
    const linesnumber = parseFloat(lines);
    if (linesnumber <= 0 || linesnumber > 3 || isNaN(linesnumber)) {
      console.log("Please enter valid line number!");
    } else {
      return linesnumber;
    }
  }
};

//3. collect bet amount

// const getBetAmount = (linesnumber, balance) => {
//   // const bet = 3;
//   // const betamount = linesnumber * 3;
//   // console.log("your bet amount is : ", betamount);
//   const betamount = prompt("Enter your bet amount : ");
//   const amountbalance = balance - betamount;
//   console.log("This is your balance amount : ", amountbalance);
//   if (amountbalance <= 0) {
//     console.log("Your balance is insuffient. You can't bet");
//   }
// };

//3. correct  bet function

const getBet = (balance, numOfLines) => {
  while (true) {
    const bet = prompt(" Please enter the bet per lines : ");
    const numBet = parseFloat(bet);
    if (numBet <= 0 || isNaN(numBet)) {
      console.log("invalid entry. Try again!");
    } else if (numBet > balance / numOfLines) {
      console.log(" Balance is insuffient. You can't bet. Try again!");
    } else {
      const amountbalance = balance - numBet * numOfLines;
      console.log("This is your balance amount : ", amountbalance);
      return numBet;
    }
  }
};

//4. Spin the slot machine

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbol = [...symbols];
    for (j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const randomSymbols = reelSymbol[randomIndex];
      reels[i].push(randomSymbols);
      reelSymbol.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reel) => {
  const rows = [];
  for (i = 0; i < ROWS; i++) {
    rows.push([]);
    for (j = 0; j < COLS; j++) {
      rows[i].push(reel[j][i]);
    }
  }
  return rows;
};

const slotMachine = (trans) => {
  for (const row of trans) {
    let rowString = "";
    for (const [i, symbols] of row.entries()) {
      rowString += symbols;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};
const reel = spin();
console.log(reel);
const trans = transpose(reel);
console.log(trans);
slotMachine(trans);

let balance = deposite();
console.log(balance);
const numOfLines = betlines();
console.log(numOfLines);
// getBetAmount(numOfLines, balance);
const bet = getBet(balance, numOfLines);
