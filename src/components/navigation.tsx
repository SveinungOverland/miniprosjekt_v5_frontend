import React, { ReactNode, Component } from 'react'

import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import { getVerifiedUsername, removeVerifiedUsername } from '../services/user'

// UI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';



// Style used by navigation
const styles = ({ zIndex }: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: zIndex.drawer + 2
    },

    grow: {
        flexGrow: 1,
    },

    anchorRight: {
        marginRight: 0,
        marginLeft: -15,
    }
})

interface State {
    anchorEl: EventTarget & HTMLElement | null
}

interface Props {
    classes: { [name: string]: string },
}

enum MenuActions {
    CLOSE = 0,
    OPEN = 1
}

class Navigation extends Component<Props> {

    state: State = {
        anchorEl: null
    }


    
    handleMenu = (action: MenuActions) => 
        (event: React.MouseEvent<HTMLElement>) =>
            this.setState({ anchorEl: action ? event.currentTarget : null })


    logOut = (event: React.MouseEvent<HTMLElement>) => {
        removeVerifiedUsername()
        this.forceUpdate()
    }


    render() {
        const username: string | null = getVerifiedUsername()

        const { classes } = this.props
        const { anchorEl } = this.state

        const open = Boolean(anchorEl)

        return (
            <AppBar className={ classes.root }>
                <Toolbar variant="dense">
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }} className={ classes.grow }>
                        <Typography variant="h6" color="inherit">
                            News
                        </Typography>
                    </Link>
                    { username ?
                        <div className={ classes.anchorRight }>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu(MenuActions.OPEN)}
                                color="inherit"
                                >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleMenu(MenuActions.CLOSE)}
                            >
                                <MenuItem onClick={this.logOut}>Log out</MenuItem>
                            </Menu>
                        </div>
                        :
                        <div className={ classes.anchorRight }>
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                                <Button variant="flat" color="inherit">Create/Login</Button>
                            </Link>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        )
    }
    
}


export default withStyles(styles)(Navigation)