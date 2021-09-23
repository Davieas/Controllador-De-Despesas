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
  
  const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  