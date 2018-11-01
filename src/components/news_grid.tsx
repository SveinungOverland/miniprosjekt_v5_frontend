import React, { ReactNode, Component } from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'



const styles = createStyles({
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridAutoRows: 'auto',
        gridGap: '20px',
        padding: '20px 10px'
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