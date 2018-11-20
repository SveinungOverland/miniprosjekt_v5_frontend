import React from 'react'

// Router imports
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Material-ui/styles imports
import { MuiThemeProvider } from '@material-ui/core/styles'


// Project imports
import theme from './theme'
import WindowWrapper from './containers/window_wrapper'
import Dashboard from './containers/dashboard'
import Login from './containers/login'
import AddNews from './containers/addNews'
import NewsDetail from './containers/newsDetail'

const App = () => (

    <MuiThemeProvider theme={theme}>
        <WindowWrapper>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ Dashboard } />
                    <Route exact path="/category/:name" component={ Dashboard } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/add" component={ AddNews } />
                    <Route exact path="/news/:username/:timestamp" component={ NewsDetail } />
                </Switch>
            </BrowserRouter>
        </WindowWrapper>
    </MuiThemeProvider>
    
)

export default App
