import React from 'react'

// Router imports
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Material-ui/styles imports
import { MuiThemeProvider } from '@material-ui/core/styles'


// Project imports
import theme from './theme'
import Navigation from './containers/navigation'
import Dashboard from './containers/dashboard'


const App = () => (

    <MuiThemeProvider theme={theme}>
        <Navigation>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ Dashboard } />
                </Switch>
            </BrowserRouter>
        </Navigation>
    </MuiThemeProvider>
    
)

export default App
