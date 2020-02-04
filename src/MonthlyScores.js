import React, { useState, useEffect } from 'react';

import { getTransactionsSince, getStartDate } from './api'
import { ScoreCard } from './ScoreCard'
import { makeStyles } from '@material-ui/core'

const useClasses = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

export const MonthlyScores = ({ count }) => {
    const [months, setMonths] = useState([])
    const classes = useClasses()

    useEffect(() => {
        getTransactionsSince(getStartDate(count)).then(setMonths)
    }, [count])

    return (
        <div className={classes.container}>
            {months.map(([month, transactions]) =>
                <ScoreCard title={month} transactions={transactions} key={month} />
            )}
        </div>
    )
}