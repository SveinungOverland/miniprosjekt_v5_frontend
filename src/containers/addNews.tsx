import React, { Component, FormEvent } from 'react'
import { createStyles, withStyles, Theme } from '@material-ui/core/styles'

import classNames from 'classnames'

import { History } from 'history'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


import AddBoxIcon from '@material-ui/icons/AddBox'



// Type imports
import News from '../types/news'

// Service imports
import { getNewsFromUsername, postNews, updateNews, deleteNews } from '../services/news'
import { getVerifiedUsername } from '../services/user'
import { NewsResponse } from '../services/responseInterfaces'

// Project imports
import Navigation from '../components/navigation'
import LiveFeed from '../components/live_feed'
import { getCategories } from '../services/category';
import { MenuItem } from '@material-ui/core';

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
    },

    submit: {
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column'
    },

    green: {
        backgroundColor: '#31c455',
        '&:hover': {
            backgroundColor: '#18702e'
        }
    },
    red: {
        backgroundColor: '#d12121',
        '&:hover': {
            backgroundColor: '#961515'
        }
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
    },

    categories: string[]
}

class AddNews extends Component<Props> {

    state: State = {
        news: [],
        position: -1,
        selected: {
            header: "",
            content: "",
            peek: "",
            image: "",
            category: ""
        },

        categories: []
    }


    componentDidMount() {
        let username = getVerifiedUsername()
        if (username) {
            getNewsFromUsername(username)
            .then((res: NewsResponse) => {
                this.overwriteNews(res.data.reverse())
            })
            getCategories()
            .then(res => {
                this.setState({ categories: res.data.map(it => it.name).sort() })
            })
        }
        else {
            this.props.history.push('/login')
        }
    }


    overwriteNews = (news: News[]) => this.setState({news: news})


    handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        let username = getVerifiedUsername()
        if (username) {
            if (this.state.position == -1) {
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
        this.makeNewNews()
        this.componentDidMount()
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        this.setState({
            ...this.state,
            selected: {
                ...this.state.selected,
                [event.target.name]: event.target.value
            }
        })
    }

    handleNewsChange = (position: number, news: News) => () =>
        this.setState({
            position: position,
            selected: {
                ...news
            }
        })

    makeNewNews = () => 
        this.setState({
            position: -1,
            selected: {
                header: "",
                content: "",
                peek: "",
                image: "",
                category: ""
            }
        })

    handleTarget = (target: string) => () =>
        this.props.history.push(target)


    handleDelete = () => {
        const { news, position } = this.state
        let username = getVerifiedUsername()
        if (username) deleteNews(username, news[position].timestamp)
                        .then(_ => this.componentDidMount())
                        .then(_ => this.makeNewNews())
        else this.handleTarget("/login")
    }

    
    render() {
        const { classes, history } = this.props
        const { news, categories, position } = this.state
        const { header, content, peek, image, category } = this.state.selected

        const username = getVerifiedUsername()

        return (
            <div className={ classes.root }>
                <Navigation history={ history }/>
                <LiveFeed history={ history }/>
                <Drawer
                    variant="permanent"
                >
                    <div className={ classes.toolbar } />
                    <div className={ classes.toolbar } />
                    <List>
                        <ListItem button onClick={ this.makeNewNews }>
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText>Create new</ListItemText>
                        </ListItem>
                        {
                            news.map((item, index) => (
                                <Card className={ classes.card } key={index} onClick={ this.handleNewsChange(index, item) }>
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

                <form className={ classes.formRoot } onSubmit={ this.handleSubmit }>
                    <Paper className={ classes.form }>
                            <FormControl required>
                                <InputLabel>Category</InputLabel>
                                <Select 
                                    id="category"
                                    name="category"
                                    value={ category }
                                    onChange={ this.handleChange }
                                >
                                    {
                                        categories.map((item, index) => (
                                            <MenuItem key={item} value={ item }>
                                                { item }
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            
                            <TextField 
                                required
                                id="image"
                                name="image"
                                label="Image url"
                                value={ image }
                                onChange={ this.handleChange }
                            />
                            <TextField 
                                required
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
                                required
                                id="content"
                                name="content"
                                label="Content"
                                value={ content }
                                onChange={ this.handleChange }
                            />
                            
                    </Paper>
                    <Paper className={ classes.submit }>
                        <Button className={ classes.green } type="submit" variant="contained">Submit</Button>
                    </Paper>
                </form>
                
                    { position == -1 ?
                        <Paper className={ classNames(classes.formRoot, classes.submit) }>
                            <Button variant="contained" onClick={ this.makeNewNews }>Clear</Button>
                        </Paper>
                        :
                        <React.Fragment>
                            <Paper  className={ classNames(classes.formRoot, classes.submit) }>
                                <Button variant="contained" 
                                onClick={ this.handleTarget(username ? `/news/${username}/${news[position].timestamp}` : '/login') }
                                >
                                    Goto public view
                                </Button>
                            </Paper>
                            <Paper className={ classNames(classes.formRoot, classes.submit) }>
                                <Button variant="contained" onClick={ this.handleDelete } className={ classes.red }>Delete</Button>
                            </Paper>
                        </React.Fragment>
                    }

            </div>
            
        )
    }
}


export default withStyles(styles)(AddNews)