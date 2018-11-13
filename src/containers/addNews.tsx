import React, { Component } from 'react'
import { createStyles, withStyles, Theme } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'


// Project imports
import Navigation from '../components/navigation'

const styles = ({ spacing, mixins }: Theme) => createStyles({
    root: {
        margin: '0 auto',
        maxWidth: 1200,
        paddingTop: 48,
    },
    toolbar: mixins.toolbar
})


interface Props {
    classes: { [name: string]: string }
}

interface State {

}

class AddNews extends Component<Props> {

    state: State = {

    }

    
    render() {
        const { classes } = this.props

        return (
            <div className={ classes.root }>
                <Navigation>
                    
                </Navigation>
                <Drawer
                    variant="permanent"
                >
                    <div className={ classes.toolbar } />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <h1>Hello world</h1>
            </div>
            
        )
    }
}


export default withStyles(styles)(AddNews)