import React, { ReactNode, Component } from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'


// Type imports
import News from '../types/news'

// API imports
import { getNews, NewsEnum } from '../api/news'
import { NewsResponse } from '../api/responseInterfaces';

// Project imports
import NewsComponent from '../components/news'


const styles = createStyles({
    root: {
        margin: '0 auto',
        maxWidth: 1200,
        padding: '0px 10px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridAutoRows: 'auto',
        gridGap: '20px'
    }
})

interface Props {
    classes: { [name: string]: string },
    children: ReactNode
}

interface State {
    news: News[]
}


class Dashboard extends Component<Props> {


    componentDidMount() {
        getNews(NewsEnum.all_time)
            .then((res: NewsResponse) => this.overwriteNews(res.data))
    }





    overwriteNews = (news: News[]) => this.setState({news: news})



    state: State = {
        news: []
    }

    render() {
        const { classes } = this.props;
        const { news } = this.state;
        return (
            <div className={ classes.root }>
                { news.map((item: News) => (
                    <NewsComponent {...item} />
                ))}
            </div>
        )
    }
}



export default withStyles(styles)(Dashboard)