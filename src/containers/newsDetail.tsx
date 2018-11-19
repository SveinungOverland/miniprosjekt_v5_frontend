import React, { Component } from 'react'

import { createStyles, withStyles } from '@material-ui/core/styles'

import { History } from 'history'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

// Project imports
import Navigation from '../components/navigation'
import News from '../components/news'
import Vote from '../components/vote'
import Comments from '../components/comments'
import LiveFeed from '../components/live_feed'

// Type imports
import NewsType from '../types/news'

// API imports
import { getSpecificNews } from '../services/news'
import { NewsResponse } from '../services/responseInterfaces'


const styles = createStyles({
    root: {
        margin: '0 auto',
        maxWidth: 1200,
        paddingTop: 100,
        display: 'flex',
        justifyContent: 'center',
    },

    newsView: {
        "& > :nth-child(n + 1)": {
            marginTop: 20
        }
    },

    content: {
        width: 'inherit'
    }
})


interface Props {
    classes: { [name: string]: string },
    match: {
        params: {
            username: string,
            timestamp: string
        }
    }
    history: History
}

interface State {
    news: NewsType | null
}

class NewsDetail extends Component<Props> {

    state: State = {
        news: null
    }

    componentDidMount() {
        const { username, timestamp } = this.props.match.params
        getSpecificNews(username, timestamp)
            .then((res: NewsResponse) => {
                console.log(res)
                this.setState({news: res.data[0]})
                window.scrollTo(0,0)
            })
    }


    render() {
        console.log(this.props)

        const { username, timestamp } = this.props.match.params
        const { classes, history } = this.props
        const { news } = this.state
        
        if (news) {
            if (username != news.poster || timestamp != news.timestamp) this.componentDidMount()
        }

        return (
            <div className={ classes.root } key={`${username}${timestamp}`}>
                <Navigation />
                <LiveFeed history={ history }/>
                { news ?
                    <div className={ classes.newsView }>
                        <News editable={false} history={undefined} {...news}/>
                        <Card className={ classes.content }>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    { news.content }
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Vote {...news}/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Comments {...news}/>
                            </CardContent>
                        </Card>
                    </div>
                    :

                    <div className={ classes.loading }>
                        <CircularProgress />
                    </div>
                }
                
            </div>
        )
    }

}


export default withStyles(styles)(NewsDetail)