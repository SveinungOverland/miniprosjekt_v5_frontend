import React, { ReactNode, Component } from 'react'
import { isMobile } from 'is-mobile'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'

import { History } from 'history'

// UI imports
import Slide from '@material-ui/core/Slide'

// Event listener imports
import EventListener from 'react-event-listener'

// Type imports
import News from '../types/news'

// API imports
import { getVerifiedUsername } from '../services/user'
import { NewsEnum, getNews } from '../services/news'
import { NewsResponse } from '../services/responseInterfaces'

import { Redirect } from 'react-router'

// Project imports
import NewsGridComponent from '../components/news_grid'
import NewsComponent from '../components/news'
import AddFab from '../components/add_button'
import Navigation from '../components/navigation'
import LiveFeed from '../components/live_feed'

const styles = ({ spacing }: Theme) => createStyles({
    root: {
        margin: '0 auto',
        maxWidth: 1200,
        paddingTop: 100,
    },
})

enum ScrollDir {
    UP,
    DOWN
}

interface Props {
    classes: { [name: string]: string },
    children: ReactNode,
    history: History
}

interface State {
    news: News[],
}


class Dashboard extends Component<Props> {


    state: State = {
        news: [],
    }
    

    componentDidMount() {
        getNews() // getNews(NewsEnum.all_time)
            .then((res: NewsResponse) => {
                console.log(res)
                this.overwriteNews(res.data)
            })
        
    }



    overwriteNews = (news: News[]) => this.setState({news: news})

    handleAdd = (event: React.MouseEvent<HTMLElement>) => {
        console.log("ADDING ASIFIAUDSGBdblihj")
    }

    render() {
        const { classes, history } = this.props;
        const { news } = this.state;

        return (
            <div className={ classes.root }>

                    <Navigation />

                    <LiveFeed history={ history }/>

                    <NewsGridComponent>
                        { news.map((item: News, index: number) => (
                            <NewsComponent 
                                key={ item.poster +"+"+ item.timestamp+"+"+index }
                                history={ history }
                                editable={false} 
                                { ...item } />
                        ))}
                    </NewsGridComponent>
                    
                    <AddFab onClick={ this.handleAdd } />
            </div>
        )
    }
}



export default withStyles(styles)(Dashboard)