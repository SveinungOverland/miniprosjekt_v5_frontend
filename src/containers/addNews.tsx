import React, { Component, FormEvent } from 'react'
import { createStyles, withStyles, Theme } from '@material-ui/core/styles'

import { History } from 'history'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


import AddBoxIcon from '@material-ui/icons/AddBox'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'


// Type imports
import News from '../types/news'

// Service imports
import { getNewsFromUsername, postNews, updateNews } from '../services/news'
import { getVerifiedUsername } from '../services/user'
import { NewsResponse } from '../services/responseInterfaces'

// Project imports
import Navigation from '../components/navigation'
import LiveFeed from '../components/live_feed'

const styles = ({ spacing, mixins }: Theme) => createStyles({
    root: {
        margin: '0 auto',
        maxWidth: 800,
        paddingTop: 100,
    },
    toolbar: mixins.toolbar,

    card: {
        width: 180,
        margin: '10px 10px'
    },
    cardMedia: {
        maxHeight: 140,
        width: '100%',
        objectFit: 'contain'
    },
    cardContent: {
        fontWeight: 'bold',
        padding: 5
    },

    formRoot: {
        marginTop: 20,
        marginLeft: 200,
    },
    form: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column'
    }
})


interface Props {
    classes: { [name: string]: string },
    history: History
}

interface State {
    news: News[],
    position: number,
    selected: {
        header: string,
        content: string,
        peek: string,
        image: string,
        category: string
    }
}

class AddNews extends Component<Props> {

    state: State = {
        news: [],
        position: 0,
        selected: {
            header: "",
            content: "",
            peek: "",
            image: "",
            category: ""
        }
    }


    componentDidMount() {
        let username = getVerifiedUsername()
        if (username) getNewsFromUsername(username)
            .then((res: NewsResponse) => {
                this.overwriteNews(res.data)
            })
        else {
            this.props.history.push('/login')
        }
    }


    overwriteNews = (news: News[]) => this.setState({news: news})


    handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        let username = getVerifiedUsername()
        if (username) {
            if (this.state.position == 0) {
                // Make a new post
                postNews({
                    ...this.state.selected,
                    poster: username
                })
            } else {
                // Update older post
                updateNews({
                    ...this.state.selected,
                    poster: username,
                    timestamp: this.state.news[this.state.position].timestamp
                })
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            selected: {
                ...this.state.selected,
                [event.target.name]: event.target.value
            }
        })
    }

    
    render() {
        const { classes, history } = this.props
        const { news } = this.state
        const { header, content, peek, image, category } = this.state.selected

        return (
            <div className={ classes.root }>
                <Navigation />
                <LiveFeed history={ history }/>
                <Drawer
                    variant="permanent"
                >
                    <div className={ classes.toolbar } />
                    <div className={ classes.toolbar } />
                    <List>
                        <ListItem button>
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText>Create new</ListItemText>
                        </ListItem>
                        {
                            news.map((item, index) => (
                                <Card className={ classes.card } key={index}>
                                    <CardActionArea>
                                        <img className={ classes.cardMedia }
                                            src={ item.image }
                                        />
                                        <Typography className={ classes.cardContent }>
                                        { item.header }
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            ))
                        }
                    </List>
                </Drawer>

                    <Paper className={ classes.formRoot }>
                        <form className={ classes.form } onSubmit={ this.handleSubmit }>
                            <TextField 
                                id="category"
                                name="category"
                                label="Category"
                                value={ category }
                                onChange={ this.handleChange }
                            />
                            <TextField 
                                id="image"
                                name="image"
                                label="Image"
                                value={ image }
                                onChange={ this.handleChange }
                            />
                            <TextField 
                                id="header"
                                name="header"
                                label="Header"
                                value={ header }
                                onChange={ this.handleChange }
                            />
                            <TextField 
                                id="peek"
                                name="peek"
                                label="Peek"
                                value={ peek }
                                onChange={ this.handleChange }
                            />
                            <TextField 
                                id="content"
                                name="content"
                                label="Content"
                                value={ content }
                                onChange={ this.handleChange }
                            />
                            <Button type="submit" variant="contained">Submit</Button>
                        </form>
                    </Paper>


            </div>
            
        )
    }
}


export default withStyles(styles)(AddNews)