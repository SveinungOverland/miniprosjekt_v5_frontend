import React, { ReactNode, Component } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { FormLabel } from '@material-ui/core';



import { getUser } from '../services/user'
import { getNewsFromUsername } from '../services/news'




const styles = createStyles({
    root: {

    }
})


interface Props {
    classes: { [name: string]: string },
    match: {
        params: {
            username: string
        }
    }
}

interface State {
    userData: {}
}


class Profile extends Component<Props> {

    state: State = {
        userData: {}
    }

    componentDidMount() {
        const username = this.props.match.params.username



    }

    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>

            </div>
        )
    }
}