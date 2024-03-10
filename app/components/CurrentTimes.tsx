"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useTimer } from "../hooks/useTimer";
import CurrentTimeDisplay from "./CurrentTimeDisplay";

const CurrentTimes = () => {
    const { getSessionTimesAndId, getSolveCountInSession } = useTimer();
    const currentSessionTimes = getSessionTimesAndId();
    const solveCount = getSolveCountInSession();

    return (
        <ScrollArea className="w-full rounded-md border h-full">
            <div className="p-5">
                <h4 className="mb-8 font-medium leading-none text-center">
                    Current Session ({solveCount})
                </h4>
                {currentSessionTimes.map((data, i) => (
                    <CurrentTimeDisplay
                        time={data.time}
                        id={data.id}
                        key={data.id}
                        solveNumber={currentSessionTimes.length - i}
                        scramble={data.scramble}
                    />
                ))}
            </div>
        </ScrollArea>
    );
};

export default CurrentTimes;
