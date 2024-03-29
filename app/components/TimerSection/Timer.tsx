"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useSession } from "../../contexts/SessionContext";
import { useTimer } from "../../hooks/useTimer";

const Timer = () => {
    const {
        getAverage,
        getCurrentSessionId,
        getLatestTimeInSession,
        getLatestTimeChange
    } = useTimer();

    const { latestSeconds, latestMiliseconds } = getLatestTimeInSession();
    const { difference, isBetter } = getLatestTimeChange();
    const sessionId = getCurrentSessionId();

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(latestSeconds);
    const [miliseconds, setMiliseconds] = useState(latestMiliseconds);

    const session = useSession();

    // TODO: Have to figure out the type
    const milisecondsRef = useRef<any>(null);

    if (miliseconds === 1000) {
        setMiliseconds(0);
        setSeconds(prev => prev + 1);
    }

    const keyDownHandler = (e: KeyboardEvent) => {
        if (e.repeat) return;
        if (e.code !== "Space") return;
        if (isTimerRunning) {
            clearInterval(milisecondsRef.current);
            setIsTimerRunning(false);

            session?.updateScramble();

            const time = `${seconds}.${miliseconds.toString().slice(0, 2)}`;
            session?.addTimeToCurrentSession(sessionId, time, session.scramble);
        } else {
            setSeconds(0);
            setMiliseconds(0);
            setIsTimerRunning(true);

            milisecondsRef.current = setInterval(() => {
                setMiliseconds(prev => prev + 10);
            }, 10);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    });

    return (
        <div className="p-4 flex-1 flex justify-center items-center bg-late-100 flex-col gap-5 bg-slate-900 w-full">
            <div className="text-[10rem] space-x-3">
                {isTimerRunning ? (
                    <span>
                        <span className="text-[13rem]">{seconds}</span>.
                        {miliseconds === 0
                            ? "00"
                            : miliseconds.toString().slice(0, 2)}
                    </span>
                ) : (
                    <span>
                        <span className="text-[13rem]">{latestSeconds}</span>.
                        {latestMiliseconds === 0
                            ? "00"
                            : latestMiliseconds.toString().slice(0, 2)}
                    </span>
                )}

                {!isTimerRunning && (
                    <span
                        className={`text-3xl ${
                            isBetter ? `text-green-500` : `text-red-500`
                        } `}
                    >
                        ({isBetter ? "-" : "+"}
                        {difference})
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-3">
                <Badge
                    className="text-4xl min-w-28 flex justify-center p-2 px-4 font-thin text-blue-600"
                    variant={"secondary"}
                >
                    ao5: {getAverage(5)}
                </Badge>
                <Badge
                    className="text-4xl min-w-28 flex justify-center p-2 px-4 font-thin text-blue-600"
                    variant={"secondary"}
                >
                    ao12: {getAverage(12)}
                </Badge>
            </div>
        </div>
    );
};

export default Timer;
