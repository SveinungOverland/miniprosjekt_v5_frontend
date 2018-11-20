import React, { ReactNode, Component } from 'react'

import { withStyles, createStyles, Theme } from '@material-ui/core/styles'

import { History } from 'history'

// UI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

// API imports
import { getVerifiedUsername, removeVerifiedUsername } from '../services/user'
import { getCategories } from '../services/category'
import { DataResponse } from '../services/responseInterfaces'


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
    },


    drawer: {
        maxWidth: 120,
    }
})

interface State {
    anchorEl: EventTarget & HTMLElement | null,
    drawerOpen: boolean,
    categories: string[]
}

interface Props {
    classes: { [name: string]: string },
    history: History
}

enum MenuActions {
    CLOSE = 0,
    OPEN = 1
}

class Navigation extends Component<Props> {

    state: State = {
        anchorEl: null,
        drawerOpen: false,
        categories: []
    }


    componentDidMount() {
        getCategories()
        .then((res: DataResponse<[{ name: string }]>) => this.setState({ categories: res.data.map(it => it.name).sort() }))
    }

    
    handleMenu = (action: MenuActions) => 
        (event: React.MouseEvent<HTMLElement>) =>
            this.setState({ anchorEl: action ? event.currentTarget : null })


    logOut = (event: React.MouseEvent<HTMLElement>) => {
        removeVerifiedUsername()
        this.forceUpdate()
    }

    handleDrawer = (action: MenuActions) =>
        () => 
            this.setState({ drawerOpen: action == MenuActions.OPEN })

    handleTarget = (target: string) => () =>
            this.props.history.push(target)

    render() {
        const username: string | null = getVerifiedUsername()

        const { classes } = this.props
        const { anchorEl, drawerOpen, categories } = this.state

        console.log(categories)

        const open = Boolean(anchorEl)

        return (
            <React.Fragment>
                <AppBar className={ classes.root }>
                    <Toolbar variant="dense">
                        <IconButton color="inherit" onClick={ this.handleDrawer(MenuActions.OPEN) }>
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
                                    <MenuItem onClick={ this.handleTarget("/add") }>My posts</MenuItem>
                                    <MenuItem onClick={ this.logOut }>Log out</MenuItem>
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
                <Drawer anchor="left" open={ drawerOpen } onClose={ this.handleDrawer(MenuActions.CLOSE) }>
                    <div
                        tabIndex={ 0 }
                        role="button"
                        onClick={ this.handleDrawer(MenuActions.CLOSE) }
                        onKeyDown={ this.handleDrawer(MenuActions.CLOSE) }
                        >
                        <List>
                            <ListItem button onClick={ this.handleTarget("/") }>
                                <ListItemText>Home</ListItemText>
                            </ListItem>

                            {
                                categories.map((item, index) => (
                                    <ListItem key={index} button onClick={ this.handleTarget(`/category/${item}`) }>
                                        <ListItemText>{ item }</ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>
        )
    }
    
}


export default withStyles(styles)(Navigation)