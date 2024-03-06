"use client";

import { createContext, useState, useContext } from "react";
import { v4 as uuid4 } from "uuid";

interface SessionProviderProps {
    children?: React.ReactNode;
}

interface SessionContextType {
    data: LocalStorageType[];
    sessionIdToName: Map<string, string>;
    sessionNameToId: Map<string, string>;
    addTimeToCurrentSession: (sessionId: string, time: string) => void;
    addNewSession: (sessionName: string) => void;
}

interface LocalStorageType {
    sessionId: string;
    sessionTimes: string[];
}

export const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
    const data = useContext(SessionContext);
    return data;
};

export const SessionProvider = (props: SessionProviderProps) => {
    if (localStorage.getItem("sessionData") === null) {
        const id = uuid4();
        const defaultSessionName = "Session 1";

        const defaultData = [{ sessionId: id, sessionTimes: [] }];
        const defaultIdToName = new Map([[id, defaultSessionName]]);
        const defaultNameToId = new Map([[defaultSessionName, id]]);
        console.log(defaultIdToName);

        localStorage.setItem("sessionData", JSON.stringify(defaultData));
        localStorage.setItem(
            "sessionIdToName",
            JSON.stringify(Array.from(defaultIdToName.entries()))
        );
        localStorage.setItem(
            "sessionNameToId",
            JSON.stringify(Array.from(defaultNameToId.entries()))
        );
    }
    const sessionData: LocalStorageType[] = JSON.parse(
        localStorage.getItem("sessionData")!
    );
    const idToName: Map<string, string> = new Map(
        JSON.parse(localStorage.getItem("sessionIdToName")!)
    );
    const nameToId: Map<string, string> = new Map(
        JSON.parse(localStorage.getItem("sessionNameToId")!)
    );

    const [localData, setLocalData] = useState<LocalStorageType[]>(sessionData);
    const [sessionIdToName, setSessionIdToName] =
        useState<Map<string, string>>(idToName);
    const [sessionNameToId, setSessionNameToId] =
        useState<Map<string, string>>(nameToId);

    const addTimeToCurrentSession = (sessionId: string, time: string) => {
        setLocalData(prevState => {
            const newState = prevState.map(state => {
                if (state.sessionId !== sessionId) return state;
                return {
                    sessionId: state.sessionId,
                    sessionTimes: [time, ...state.sessionTimes]
                };
            });
            localStorage.setItem("sessionData", JSON.stringify(newState));
            return newState;
        });
    };

    const addNewSession = (sessionName: string) => {
        const id = uuid4();

        setLocalData(prevState => {
            const newState = [
                ...prevState,
                { sessionId: id, sessionTimes: [] }
            ];
            localStorage.setItem("sessionData", JSON.stringify(newState));
            return newState;
        });

        setSessionIdToName(prevState => {
            const newState = prevState;
            newState.set(id, sessionName);
            localStorage.setItem(
                "sessionIdToName",
                JSON.stringify(Array.from(newState.entries()))
            );

            return newState;
        });

        setSessionNameToId(prevState => {
            const newState = prevState;
            newState.set(sessionName, id);
            localStorage.setItem(
                "sessionNameToId",
                JSON.stringify(Array.from(newState.entries()))
            );
            return newState;
        });
    };

    return (
        <SessionContext.Provider
            value={{
                data: localData,
                sessionIdToName,
                sessionNameToId,
                addTimeToCurrentSession,
                addNewSession
            }}
        >
            {props.children}
        </SessionContext.Provider>
    );
};
