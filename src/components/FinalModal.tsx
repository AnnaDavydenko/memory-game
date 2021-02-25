import React from "react";
import { GiBackstab, GiSandsOfTime, GiCardJoker, GiTrophy } from "react-icons/gi";
import LinkButton from "../components/LinkButton";

const BootstrapModal = () => {
    return (
        <div>
            {/*<div className="rodal__title">*/}
            {/*    Game Over*/}
            {/*</div>*/}
            {/*<div className="rodal__content">*/}
            {/*    <div>{(props.victory) ? (<> <GiTrophy /> YOU WIN!! </>) : (<> <GiBackstab /> YOU LOSE!! </>)} </div>*/}
            {/*    <div><GiSandsOfTime /> Time Taken: {100 - props.time} sec</div>*/}
            {/*    <div><GiCardJoker /> Cards Flipped: {props.flips}</div>*/}
            {/*</div>*/}
            {/*<div className="rodal__btn-container">*/}
            {/*    <LinkButton marginTop="1rem" onClick={() => history.push('/theme')} >Back</LinkButton>*/}
            {/*    <LinkButton onClick={() => props.onPlayAgain()} >Play again</LinkButton>*/}
            {/*</div>*/}
        </div>
    );
};

export default BootstrapModal;
