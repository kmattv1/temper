import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import './../style/Login.css';

class Login extends React.Component {
    state = {
        isSignedIn: false // Local signed-in state.
    };

    // Configure FirebaseUI.
    uiConfig = {
        // popup or redirect flow.
        signInFlow: 'redirect',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // Display Google and Mail as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ]
    };

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                this.setState({isSignedIn: !!user});
                this.props.handler(this.state.isSignedIn);
            }
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
                <div>
                    <h1>Temper</h1>
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
            );
        }
        return (
            <div className="Login">
                <ul>
                    <li>Welcome {firebase.auth().currentUser.displayName}!</li>
                    <li className="center">Temper</li>
                    <li className="right"><button onClick={() => {
                        firebase.auth().signOut();
                    }}>Sign-out</button></li>
                </ul>
            </div>
        );
    }
}

export default Login;
