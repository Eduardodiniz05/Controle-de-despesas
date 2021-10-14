const transactionUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');



const localStorageTransaction = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransaction : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
        updateLocalStorage()
    init()
}

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

const getExpenses = transactionsAmounts => Math.abs( transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)


const getIncome = transactionsAmounts  => transactionsAmounts.filter(value => value > 0)
.reduce((accumulator, value)=> accumulator + value, 0)
.toFixed(2)


const getTotal = transactionsAmounts =>  transactionsAmounts
        .reduce((accumulator, transaction ) => accumulator + transaction, 0)
        .toFixed(2)


const updatedBalanceValues = () => {
    const transactionsAmounts = transactions.map(transaction => transaction.amount)
    const total =  getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)
        
        
        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent =  `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`
};


const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(transationIntoDOM)
    updatedBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const addToTransactionArray = (transactionName, transactionAmount) => {
    transactions.push({ 
        id: generatedID(), 
        name: transactionName, 
        amount: Number(transactionAmount) })

}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

    if(isSomeInputEmpty) {
        alert("Por favor, preencha tanto o nome quanto o valor da transação!!!")
     return
    }

    addToTransactionArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

const generatedID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', handleFormSubmit )