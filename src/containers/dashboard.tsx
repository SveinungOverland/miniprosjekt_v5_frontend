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
import { getFromName } from '../services/category'
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

    match: {
        params: {
            name: string | undefined
        }
    }
}

interface State {
    news: News[],

    propsRef: Props
}


class Dashboard extends Component<Props> {


    state: State = {
        news: [],

        propsRef: this.props
    }
    

    componentDidMount() {
        const { name } = this.props.match.params

        if (name != undefined) {
            const { name } = this.props.match.params
            getFromName(name as string)
            .then((res: NewsResponse) => {
                this.overwriteNews(res.data)
            })
        } else {
            getNews()
            .then((res: NewsResponse) => {
                this.overwriteNews(res.data)
            })
        }
    }

    shouldComponentUpdate(nextProps: Readonly<Props>) {
        if (nextProps.match.params.name != this.state.propsRef.match.params.name) {
            this.setState({ propsRef: nextProps })
            this.componentDidMount()
        }
        return true
    }



    overwriteNews = (news: News[]) => this.setState({ news: news })

    handleAdd = (event: React.MouseEvent<HTMLElement>) => {
        console.log("ADDING ASIFIAUDSGBdblihj")
    }

    render() {
        const { classes, history } = this.props;
        const { news } = this.state;

        return (
            <div className={ classes.root }>

                    <Navigation history={ history }/>

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