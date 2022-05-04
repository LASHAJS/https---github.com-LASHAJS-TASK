import React from "react";
import {Route,Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Home from "./components/Home";
import Add  from "./components/AddContact";
import Edit  from './components/EditContact';
import Navbar from "./components/Navbar";
import Auth from './components/Auth/login'
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";


const App = () => {

    const isAuth = localStorage.getItem("jwt")
    const isLoading = useSelector((state => state.authReducer.isLoading))
    if (isLoading){
        return <div>Loading...</div>
    }
        return (
            <div className="App">
                <ToastContainer/>
                <Navbar/>
                {!isAuth
                    ? <Switch>
                    <Route exact path="/Auth" component={() => <Auth/>}/>
                    <Redirect to="/Auth"/>
                    </Switch>
                    : <Switch>
                    <Route exact path="/" component={() => <Home/>}/>
                    <Route exact path="/add" component={() => <Add/>}/>
                    <Route exact path="/edit/:id" component={() => <Edit/>}/>
                    <Redirect to="/"/>
                    </Switch>
                }
            </div>
        );
};
export default App;