import React, { ReactNode } from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'


const styles = createStyles({
    root: {
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#e4e4e4'
    }
})

interface Props {
    classes: { [name: string]: string },
    children: ReactNode
}

export default withStyles(styles)((props: Props) => {
    const { classes, children } = props
    
    return (
        <div className={ classes.root }>
            { children }
        </div>
    )
})