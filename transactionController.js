const TransactionUL = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transaction") !== null ? localStorageTransactions : [];
const removeTransaction = (ID) => {
  transactions = transactions.filter((transaction) => transaction.id !== ID);
  updateLocalStorage();
  init();
};

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const CSSClass = transaction.amount < 0 ? "minus" : "plus";
  const AmountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSClass);
  li.innerHTML = `
   
      ${transaction.name}<span>${operator} R$ ${AmountWithoutOperator}
      </span>
      <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>

    `;

  TransactionUL.prepend(li);
};

const getExpense = transactionsAmounts => Math.abs(
  transactionsAmounts
    .filter((value) => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
).toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
.filter((value) => value > 0)
.reduce((accumulator, value) => accumulator + value, 0)
.toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
.reduce((accumulator, transaction) => accumulator + transaction, 0)
.toFixed(2);

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(
    (transaction) => transaction.amount
  );

  balanceDisplay.textContent = `R$ ${getTotal(transactionsAmounts)}`;
  incomeDisplay.textContent = `R$ ${getIncome(transactionsAmounts)}`;
  expenseDisplay.textContent = `R$ ${getExpense(transactionsAmounts)}`;
};

const init = () => {
  TransactionUL.innerHTML = "";
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
const generateId = () => Math.round(Math.random() * 1000);


const newTransactionToDom = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateId(),
    name: transactionName,
    amount: Number(transactionAmount),
  });
}

const cleanInputs = () => {
  inputTransactionName.value = ""
  inputTransactionAmount.value = ""
}



const handleFormSubmit = (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
  const isSomeInputEmpty =  transactionName === "" || transactionAmount === ""
  
  
  
  if (isSomeInputEmpty) {
    alert("Preencha os Campos Antes de Enviar!!");
    return;
  }
 
  submitEmpty();
  newTransactionToDom(transactionName, transactionAmount);
  init();
  updateLocalStorage();
  cleanInputs();

};


form.addEventListener("submit", handleFormSubmit)