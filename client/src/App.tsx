import React, {FC, useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import {Header, Footer, Loader} from "./components";
import {IState} from "./common/types";
import {Dispatch} from "redux";
import { Menu, Rules, Settings, Score, GamePage, ChooseCardsThemes } from "./containers";
import imageArray from "./utils/preloadImages";
// @ts-ignore
import fonSound from './assets/sounds/fon.mp3';
// @ts-ignore
import buttonSound from './assets/sounds/buttonSound.mp3';
import {config} from './config';

const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log(config);
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
            {(loading) ? (<Loader/>) : (
                <Router>
                    <div>
                        <Header/>

                        <Switch>
                            <Route path='/' exact component={Menu}/>
                            <Route path='/chooseCards' component={ChooseCardsThemes}/>
                            <Route path='/gameRules' component={Rules}/>
                            <Route path='/score' component={Score}/>
                            <Route path='/settings' component={Settings}/>
                            <Route path='/game' component={GamePage}/>
                        </Switch>

                        <Footer/>
                        <audio id="music" src={fonSound} />
                        <audio id="buttonSound" src={buttonSound} />
                    </div>
                </Router>
            )}
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
