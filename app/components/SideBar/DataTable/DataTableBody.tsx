"use client";

import { useTimer } from "@/app/hooks/useTimer";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import SingleTimeModal from "../CurrentTimes/SingleTimeModal";
import { useSession } from "@/app/contexts/SessionContext";

const DataTableBody = () => {
    const [open, setOpen] = useState(false);
    const session = useSession();
    const {
        getAverage,
        getPRSingle,
        getSessionTimes,
        getAveragePR,
        getCurrentSessionId
    } = useTimer();

    const onTimeDelete = (timeId: string) => {
        session?.deleteTimeFromCurrentSession(getCurrentSessionId(), timeId);
    };
    const modalHandler = (property: string) => {
        if (property !== "time") return;
        setOpen(!open);
    };

    const sessionTimes = getSessionTimes();
    const prSingle = getPRSingle();

    const data = [
        {
            property: "time",
            current: sessionTimes.length === 0 ? "--" : sessionTimes[0],
            best: prSingle.time
        },
        {
            property: "ao5",
            current: getAverage(5),
            best: getAveragePR(5)
        },
        {
            property: "ao12",
            current: getAverage(12),
            best: getAveragePR(12)
        }
    ];

    return (
        <TableBody>
            {data.map(data => (
                <TableRow key={data.property}>
                    <TableCell className="text-center p-3">
                        {data.property}
                    </TableCell>
                    <TableCell className="text-center border-x p-3">
                        {data.current}
                    </TableCell>
                    <TableCell
                        className={`text-center p-3 ${
                            data.property === "time" && prSingle.time !== "--"
                                ? `cursor-pointer`
                                : null
                        }`}
                        onClick={() => modalHandler(data.property)}
                    >
                        {data.property === "time" && prSingle.time !== "--" && (
                            <SingleTimeModal
                                open={open}
                                onClickHandler={onTimeDelete}
                                date={prSingle.date}
                                id={prSingle.id}
                                scramble={prSingle.scramble}
                                time={prSingle.time}
                                key={prSingle.id}
                                solveNumber={prSingle.solveNumber}
                            />
                        )}
                        {data.best}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default DataTableBody;
