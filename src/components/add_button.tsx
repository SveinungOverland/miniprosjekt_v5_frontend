import React from 'react'


// UI imports
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import { withStyles, createStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';


const styles = ({ spacing }: Theme) => createStyles({
    fab: {
        position: 'fixed',
        bottom: spacing.unit * 2,
        right: spacing.unit * 2,
    }
})


interface Props {
    classes: { [name: string]: string },
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export default withStyles(styles)((props: Props) => (
    <Link to="/add" style={{ textDecoration: 'none' }}>
        <Button className={props.classes.fab} variant="fab" onClick={props.onClick} color="secondary">
            <Add />
        </Button>
    </Link>
))