import React, {FC} from "react";
import Grid from '@material-ui/core/Grid';
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";

const Menu:FC = () => {

    return (
        <main>
            <Modal title='Welcome'>
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center">
                        <LinkButton
                            to={"/chooseCards"} text={"New Game"}>
                        </LinkButton>
                        <LinkButton
                            to={"/score"} text={"High Score"}>
                        </LinkButton>
                        <LinkButton
                            to={"/gameRules"} text={"Rules"}>
                        </LinkButton>
                        <LinkButton
                            to={"/settings"} text={"Settings"}>
                        </LinkButton>
                    </Grid>
            </Modal>
        </main>
    );
};
export default Menu;

