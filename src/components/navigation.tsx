import React, { ReactNode, Component } from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'

// UI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import MenuIcon from '@material-ui/icons/Menu'



// Style used by navigation
const styles = createStyles({
    root: {

    },
})


interface Props {
    classes: { [name: string]: string },
}


export default withStyles(styles)((props: Props) => {
    const { classes } = props

    return (
        <AppBar className={ classes.appbar }>
            <Toolbar variant="dense">
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    Hello world
                </Typography>
            </Toolbar>
        </AppBar>
    )
})
