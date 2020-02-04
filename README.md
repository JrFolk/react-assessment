This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Check [here](https://github.com/JrFolk/react-assessment/blob/master/instructions.md) for instructions on running the application locally.

###### Note: `api.js` purposefully obfuscates the details of data generation and exports the async function `getTransactionsSince` as a mock endpoint so that the react portion of the app could be built as if it was going to operate in the real world.

### Instructions
```
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

Interview coding assignment below.

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction

(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

Make up a data set to best demonstrate your solution
Check solution into GitHub
```
### Making the Dataset

##### Generating Raw Data

I decided to generate raw data as it would likely appear if it were being read directly from a relational database.  
The raw data comes as an array of objects with the form: `[{ date, month, purchaseAmmount }, ...]`.
`reduceTransactionByMonth` and `monthReducer` are utility functions to coallate the data into a more usable form:

```
  [{
    month,
    transactions: [{ date, purchaseAmmount}, ...]
  }, ...]
```

##### The Algorithm

```
A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction

(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
```

Implamentation is pretty straightforward, and exported as a utility function:
``` javascript
export const calcScore = (price) => {
    if (price < 50) return 0
    if (price < 100) return price - 50
    return (price - 100) * 2 + 50
}
```
##### React

The app consists of a single page-view `App.js`, a container to display a flexible number of months in a flexible grid `MonthlyScores.js`, and an individual card component which takes in the data for a single month, calculates the score and displays the results.  `contexts.js` is included purely as a demonstration of an effective use of reacts's context api, in this case it simply provides application wide locale support, which is used in displaying the monetary values.

![screenshot.png](https://github.com/JrFolk/react-assessment/blob/master/screenshot.png?raw=true)

