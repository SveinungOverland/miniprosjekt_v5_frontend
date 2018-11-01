import React from 'react'

// Router imports
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Material-ui/styles imports
import { MuiThemeProvider } from '@material-ui/core/styles'


// Project imports
import theme from './theme'
import WindowWrapper from './containers/window_wrapper'
import Dashboard from './containers/dashboard'


const App = () => (

    <MuiThemeProvider theme={theme}>
        <WindowWrapper>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ Dashboard } />
                </Switch>
            </BrowserRouter>
        </WindowWrapper>
    </MuiThemeProvider>
    
)

export default App
