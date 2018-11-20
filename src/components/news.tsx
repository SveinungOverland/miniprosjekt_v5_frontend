import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import { History } from 'history'

// UI imports
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import Account from '@material-ui/icons/AccountCircle'


// Type imports
import News from '../types/news'


const styles = createStyles({
    card: {
        cursor: 'pointer'
    },
    media: {
        width: '100%',
        maxHeight: '60vh',
        objectFit: 'contain',

        "@media only screen and (min-width: 600px)": {
            maxHeight: 'auto'
        }
    },
    actions: {
        display: 'flex',
    },
})

interface Props extends News { 
    editable: boolean,
    classes: { [name: string]: string },
    history: History | undefined
}

export default withStyles(styles)((props: Props) => {

    const { classes, history, poster, timestamp } = props

    console.log(typeof props.timestamp)

    const handleOnClick = (event: React.MouseEvent) => {
        history ? history.push(`/news/${poster}/${timestamp}`) : undefined
    }

    return (
        <Card className={history ? classes.card : undefined} onClick={ history ? handleOnClick : undefined }>
            <CardHeader
                avatar={
                    <Account className={ classes.avatar }/>
                }
                title={ props.poster }
                subheader={ new Date(props.timestamp).toDateString() }
            />
            <img className={ classes.media } src={ props.image }/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    { props.header }
                </Typography>
                { props.peek ?
                    <Typography component="p">
                        { props.peek }
                    </Typography>
                    :
                    null
                }
            </CardContent>
        </Card>
    )
})