'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Uttam Singh Rawat',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 9131,
};

const account2 = {
  owner: 'Shivam Shankar Ojha',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 9130,
};

const account3 = {
  owner: 'Ankit Kumar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 9129,
};

const account4 = {
  owner: 'Nehal ahmed',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 9132,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false){
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice()
  .sort((a,b) => a - b) : movements;
  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}
     ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  console.log();
}
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov,0);
  labelBalance.textContent = `${acc.balance}💶`;
}

const calcDisplaySummary = function(acc){
  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc,mov) => acc+mov,0); 
 /////////////////////////////////
  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc,mov) => acc+mov,0); 
//////////////////////////////////////
const interest = acc.movements
.filter(mov => mov > 0 )
.map(deposit => (deposit * acc.interestRate)/ 100)
.filter((int,i,arr) => int >= 1)
.reduce((acc, int) => acc + int,0);

  labelSumIn.textContent = `${incomes}💶`;
  labelSumOut.textContent = `${Math.abs(out)}💶`;
  labelSumInterest.textContent = `${(interest)}💶`;
}

const createUsernames = function(accs){
    accs.forEach(function (acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
}
createUsernames(accounts);

const updateUI = function(acc){
//Display movements
displayMovements(acc.movements);
//Display balance
calcDisplayBalance(acc);
//Display summary
calcDisplaySummary(acc);
}

let currentAccount;
//Event Listener
btnLogin.addEventListener('click',function(e){
  e.preventDefault(); 
  
  currentAccount = accounts.find(acc => 
  acc.username === inputLoginUsername.value)

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //Display UI and WELCOME message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    //Clear Input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  }

})

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value);
    console.log(amount,receiverAcc);
    inputTransferAmount.value = inputTransferTo.value = '';
    if(
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
      ){
        //Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        //Update UI
        updateUI(currentAccount);
      }
})

btnLoan.addEventListener('click',function(e){
e.preventDefault();
const amount = Number(inputLoanAmount.value);
if(amount > 0 &&
  currentAccount.movements.some(mov => mov >= amount * 0.1))
  {
    //Add the Movements
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
       //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
})
let sorted = false;
btnSort.addEventListener('click',function(e){
e.preventDefault();
displayMovements(currentAccount.movements, !sorted);
sorted = !sorted;
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//Map Method :- 148
// const eurToUsd = 1.1;
// const movementsUSD = movements.map(function(mov){
// return mov * eurToUsd;
// })
// //In arrow function
// // const movementsUSD = movements.map(mov => mov * eurToUsd );
// console.log(movements);
// console.log(movementsUSD);
// const movementsUSDfor = [];
// for(const mov of movements) {
//   movementsUSDfor.push(movements.eurToUsd);
// }
// console.log(movementsUSD);

// const movementDescriptions = movements.map((mov, i, arr) => 
//   `Movement ${i + 1}: You ${ mov > 0 ? 'deposited': 'withdraw'} ${Math.abs(mov)}`  
// );
// console.log(movementDescriptions);


//Filter method :- 150
// const deposits = movements.filter(function(mov){
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsfor = [];
// for(const mov of movements ){
// if(mov > 0 ){
//   depositsfor.push(mov);
// }
// }
// console.log(depositsfor);
// const withdrwals = movements.filter(mov => mov < 0);
// console.log(withdrwals);


//Reduce method :- 151
// accumulator ->SNOWBALL
// const balance = movements.reduce((acc, curr) => acc + curr,0);
// console.log(balance);
// let balance2 = 0;
// for(const mov of movements){
//   balance2 += mov;
//   console.log(balance2);
// }
//Finding maximmum value using reduce 
// const max = movements.reduce((acc, mov)=> {
// if(acc > mov)
// return acc;
// else
// return mov;
// },movements[0])
// console.log(max);

// Magic of channing Methods :-153
//PIPELINE
// const eurToUSD = 1.1;
// const totaldepositUSD = movements
// .filter(mov => mov > 0)
// .map((mov, i , arr) => mov * eurToUSD)
// // .map(mov => mov * eurToUSD)
// .reduce((acc,mov) => acc+mov,0); 
// console.log(totaldepositUSD);

// FInd Method :-155
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
// console.log('11111');

// // var accountfor;
// for(const i of accounts){
//   if(i.owner === 'Jessica Davis')
//   {
//     console.log(i);
//   }
// }

////Implement Login :-156

////Some and every  :- 159

//Equality
// console.log(movements.includes(-130));

// //Some Condition
// console.log(movements.some(mov => mov === -130));
// const anyDeposists = movements.some(mov => mov > 0);
// console.log(anyDeposists);

// //Every
// console.log(account4.movements.every(mov => mov > 0));

// //Seprate Callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));

//// Flat and Flatmap :-160
// const ary = [[1,2,3],[4,5,6],7,8];
// console.log(ary.flat());
// const arr = [[[1,2],3],[4,[5,6]],7,8];
// console.log(ary.flat(2));

// //flat

// const overalBalance = accounts
// .map(acc => acc.movements)
// .flat()
// .reduce((acc, mov) => acc + mov,0);
// console.log(overalBalance);

// //flatMap only deserilaize array at one depth
// const overalBalance2 = accounts
// .flatMap(acc => acc.movements)
// .reduce((acc, mov) => acc + mov,0);
// console.log(overalBalance2);


//// Sorting arrays:- 161
// const owners = ['Jonas', 'Zach', 'Adan', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// //Numbers
// console.log(movements);

//returns < 0 A,B (keep order)
//returns > 0 B,A (Switch order)

//Ascending 
//  movements.sort((a, b) =>{
//   if(a > b) return 1;
//   if(a < b) return -1;
// })
// movements.sort((a,b) => a - b);
// console.log(movements);

// //Descending
// movements.sort((a, b) => {
//   if(a > b) return -1;
//   if(a < b) return  1;
// });
// console.log(movements);

//// More ways to creating and filling arrays:-162
// console.log([1,2,3,4,5,6,7]);
// console.log(new Array(1,2,3,4,5,6,7));

// //Empty arrays + fill method
// const x = new Array(7);
// console.log(x);
// // console.log(x.map(() => 5));
// x.fill(1,3,5);
// x.fill(1);
// console.log(x);

// //Array.from
// const y = Array.from({length: 7}, () => 1);
// console.log(y);

// const z = Array.from({length: 7}, (curr, i) => i+1);
// console.log(z);

// labelBalance.addEventListener('click',function(){
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€',''))
//   )
//   console.log(movementsUI);
// })


////Array method practice

//1. 
// const bankDepositSum = accounts
// .flatMap(acc => acc.movements)
// .filter(mov => mov > 0)
// .reduce((sum,cur) => sum + cur, 0);

// console.log(bankDepositSum);

// //2.
// const numDeposit1000_1 = accounts
// .flatMap(acc => acc.movements)
// .filter(mov => mov >= 1000).length;
// console.log(numDeposit1000_1);

//  //OR 
// const numDeposit1000_2 = accounts
// .flatMap(acc => acc.movements)
// .reduce((count, curr) => (curr >= 1000 ? ++count: count),0);
// console.log(numDeposit1000_2);

// //3.
// const {deposits,withdrawals} = accounts
// .flatMap(acc => acc.movements)
// .reduce(
//   (sums, cur) =>{
//     // cur > 0 ? (sums.deposits +=cur) : (sums.withdrawals +=cur);
    
//     //OR

//     sums[cur > 0 ? 'deposits':'withdrawals'] +=cur;
//     return sums;
//   },
//   {deposits: 0,withdrawals: 0}
// );
// console.log(deposits,withdrawals);

