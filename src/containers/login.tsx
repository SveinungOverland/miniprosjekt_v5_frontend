import React, { Component, FormEvent } from 'react'

import { createStyles, withStyles } from '@material-ui/core/styles'

import { History } from 'history'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

// API imports
import { postUser, getVerifiedUsername } from '../services/user'
import { postToken } from '../services/token'


const styles = createStyles({
    root: {
        maxWidth: 600,
        margin: '0 auto',
    },
    form: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
    }
})


enum SubmitActions {
    LOGIN,
    NEW_USER
}

interface Props {
    classes: { [name: string]: string },
    history: History
}

interface State {
    username: string,
    password: string,
    value: number
}



class Login extends Component<Props> {


    state: State = {
        username: "",
        password: "",
        value: 0
    }


    handleSubmit = (action: SubmitActions) => 
        (event: FormEvent<HTMLElement>) => {
            event.preventDefault()
            const { username, password } = this.state
            if (action === SubmitActions.LOGIN) {
                postToken({ username, password })
                .then(_ => this.forceUpdate())
                .catch(console.log)
            } else {
                postUser({ username, password })
                .then(_ => this.forceUpdate())
                .catch(console.log)
            }
        }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target 
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
        this.setState({ value })
    }

    render() {
        const { classes, history } = this.props
        const { username, password, value } = this.state

        if (getVerifiedUsername()) {
            history.goBack()
        }
        console.log(this.props)
        return (
            <div style={{ paddingTop: 20 }}>
            <Paper className={ classes.root }>
                <Tabs value={ value }  onChange={ this.handleTabChange } fullWidth>
                    <Tab label="Login" />
                    <Tab label="Create user" />
                </Tabs>
                { value == 0 ?
                    <form className={ classes.form } onSubmit={ this.handleSubmit(SubmitActions.LOGIN) }>
                        <TextField
                            autoFocus
                            id="username"
                            name="username"
                            label="username"
                            value={ username }
                            onChange={ this.handleChange }
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            label="password"
                            value={ password }
                            onChange={ this.handleChange }
                            margin="normal"
                        />
                        <Button type="submit">Login</Button>
                    </form>
                    :
                    <form className={ classes.form } onSubmit={ this.handleSubmit(SubmitActions.NEW_USER) }>
                            <TextField
                                id="username"
                                name="username"
                                label="username"
                                value={ username }
                                onChange={ this.handleChange }
                                margin="normal"
                            />
                            <TextField
                                id="password"
                                type="password"
                                name="password"
                                label="password"
                                value={ password }
                                onChange={ this.handleChange }
                                margin="normal"
                            />
                            <Button type="submit">Create</Button>
                        </form>
                }
            </Paper>
            </div>
        )
    }
}


export default withStyles(styles)(Login)