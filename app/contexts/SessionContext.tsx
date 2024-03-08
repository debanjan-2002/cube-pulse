"use client";

import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { v4 as uuid4 } from "uuid";
import { generateRandomScramble } from "../utils/scrambler";

interface SessionProviderProps {
    children?: React.ReactNode;
}

interface SessionContextType {
    data: LocalStorageType[];
    sessionIdToName: Map<string, string>;
    sessionNameToId: Map<string, string>;
    scramble: string;
    updateScramble: () => void;
    addTimeToCurrentSession: (sessionId: string, time: string) => void;
    addNewSession: (sessionName: string) => void;
}

interface LocalStorageType {
    sessionId: string;
    sessionTimes: { time: string; id: string }[];
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
    const [scramble, setScramble] = useState(generateRandomScramble());

    const addTimeToCurrentSession = (sessionId: string, time: string) => {
        setLocalData(prevState => {
            const newState = prevState.map(state => {
                if (state.sessionId !== sessionId) return state;
                return {
                    sessionId: state.sessionId,
                    sessionTimes: [{ time, id: uuid4() }, ...state.sessionTimes]
                };
            });
            localStorage.setItem("sessionData", JSON.stringify(newState));
            return newState;
        });
    };

    const addNewSession = (sessionName: string) => {
        if (sessionName.trim() === "") {
            toast.error("Please provide a session name!");
            return;
        }
        if (sessionNameToId.has(sessionName)) {
            toast.error(`${sessionName} already exists!`);
            return;
        }

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
        toast.success("Session added successfully!");
    };

    const updateScramble = () => {
        setScramble(generateRandomScramble());
    };

    return (
        <SessionContext.Provider
            value={{
                data: localData,
                sessionIdToName,
                sessionNameToId,
                scramble,
                updateScramble,
                addTimeToCurrentSession,
                addNewSession
            }}
        >
            {props.children}
        </SessionContext.Provider>
    );
};
