import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useSession } from "../../../contexts/SessionContext";
import { useTimer } from "../../../hooks/useTimer";
import SingleTimeModal from "./SingleTimeModal";

interface CurrentTimeDisplayProps {
    time: string;
    id: string;
    scramble: string;
    solveNumber: number;
    date: Date;
    isBest: boolean;
}

const CurrentTimeDisplay = ({
    time,
    id,
    scramble,
    isBest,
    solveNumber,
    date
}: CurrentTimeDisplayProps) => {
    const [open, setOpen] = useState(false);
    const session = useSession();
    const { getCurrentSessionId } = useTimer();

    const onTimeDelete = (timeId: string) => {
        session?.deleteTimeFromCurrentSession(getCurrentSessionId(), timeId);
    };
    const modalHandler = () => {
        setOpen(!open);
    };

    return (
        <>
            <div onClick={modalHandler} className="cursor-pointer">
                <SingleTimeModal
                    open={open}
                    id={id}
                    time={time}
                    date={date}
                    scramble={scramble}
                    solveNumber={solveNumber}
                    onClickHandler={onTimeDelete}
                />
                <div
                    className={`text-center ${
                        isBest ? `text-green-500 font-bold` : `text-white`
                    }`}
                >
                    {time}
                </div>
                <Separator className="my-4" />
            </div>
        </>
    );
};

export default CurrentTimeDisplay;
