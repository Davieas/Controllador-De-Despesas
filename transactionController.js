const TransactionUL = document.querySelector("#transactions");
const amount = document.querySelector("#amount");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");


function addTransactionIntoDOM(transaction){
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

  transaction.append(li);

    return forEach();
 
}

const getExpense = (transactionsAmounts) =>
  Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0)
  ).toFixed(2);

const getIncome = (transactionsAmounts) =>
  transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

const getTotal = (transactionsAmounts) =>
  transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);

const updateBalanceValues = () => {
  const transactionsAmounts = TransactionUL.map(
    (transaction) => transaction.amount
  );

  balanceDisplay.textContent = `R$ ${getTotal(transactionsAmounts)}`;
  incomeDisplay.textContent = `R$ ${getIncome(transactionsAmounts)}`;
  expenseDisplay.textContent = `R$ ${getExpense(transactionsAmounts)}`;
};

function init() {
  TransactionUL.innerHTML = "";
  transaction.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};



const generateId = () => Math.round(Math.random() * 1000);

const newTransactionToDom = (transactionName, transactionAmount) => {
  TransactionUL.push({
    id: generateId(),
    name: transactionName,
    amount: Number(transactionAmount),
  });
};

const cleanInputs = () => {
  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
  const isSomeInputEmpty = transactionName === "" || transactionAmount === "";

  if (isSomeInputEmpty) {
    alert("Preencha os Campos Antes de Enviar!!");
    return;
  }else{

  newTransactionToDom(transactionName, transactionAmount);
  init();
  cleanInputs();
  }
};

form.addEventListener("submit", handleFormSubmit);
