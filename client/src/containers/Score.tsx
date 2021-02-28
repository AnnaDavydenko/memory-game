import React, {useEffect} from "react";
import {config} from "../config";

const Score = () => {

    useEffect(() => {
        fetch(`${config.api}/api/scores`, )
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log((res as any)?.data);
            });
    }, []);

    return (
        <main>

        </main>
    );
};

export default Score;
