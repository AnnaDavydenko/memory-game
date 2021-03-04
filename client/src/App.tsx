import React, {FC, useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header, Footer} from "./components";
import { Menu, Rules, Settings, Score, GamePage, ChooseCardsThemes } from "./containers";
// @ts-ignore
import fonSound from './assets/sounds/fon.mp3';
// @ts-ignore
import buttonSound from './assets/sounds/buttonSound.mp3';
// @ts-ignore
import zvuk from './assets/sounds/zvuk.mp3';
// @ts-ignore
import win from './assets/sounds/win.mp3';
import {ISettings, IState} from "./common/types";
import {Dispatch} from "redux";
import {updateSettingsThunk} from "./thunks/settings";
import {connect} from "react-redux";
import {Storage} from "./services/storage"

interface IRedux {
    settings: ISettings;
}

interface IDispatch {
    updateSettings: (settings: ISettings, updatedSettings: ISettings) => void;
}
type IProps = IRedux & IDispatch;

const AppContainer: FC<IProps> = (props: IProps) => {
    const {settings, updateSettings} = props;

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        e.preventDefault();
        let updatedSettings = {...settings};
        if (e.altKey && (e.key === "s" || e.key === "ы")) {
            updatedSettings.enableSounds = !updatedSettings.enableSounds;
        }
        if (e.altKey &&  (e.key === "m" || e.key === "ь")) {
            updatedSettings.enableMusic = !updatedSettings.enableMusic;
        }
        if (e.altKey &&  (e.key === "x" || e.key === "ч")) {
            updatedSettings.fullScreen = !updatedSettings.fullScreen;
        }
        if (e.altKey &&  (e.key === "d" || e.key === "в")) {
            const storage = new Storage();
            updatedSettings = storage.getDefaultData();
        }
        updateSettings(settings, updatedSettings);
    }, [settings, updateSettings]);

    const handleFullScreenOff = useCallback(()=>{
        const updatedSettings = {...settings};
        if (!document.fullscreenElement) {
            updatedSettings.fullScreen = false;
            updateSettings({...settings, fullScreen: false}, updatedSettings);
        }
    },[settings, updateSettings]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyPress);
        document.addEventListener('fullscreenchange', handleFullScreenOff);
        return () => {
            document.removeEventListener("keyup", handleKeyPress);
            document.removeEventListener("fullscreenchange", handleFullScreenOff);
        }
    }, [handleKeyPress, handleFullScreenOff]);

    return (
        <>
            <Router>
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
                    <audio id="win" src={win}/>
            </Router>
        </>
    );
};
const mapStateToProps = (state: IState) => ({
    settings: state.settings.settings,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateSettings: (settings: ISettings, updatedSettings: ISettings) => {
        // @ts-ignore
        dispatch(updateSettingsThunk(settings, updatedSettings));
    },
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
export default App;
