"use client";

import SessionSelector from "./SessionSelector";
import NewSession from "./NewSession";
import { useState } from "react";

const Session = () => {
    const [sessions, setSessions] = useState([
        { sessionName: "Session 1" },
        { sessionName: "Session 2" },
        { sessionName: "Session 3" },
        { sessionName: "Session 4" }
    ]);
    const onAddSession = (newSessionName: string) => {
        setSessions(prevSession => {
            return [...prevSession, { sessionName: newSessionName }];
        });
    };
    return (
        <>
            <SessionSelector sessions={sessions} />
            <NewSession onAddSession={onAddSession} />
        </>
    );
};

export default Session;
