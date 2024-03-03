"use client";

import { createContext, useState, useContext } from "react";

interface SessionProviderProps {
    children?: React.ReactNode;
}

interface SessionContextType {
    sessionTimes: string[];
    updateSessionTimes: (times: string) => void;
}

export const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
    const sessionTimes = useContext(SessionContext);
    return sessionTimes;
};

export const SessionProvider = (props: SessionProviderProps) => {
    const [sessionTimes, setSessionTimes] = useState<string[]>([]);

    const updateSessionTimes = (time: string) => {
        setSessionTimes(prevTimes => {
            return [time, ...prevTimes];
        });
    };
    return (
        <SessionContext.Provider value={{ sessionTimes, updateSessionTimes }}>
            {props.children}
        </SessionContext.Provider>
    );
};
