"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useTimer } from "../../../hooks/useTimer";
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import { Badge } from "@/components/ui/badge";
import { useSession } from "../../../contexts/SessionContext";
import { useRouter, usePathname } from "next/navigation";

const CurrentTimes = () => {
    const session = useSession();
    const router = useRouter();
    const pathname = usePathname().split("/");

    const {
        getSessionTimesAndId,
        getSolveCountInSession,
        getCurrentSessionId
    } = useTimer();
    const currentSessionTimes = getSessionTimesAndId();
    const solveCount = getSolveCountInSession();
    const sessionId = getCurrentSessionId();

    const deleteAllTimesHandler = () => {
        session?.deleteAllTimesFromCurrentSession(sessionId);
    };

    return (
        <ScrollArea className="w-full rounded-md border h-full">
            <div className="p-5">
                <h4 className="mb-8 font-medium leading-none text-center flex flex-col justify-center items-center gap-3">
                    <span>Current Session ({solveCount})</span>
                    <div className="flex justify-center items-center gap-2">
                        <Badge
                            className="w-fit cursor-pointer text-sm"
                            variant={"secondary"}
                            onClick={() => {
                                if (
                                    pathname[pathname.length - 1] ===
                                    "analytics"
                                ) {
                                    router.push(`/timer/${sessionId}`);
                                } else {
                                    router.push(
                                        `/timer/${sessionId}/analytics`
                                    );
                                }
                            }}
                        >
                            {pathname[pathname.length - 1] === "analytics"
                                ? "Timer"
                                : "Analytics"}
                        </Badge>
                        <Badge
                            className="w-fit cursor-pointer text-sm"
                            onClick={deleteAllTimesHandler}
                            variant={"destructive"}
                        >
                            Clear session
                        </Badge>
                    </div>
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
