import React from 'react';
import './App.css';
import { MonthlyScores } from './MonthlyScores'
import { LocaleContext } from './contexts.js'

// In "real life" this would likely come from environment variables or something
const localeConfig = {
  locales: ['en-US'],
  currencyOptions: {
    style: 'currency', currency: 'USD'
  }
}

function App() {
  return (
    <LocaleContext.Provider value={localeConfig}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            React Assessment by Joseph Folkemer
        </h1>
          <pre className="App-sub-header">{`
          A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

          Interview coding assignment below.

          A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
          (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

          Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

          Make up a data set to best demonstrate your solution
          Check solution into GitHub
          `}</pre>
        </header>
        <MonthlyScores count={3} />
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
