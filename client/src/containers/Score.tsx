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

    const handleClick = () => {
        fetch(`${config.api}/api/scores/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: "test", value: 66}),
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log((res as any)?.data);
            });
    }

    return (
        <main>
            <button onClick={handleClick}>{"click me"}</button>
        </main>
    );
};

export default Score;
