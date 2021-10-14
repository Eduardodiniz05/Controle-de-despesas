const transactionUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const dummyTransations = [
    { id: 1, name: 'bolo de brigadeiro', amount: -20 },
    { id: 2, name: 'salário', amount: 300},
    { id: 3, name: 'torta de frango', amount: -10 },
    { id: 4, name: 'violão', amount: 150 },
]

const transationIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li');


    li.classList.add('CSSClass')
    li.innerHTML = `
              ${transaction.name}  
              <span>${operator} R$ ${amountWithoutOperator} </span>
              <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
              x
              </button>
   
    `
  transactionUl.append(li)
}

const updatedBalanceValues = () => {
    const transactionsAmounts = dummyTransations
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction ) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value)=> accumulator + value, 0)
        .toFixed(2)

        const expense = Math.abs( transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)
        
        
        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent =  `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`
};


const init = () => {
    transactionUl.innerHTML = ''
    dummyTransations.forEach(transationIntoDOM)
    updatedBalanceValues()
}

init()

const generatedID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();


    if(transactionName === '' || transactionAmount === '') {
        alert("Por favor, preencha tanto o nome quanto o valor da transação!!!")
     return
    }

    const transaction = { 
        id: generatedID(), 
        name: transactionName, 
        amount: Number(transactionAmount) }

    console.log(transaction)

    dummyTransations.push(transaction)
    init()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})