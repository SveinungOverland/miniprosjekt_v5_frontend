import React, { ReactNode, Component } from 'react'
import { isMobile } from 'is-mobile'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'

// UI imports
import Slide from '@material-ui/core/Slide'

// Event listener imports
import EventListener from 'react-event-listener'

// Type imports
import News from '../types/news'

// API imports
import { getVerifiedUsername } from '../api/user'
import { NewsEnum } from '../api/news'
import { NewsResponse } from '../api/responseInterfaces';

// Project imports
import NewsGridComponent from '../components/news_grid'
import NewsComponent from '../components/news'
import AddFab from '../components/add_button'
import Navigation from '../components/navigation'

const styles = ({ spacing }: Theme) => createStyles({
    root: {
        margin: '0 auto',
        maxWidth: 1200,
        paddingTop: 48,
    },
})

enum ScrollDir {
    UP,
    DOWN
}

interface Props {
    classes: { [name: string]: string },
    children: ReactNode
}

interface State {
    news: News[],
    showFab: boolean,
    scrollState: {
        lastPosition: number
    }
}


class Dashboard extends Component<Props> {


    state: State = {
        news: [],
        showFab: true,

        scrollState: {
            lastPosition: 0
        }
    }
    

    componentDidMount() {
        /*getNews(NewsEnum.all_time)
            .then((res: NewsResponse) => this.overwriteNews(res.data))
        */
    }



    handleScroll = (event: Event) => {
        let newScrollY: number = window.scrollY
        const { lastPosition } = this.state.scrollState
        let newDir: ScrollDir = (newScrollY > lastPosition && newScrollY > 40) ? ScrollDir.DOWN : ScrollDir.UP

        this.setState({
            ...this.state,
            scrollState: {
                lastPosition: newScrollY
            },
            showFab: (newDir === ScrollDir.DOWN) ? false : true
        })
    }

    overwriteNews = (news: News[]) => this.setState({news: news})

    handleAdd = (event: React.MouseEvent<HTMLElement>) => {
        console.log("ADDING ASIFIAUDSGBdblihj")
    }


    render() {
        const username = getVerifiedUsername()
        const { classes } = this.props;
        const { news, showFab } = this.state;
        return (
            <div className={ classes.root }>
                <EventListener
                    target="window"
                    onScroll={ isMobile() ? this.handleScroll : undefined }>

                    <Slide direction="down" in={ showFab }>
                        <Navigation />
                    </Slide>

                    <NewsGridComponent>
                        { news.map((item: News, index: number) => (
                            <NewsComponent key={ item.poster +"+"+ item.timestamp+"+"+index } { ...item } />
                        ))}
                    </NewsGridComponent>
                    { username ?
                        <Slide direction="up" in={ showFab }>
                            <AddFab onClick={ this.handleAdd } />
                        </Slide>
                        :
                        null
                    }
                    
                    
                </EventListener>
            </div>
        )
    }
}



export default withStyles(styles)(Dashboard)