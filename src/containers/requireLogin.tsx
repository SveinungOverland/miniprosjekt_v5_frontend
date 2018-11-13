import React, { Component } from 'react';
import { Redirect } from 'react-router'

// Project imports
import { getVerifiedUsername } from '../services/user'

class AutoRedirect extends Component {
    render() {
        return (
            <Redirect to="/login" />
        )
    }
}



export default function requireLogin(component: React.ComponentType): React.ComponentType {
    let username: String | null = getVerifiedUsername()
    if (username) {
        return component
    } else {
        return AutoRedirect
    }
}