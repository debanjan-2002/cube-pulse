"use client";

import SessionSelector from "./SessionSelector";
import NewSession from "./NewSession";
import { useTimer } from "../hooks/useTimer";
import { useSession } from "../contexts/SessionContext";

const Session = () => {
    const {
        getSessionNames,
        getSessionId,
        getCurrentSessionId,
        getSessionName
    } = useTimer();

    const session = useSession();

    const sessionNames = getSessionNames();
    const currentSessionId = getCurrentSessionId();
    const currentSessionName = getSessionName(currentSessionId);

    const onAddSession = (newSessionName: string) => {
        session?.addNewSession(newSessionName);
    };
    return (
        <>
            <SessionSelector
                sessionNames={sessionNames}
                getSessionId={getSessionId}
                currentSessionName={currentSessionName}
            />
            <NewSession onAddSession={onAddSession} />
        </>
    );
};

export default Session;
