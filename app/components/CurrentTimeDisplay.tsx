import { Separator } from "@/components/ui/separator";
import React from "react";
import { useSession } from "../contexts/SessionContext";
import { useTimer } from "../hooks/useTimer";

interface CurrentTimeDisplayProps {
    time: string;
    id: string;
}

const CurrentTimeDisplay = ({ time, id }: CurrentTimeDisplayProps) => {
    const session = useSession();
    const { getCurrentSessionId } = useTimer();

    const timeDeleteHandler = () => {
        session?.deleteTimeFromCurrentSession(getCurrentSessionId(), id);
    };

    return (
        <div onClick={timeDeleteHandler}>
            <div className="text-center">{time}</div>
            <Separator className="my-4" />
        </div>
    );
};

export default CurrentTimeDisplay;
