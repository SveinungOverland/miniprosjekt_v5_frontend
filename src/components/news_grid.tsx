import React, { ReactNode, Component } from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'



const styles = createStyles({
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridAutoRows: 'auto',
        gridGap: '20px',
        padding: '20px 10px',

        "@media only screen and (min-width: 600px)": {
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',

            "& > :first-child": {
                gridColumn: '1/-1',
                width: 'auto !important'
            },
            "& > :nth-child(2), > :nth-child(3)": {
                gridColumn: 'span 3'
            },
            "& > div": {
                gridColumn: 'span 2'
            }
        },
        
    }
})

interface Props {
    classes: { [name: string]: string },
    children: ReactNode
}

export default withStyles(styles)((props: Props) => {
    const { classes, children } = props;
    return (
        <div className={classes.root}>
            { children }
        </div>
    )
})