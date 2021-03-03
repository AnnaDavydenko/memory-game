import React, {FC} from "react";
import Grid from '@material-ui/core/Grid';
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";

const Menu:FC = () => {
    return (
            <Modal title='Welcome'>
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center">
                    <LinkButton to={"/chooseCards"} text={"New Game"}/>
                    <LinkButton to={"/score"} text={"High Score"}/>
                    <LinkButton to={"/gameRules"} text={"Rules"}/>
                    <LinkButton to={"/settings"} text={"Settings"}/>
                </Grid>
            </Modal>
    );
};
export default Menu;
