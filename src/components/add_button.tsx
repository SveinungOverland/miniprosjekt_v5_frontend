import React from 'react'


// UI imports
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'


interface Props {
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export default (props: Props) => (
    <Button className={props.className} variant="fab" onClick={props.onClick} color="secondary">
        <Add />
    </Button>
)