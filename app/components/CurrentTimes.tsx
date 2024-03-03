"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSession } from "../contexts/SessionContext";

const CurrentTimes = () => {
    const session = useSession();

    return (
        <ScrollArea className="w-full rounded-md border">
            <div className="p-5">
                <h4 className="mb-8 font-medium leading-none text-center">
                    Current Session
                </h4>
                {session?.sessionTimes.map((time, i) => (
                    <>
                        <div key={i} className="text-center">
                            {time}
                        </div>
                        <Separator className="my-4" />
                    </>
                ))}
            </div>
        </ScrollArea>
    );
};

export default CurrentTimes;
