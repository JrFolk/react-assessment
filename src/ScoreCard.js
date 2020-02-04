import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader, ListItem, makeStyles, ListItemText } from '@material-ui/core'

import { calcScore } from './api'
import { LocaleContext } from './contexts.js'

const useClasses = makeStyles((theme) => ({
    card: {
        margin: '1em',
        flex: '1',
        minWidth: 400
    },
    label: {
        width: '50%',
        textAlign: 'right',
        display: 'inline-block',
        margin: '1em 1em 0 0'
    },
    content: {
        textAlign: 'left'
    }
}))

export const ScoreCard = ({ title, transactions }) => {
    const [totals, setTotals] = useState({ score: 0, moneySpent: 0 })
    const classes = useClasses()
    const { locales, currencyOptions } = useContext(LocaleContext)
    const { moneySpent, score } = totals

    useEffect(() => {
        const totals = transactions.reduce(({ score, moneySpent }, { purchaseAmount }) => {
            moneySpent += purchaseAmount
            score += calcScore(purchaseAmount)
            return { score, moneySpent }
        }, { score: 0, moneySpent: 0 })

        setTotals(totals)
    }, [transactions])

    return (
        <div className={classes.card}>
            <Card>
                <CardHeader title={title}></CardHeader>
                <CardContent className={classes.content}>
                    <div>
                        <strong className={classes.label}>Purchase Total: </strong>
                        <span>{moneySpent.toLocaleString(locales, currencyOptions)}</span>
                    </div>
                    <div>
                        <strong className={classes.label}>Points Earned: </strong>
                        <span>{score.toLocaleString(locales)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}