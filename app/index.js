import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main'
import {Provider} from 'react-redux'
import {store} from './redux/store'
class App extends React.Component{
    render(){
        return(
            <Main/>
        )
    }
}

ReactDOM.render( <Provider store={store}> <App /></Provider>, document.getElementById('app'))
