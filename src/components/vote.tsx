import React, { Component } from 'react'

import { createStyles, withStyles } from '@material-ui/core/styles'

import StarRatingComponent from 'react-star-rating-component'
import Button from '@material-ui/core/Button'

// Type imports
import News from '../types/news'


const styles = createStyles({
    root: {
        fontSize: 30,
        display: 'grid',
        gridTemplateColumns: 'auto'
    },
})


interface Props extends News {
    classes: { [name: string]: string }
}

interface State {
    rating: number
}

class Vote extends Component<Props> {

    state: State = {
        rating: 0
    }

    handleStarClick = (nextValue: number, prevValue: number, name: string) => {
        this.setState({ rating: Math.round(nextValue) })
    }

    render() {
        const { classes } = this.props
        const { rating } = this.state
        return (
            <div className={ classes.root }>
                <div style={{ margin: '0 auto' }}>
                    <StarRatingComponent 
                        name="Rate"
                        value={ rating }
                        starCount={ 6 }
                        onStarClick={ this.handleStarClick }
                    />
                </div>
                <Button>
                    Vote
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(Vote)