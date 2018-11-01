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
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#e4e4e4'
    },
    appbar: {

    },
    main: {
        paddingTop: 80,
    }
})


interface Props {
    classes: { [name: string]: string },
    children: ReactNode
}


class Navigation extends Component<Props> {


    render() {
        const { classes, children } = this.props;
        return (
            <div className={ classes.root }>
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
                <main className={ classes.main }>
                    { children }
                </main>
            </div>
        )
    }
}






export default withStyles(styles)(Navigation)