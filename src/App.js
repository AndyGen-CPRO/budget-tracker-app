import React, { useState } from 'react';
import './App.css';

function App() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [isVariable, setIsVariable] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurreceFreq, setRecurreceFreq] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
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
    
    if (expense < 0.01) {
      setMessage("Expense value has to be greater than 0.");
      return
    }
    
    let newExpense = parseFloat(expense).toFixed(2);
    let expenseType = "variable";

    if (isRecurring) {
      if (!recurreceFreq) {
        setMessage("Please select the recurrence frequency.")
        return;
      }

      expenseType = "recurring"

      const freqType = {
        weekly: 4, biweekly: 2, monthly: 1
      };

      newExpense = (newExpense *  freqType[recurreceFreq]).toFixed(2)
    }

    const newBudget = parseFloat(currentBudget) - parseFloat(newExpense);
    const newTotalExpense = parseFloat(totalExpense) + parseFloat(newExpense);
    setExpenseList([...expenseList, { value: newExpense, type: expenseType, frequency: recurreceFreq }]);
    setCurrentBudget(newBudget.toFixed(2));
    setTotalExpense(newTotalExpense.toFixed(2));
    setExpense(0);
    setRecurreceFreq("");
    setIsVariable(false);
    setIsRecurring(false);
    setMessage("");
  }

  const handleDelete = (index) => {
    const deletedExpense = expenseList[index];
    setExpenseList(expenseList.filter((_,expense) => expense !== index));

    const newBudget = parseFloat(currentBudget) + parseFloat(deletedExpense.value);
    const newTotalExpense = parseFloat(totalExpense) - parseFloat(deletedExpense.value);

    setCurrentBudget(newBudget.toFixed(2));
    setTotalExpense(newTotalExpense.toFixed(2));
  }

  return (
    <div className="App">
      <h1>Welcome to the Budget Tracker App</h1>
      {message && <p className="message">{message}</p>}
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
            <button onClick={() => {setIsVariable(true); setIsRecurring(false)}}>Insert Variable Expense</button>
            <button onClick={() => {setIsRecurring(true); setIsVariable(false)}}>Insert Recurring Expense</button>
            {isVariable && (
              <div>
                <label>Insert Expense: CA$</label>
                <input
                  type="number"
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                />
                <button onClick={handleExpense}>Insert</button>
              </div>
            )}
            {isRecurring && (
                <div>
                  <div>
                    <label>Insert Expense: CA$</label>
                    <input
                      type="number"
                      value={expense}
                      onChange={(e) => setExpense(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Select Recurrence Frequency:</label>
                    <select value={recurreceFreq} onChange={(e) => setRecurreceFreq(e.target.value)}>
                      <option value="" disabled>...</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Biweekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                <button onClick={handleExpense}>Insert</button>
                </div>
            )}
            {currentBudget < income && (
              <>
                <ol>
                  <strong>Expense List: <i>recurring expenses are calculated for the month</i></strong>
                  {expenseList.map((data, index) => ( 
                      <li key={index}>
                        CA${data.value} - {data.type}
                        {data.frequency && (<span> - {data.frequency}</span>)}
                        <button onClick={() => handleDelete(index)}>Delete</button>
                      </li> 
                  ))}
                </ol>
                </>
            )}
                <h3>Total Expense: CA${totalExpense}</h3>
                <h3>Current Budget: CA${currentBudget}</h3>
                {currentBudget < 1 && (
                  <>
                    <h4>Your monthly net balance is now on negative.</h4>
                  </>
                )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
