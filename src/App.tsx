import React, {FC, useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import {Header, Footer, Loader} from "./components";
import {IState} from "./common/types";
import {Dispatch} from "redux";
import { Menu, Rules, Settings, Score, GamePage, ChooseCardsThemes } from "./containers";
import imageArray from "./utils/preloadImages";

const App = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        preloadImage();
    }, []);

    const preloadImage = () => {
        setLoading(true);
        const images = imageArray();
        let length = images.length;
        images.forEach((picture) => {
            const img = new Image();
            img.src = picture;
            img.onload = () => {
                --length;
                if (length <= 0) {
                    setLoading(false);
                }
            };
        });
    };

    return (
        <>
            <Router>
            <div>
                <Header/>
                {(loading) ? (<Loader/>) : (
                    <Switch>
                        <Route path='/' exact component={Menu}/>
                        <Route path='/chooseCards' component={ChooseCardsThemes}/>
                        <Route path='/gameRules' component={Rules}/>
                        <Route path='/score' component={Score}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/game' component={GamePage}/>
                    </Switch>
                )}
                <Footer/>
            </div>
        </Router>
        </>
    );
};

export default App;

// const mapStateToProps = (state: IState) => ({
//     errorMessage: state.toast.message,
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     onResetToast: () => dispatch(resetToastMessage()),
// });

// export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
