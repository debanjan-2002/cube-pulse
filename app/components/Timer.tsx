"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

const Timer = () => {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [miliseconds, setMiliseconds] = useState(0);
    // TODO: Have to figure out the type
    // const secondsRef = useRef<any>(null);
    const milisecondsRef = useRef<any>(null);

    if (miliseconds === 1000) {
        setMiliseconds(0);
        setSeconds(prev => prev + 1);
    }

    const keyDownHandler = (e: KeyboardEvent) => {
        if (e.code !== "Space") return;
        if (isTimerRunning) {
            clearInterval(milisecondsRef.current);
            // clearInterval(secondsRef.current);
            setIsTimerRunning(false);
            console.log(seconds);
            console.log(miliseconds);
            setMiliseconds(0);
            setSeconds(0);
            console.log("Timer Stop!");
        } else {
            setIsTimerRunning(true);
            milisecondsRef.current = setInterval(() => {
                setMiliseconds(prev => prev + 10);
            }, 10);
            // secondsRef.current = setInterval(() => {
            //     setSeconds(prev => prev + 1);
            //     console.log("Starting!!");
            // }, 1000);
            console.log("Timer Start!");
        }
    };
    console.log(isTimerRunning);
    // console.log(timer);
    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    });
    console.log(miliseconds.toString());
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
                    ao5: 10.65
                </Badge>
                <Badge
                    className="text-4xl min-w-28 flex justify-center p-2 px-4"
                    variant={"secondary"}
                >
                    ao12: 10.78
                </Badge>
            </div>
        </div>
    );
};

export default Timer;
