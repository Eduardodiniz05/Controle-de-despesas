const transactionUl = document.querySelector('#transactions')

const dummyTransations = [
    { id: 1, name: 'bolo de brigadeiro', amount: -20 },
    { id: 2, name: 'salário', amount: 300},
    { id: 3, name: 'torta de frango', amount: -10 },
    { id: 4, name: 'violão', amount: -150 },
]

const transationIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li');


    li.classList.add('CSSClass')
    li.innerHTML = `
              ${transaction.name}  <span>${operator} R$ ${amountWithoutOperator} </span><button class="delete-btn">x</button>
   
    `
  transactionUl.append(li)
}

const init = () => {
    dummyTransations.forEach(transationIntoDOM)
}

init()