import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { handleUserProfile } from "./firebase/utils";
import { onSnapshot } from "firebase/firestore";

// layouts
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";

// pages
import Homepage from './pages/Homepage'
import Registration from "./pages/Registration";
import Login from './pages/Login';
import './default.scss';

const auth = getAuth();

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        onSnapshot(userRef, (snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }


  componentWillUnmount() {
    if (this.authListener) {
      this.authListener();
    }
  }

  render() {

    const { currentUser } = this.state;

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={
            <HomePageLayout currentUser={currentUser}>
              <Homepage />
            </HomePageLayout>
          } />
          <Route
            path="/registration"
            element={currentUser ?
              <Navigate to="/" /> :
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            }
          />
          <Route path="/login"
            element={currentUser ? <Navigate to="/" replace /> :
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            }
          />
        </Routes>
      </div>
    );
  }

}

export default App;
