"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface TimerProps {
    onTimerStop: (time: string) => void;
    sessionTimes: string[];
}

const Timer = ({ onTimerStop, sessionTimes }: TimerProps) => {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [miliseconds, setMiliseconds] = useState(0);
    // TODO: Have to figure out the type
    const milisecondsRef = useRef<any>(null);
    console.log(sessionTimes);

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
            const time = `${seconds}.${miliseconds.toString().slice(0, 2)}`;
            onTimerStop(time);
            setMiliseconds(0);
            setSeconds(0);
        } else {
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

    const getAvgOfFive = () => {
        if (sessionTimes.length < 5) return "--";
        const lastFiveTimes = [];
        for (let i = 0; i < 5; i++) {
            lastFiveTimes.push(sessionTimes[i]);
        }
        lastFiveTimes.sort();
        let sum = 0;
        for (let i = 1; i < 4; i++) {
            sum += parseFloat(lastFiveTimes[i]);
        }
        const avg = sum / 3;
        return avg.toFixed(2).toString();
    };
    return (
        <div className="p-4 flex-1 flex justify-center items-center bg-late-100 flex-col gap-5">
            <div className="text-[12rem]">
                {seconds}.{miliseconds.toString().slice(0, 2)}
            </div>
            <div className="flex flex-col gap-3">
                <Badge
                    className="text-4xl min-w-28 flex justify-center p-2 px-4"
                    variant={"secondary"}
                >
                    ao5: {getAvgOfFive()}
                </Badge>
                <Badge
                    className="text-4xl min-w-28 flex justify-center p-2 px-4"
                    variant={"secondary"}
                >
                    ao12: --
                </Badge>
            </div>
        </div>
    );
};

export default Timer;
