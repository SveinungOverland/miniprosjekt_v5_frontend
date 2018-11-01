import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'

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
        maxWidth: 400,
    },
    media: {
        width: '100%',
        objectFit: 'contain',
        maxHeight: '100vh'
    },
    actions: {
        display: 'flex',
    },
})

interface Props extends News { 
    classes: { [name: string]: string }
}


export default withStyles(styles)((props: Props) => {
    const { classes } = props
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Account className={ classes.avatar }/>
                }
                title={ props.poster }
                subheader={ props.timestamp.toDateString() }
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