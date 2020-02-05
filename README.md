This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

###### Note: Most of the boiler plate generated by create-react-app was either removed or left untouched so those will not be explained here.

Check [here](https://github.com/JrFolk/react-assessment/blob/master/instructions.md) for instructions on running the application locally.

# Instructions
> A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
>
> Interview coding assignment below.
>
> A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
>
> (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
>
> Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.
>
> Make up a data set to best demonstrate your solution
> Check solution into GitHub

# The Dataset

###### Note: [`api.js`](src/api.js) purposefully obfuscates the details of data generation and exports the async function `getTransactionsSince` as a mock endpoint so that the react portion of the app could be built as if it was going to operate in the real world.

##### Generating Raw Data

I decided to generate raw data as it would likely appear if it were being read directly from a relational database.  
The raw data comes as an array of objects with the form: `[{ date, month, purchaseAmmount }, ...]`.
`reduceTransactionByMonth` and `monthReducer` are used to coallate the data into a more usable form:

```
  [{
    month,
    transactions: [{ date, purchaseAmmount}, ...]
  }, ...]
```

##### The Algorithm
>A customer receives 2 points for every dollar spent over $100 in each transaction,
plus 1 point for every dollar spent over $50 in each transaction
>
>(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

implementation is pretty straightforward:
``` javascript
export const calcScore = (price) => {
    if (price < 50) return 0
    if (price < 100) return price - 50
    return (price - 100) * 2 + 50
}
```
# React

The app consists of a single page-view [`App.js`](src/App.js), a container to display an arbitrary number of months in a flexible grid, [`MonthlyScores.js`](src/MonthlyScores.js), and an individual card component [`ScoreCard.js`](src/ScoreCard.js), which takes in the data for a single month then calculates the score and displays the results.
[`contexts.js`](src/contexts.js) is included purely as a demonstration of an effective use of reacts's context api, in this case it simply provides application wide locale support, which is used in displaying the monetary values.   

Within components I try to use naming conventions and logical structures that _hopefully_ produce self-documenting code for those who are familiar with modern react.js, so I'll just explain some design decisions.

#### [`<MonthlyScores />`](src/MonthlyScores.js)

Because we only want the (mock) fetch to happen when the commponent mounts, or when the prop `count` changes, indicating a different dataset is desired, [`getTransactionsSince`](src/api.js#L42) is called inside of a [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) hook, with only count provided in the dependency array.  
The `count` `prop` is used to determine how many months to fetch & display should it need to be adapted to accomodate a different number of months.

#### [`<ScoreCard />`](src/ScoreCard.js)

Because `calcScore` could _potentially_ be an arbitrarily expensive calculation we only want to call it on initial render or anytime the `transactions` data changes, thus it is called inside of a [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) hook with the `transactions` as the only dependency.

The `LocaleContext` from [`contexts.js`](src/contexts.js) is used to store the parameters passed to [`number.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).
# Voilà

![screenshot.png](https://github.com/JrFolk/react-assessment/blob/master/screenshot.png?raw=true)

#### concession
In the interest of clarity I tried to keep the directory plumbing to a minimum, so please forgive the unrelated utils in with the api adapter & such. I swear this usually never happens :)

# Thank you for your time and consideration!
