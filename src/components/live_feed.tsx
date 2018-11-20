import React, { Component } from 'react'

import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import { History } from 'history'

import io from 'socket.io-client'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'


// Type imports
import News from '../types/news'
import { NewsResponse } from '../services/responseInterfaces';

const styles = ({ zIndex }: Theme) => createStyles({
    root: {
        position: "fixed",
        height: 50,
        top: 48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: zIndex.drawer + 1
    },

    item: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        overflow: 'hidden',
        maxWidth: '50%',
        margin: '0 5px',
        cursor: 'pointer'
    }
})


interface Props {
    classes: { [name: string]: string },
    history: History
}

interface State {
    socket: SocketIOClient.Socket,
    news: News[]
}

class LiveFeed extends Component<Props> {

    state: State = {
        // "https://miniprosjekt-api.herokuapp.com"
        socket: io("http://localhost:3000"),
        news: []
    }

    componentDidMount() {
        const { socket } = this.state
        socket.on('news', this.handleSocketEvent)
    }

    handleSocketEvent = (data: News) => {
        this.setState({ news: [data, ...this.state.news.splice(0, 4)] })
    }

    componentWillUnmount() {
        this.state.socket.disconnect()
    }

    handleOnClick = (poster: string, timestamp: string) => 
        (event: React.MouseEvent) => {
            console.log("Hello")
            this.props.history.push(`/news/${poster}/${timestamp}`)
        }

    render() {
        const { classes } = this.props
        const { news } = this.state
        return (
            <AppBar className={ classes.root }>
                {
                    news.map((item, index) => (
                        <div 
                            key={ index } 
                            className={ classes.item } 
                            onClick={ this.handleOnClick(item.poster, item.timestamp) }>
                            <Typography color="inherit" variant="h6" noWrap>
                                { item.header }
                            </Typography>
                            <Typography color="inherit" noWrap>
                                { (new Date(item.timestamp)).toLocaleString() }
                            </Typography>
                        </div>
                    ))
                }
            </AppBar>
        )
    }
}


export default withStyles(styles)(LiveFeed)