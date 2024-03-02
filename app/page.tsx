"use client";

import { useState } from "react";
import SideBar from "./components/SideBar";
import Timer from "./components/Timer";

export default function Home() {
    // Array.from({ length: 5 }).map((_, i, a) => `10.${a.length - i}`)
    const [sessionTimes, setSessionTimes] = useState<string[]>([]);

    const onTimerStop = (time: string) => {
        setSessionTimes(prevTimes => {
            return [time, ...prevTimes];
        });
    };
    return (
        <>
            <SideBar time={sessionTimes} />
            <Timer onTimerStop={onTimerStop} sessionTimes={sessionTimes} />
        </>
    );
}
