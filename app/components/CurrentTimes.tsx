"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTimer } from "../hooks/useTimer";

import { v4 as uuid4 } from "uuid";

const CurrentTimes = () => {
    const { getSessionTimes, getSolveCountInSession } = useTimer();
    const currentSessionTimes = getSessionTimes();
    const solveCount = getSolveCountInSession();

    return (
        <ScrollArea className="w-full rounded-md border">
            <div className="p-5">
                <h4 className="mb-8 font-medium leading-none text-center">
                    Current Session ({solveCount})
                </h4>
                {currentSessionTimes.map((time, i) => (
                    <div key={uuid4()}>
                        <div className="text-center">{time}</div>
                        <Separator className="my-4" />
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};

export default CurrentTimes;
