import React, { Component } from 'react'

import { createStyles, withStyles } from '@material-ui/core/styles'


// Types imports
import News from '../types/news'

// Services imports
import { getVerifiedUsername } from '../services/user'

const styles = createStyles({
    root: {

    },
})


interface Props extends News {
    classes: { [name: string]: string }
}

interface State {

}


class Comments extends Component<Props> {

    state: State = {

    }

    render() {
        const { classes } = this.props
        let username: string | null = getVerifiedUsername()
        return (
            <div>
                This has not been implemented yet
            </div>
        )
    }
}


export default withStyles(styles)(Comments)