import React, {Component} from 'react';
import logo from './logo.svg';
import './style/App.css';
import Login from './components/Login';
import firebase from 'firebase';
import '@firebase/firestore';
import {FirestoreProvider} from 'react-firestore';
import Display from "./components/Display";
import FirebaseConfig from "./firebaseConfig";

// Configure Firebase.
const config = new FirebaseConfig().getConfig();

firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
    }

    state = {
        isSignedIn: false // Local signed-in state.
    };

    handler(state) {
        this.setState({
            isSignedIn: state
        })
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
                <div className="App">
                    <FirestoreProvider firebase={firebase}>
                        <Login className="Login" handler={this.handler}/>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </FirestoreProvider>
                </div>)
        } else {
            return (
                <div className="App">
                    <FirestoreProvider firebase={firebase}>
                        <Login className="Login" handler={this.handler} firebase={firebase}/>
                        <Display/>
                    </FirestoreProvider>
                </div>)
        }

    }
}

export default App;
