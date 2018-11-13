import React, { Component, FormEvent } from 'react'

import { createStyles, withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// API imports
import { postUser, getVerifiedUsername } from '../services/user'
import { postToken } from '../services/token'
import { Redirect } from 'react-router'


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
    classes: { [name: string]: string }
}

interface State {
    username: string,
    password: string,
}



class Login extends Component<Props> {


    state: State = {
        username: "",
        password: ""
    }


    handleSubmit = (action: SubmitActions) => 
        (event: FormEvent<HTMLElement>) => {
            event.preventDefault()
            const { username, password } = this.state
            if (action === SubmitActions.LOGIN) {
                postToken({ "username": username, "password": password })
                .then(_ => this.forceUpdate())
                .catch(console.log)
            } else {
                //postUser()
            }
        }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target 
        console.log(name, value)
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    render() {
        const { classes } = this.props
        const { username, password } = this.state

        console.log("Verified username", getVerifiedUsername())

        if (getVerifiedUsername()) {
            return <Redirect to="/" />
        }

        return (
            <div style={{ paddingTop: 20 }}>
            <Paper className={ classes.root }>
                <form className={ classes.form } onSubmit={ this.handleSubmit(SubmitActions.LOGIN) }>
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
                        name="password"
                        label="password"
                        value={ password }
                        onChange={ this.handleChange }
                        margin="normal"
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Paper>
            </div>
        )
    }
}


export default withStyles(styles)(Login)