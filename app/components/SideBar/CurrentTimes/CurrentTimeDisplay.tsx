import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useSession } from "../../../contexts/SessionContext";
import { useTimer } from "../../../hooks/useTimer";
import Modal from "./Modal";

interface CurrentTimeDisplayProps {
    time: string;
    id: string;
    scramble: string;
    solveNumber: number;
    date: Date;
}

const CurrentTimeDisplay = ({
    time,
    id,
    scramble,
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
                <Modal
                    open={open}
                    id={id}
                    time={time}
                    date={date}
                    scramble={scramble}
                    solveNumber={solveNumber}
                    onClickHandler={onTimeDelete}
                />
                <div className="text-center">{time}</div>
                <Separator className="my-4" />
            </div>
        </>
    );
};

export default CurrentTimeDisplay;