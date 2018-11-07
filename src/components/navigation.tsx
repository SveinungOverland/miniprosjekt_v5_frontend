import React, { ReactNode, Component } from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'
import { getVerifiedUsername } from '../api/user'
import jwt_decode from 'jwt-decode'

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
const styles = createStyles({
    root: {
        flexGrow: 1,
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



    render() {
        const username: string | null = getVerifiedUsername()

        const { classes } = this.props
        const { anchorEl } = this.state

        const open = Boolean(anchorEl)

        return (
            <AppBar className={ classes.appbar }>
                <Toolbar variant="dense">
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={ classes.grow }>
                        News
                    </Typography>
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
                                <MenuItem onClick={this.handleMenu(MenuActions.CLOSE)}>Profile</MenuItem>
                                <MenuItem onClick={this.handleMenu(MenuActions.CLOSE)}>My account</MenuItem>
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