import React, { useState } from 'react';
import './App.css';

function App() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [message, setMessage] = useState("");

  const handleIncome = () => {
    if (!income) {
      setMessage("Please insert a valid income value.");
      return
    }

    if (income < 1) {
      setMessage("Monthly income has to be greater than 0.");
      return
    }
    
    const initIncome = parseFloat(income).toFixed(2);
    setIncome(initIncome);
    setCurrentBudget(initIncome);
    setMessage("");
  }

  const handleExpense = () => {
    if (!expense) {
      setMessage("Please insert a valid expense value.");
      return
    }
    
    if (expense < 1) {
      setMessage("Expense value has to be greater than 0.");
      return
    }

    const newExpense = parseFloat(expense).toFixed(2);
    const newBudget = parseFloat(currentBudget - newExpense).toFixed(2);
    setExpenseList([...expenseList, newExpense]);
    setCurrentBudget(newBudget);
    setExpense(0);
    setMessage("");
  }

  return (
    <div className="App">
      <h1>Welcome to the Budget Tracker App</h1>
      {message && <p>{message}</p>}
      {!currentBudget ? (
        <>
          <div>
            <label>Monthly Income: CA$</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <button onClick={handleIncome}>Insert</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2>Initial Monthly Cash In: CA${income}</h2>
            <div>
              <label>Insert Expense:</label>
              <input
                type="number"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
              <button onClick={handleExpense}>Insert</button>
            </div>
            {expenseList && (
              <>
                <ol>
                  {expenseList.map((data, index) => ( 
                      <li key={index}>CA${data}</li> 
                  ))}
                </ol>
                <h3>Current Budget: {currentBudget}</h3>
                {currentBudget < 1 && (
                  <>
                    <h4>Your monthly net balance is now on negative.</h4>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
