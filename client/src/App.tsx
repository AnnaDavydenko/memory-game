import React, {FC} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header, Footer} from "./components";
import { Menu, Rules, Settings, Score, GamePage, ChooseCardsThemes } from "./containers";
// @ts-ignore
import fonSound from './assets/sounds/fon.mp3';
// @ts-ignore
import buttonSound from './assets/sounds/buttonSound.mp3';
// @ts-ignore
import zvuk from './assets/sounds/zvuk.mp3';
import {config} from './config';

const App: FC = () => {
    return (
        <>
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
                    <audio id="music" src={fonSound}/>
                    <audio id="buttonSound" src={buttonSound}/>
                    <audio id="zvuk" src={zvuk}/>
                </div>
            </Router>
            )
        </>
    );
};

export default App;
