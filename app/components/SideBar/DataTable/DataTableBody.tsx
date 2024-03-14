"use client";

import { useTimer } from "@/app/hooks/useTimer";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const DataTableBody = () => {
    const { getAverage, getPRSingle, getSessionTimes, getAveragePR } =
        useTimer();

    const sessionTimes = getSessionTimes();

    const data = [
        {
            property: "time",
            current: sessionTimes.length === 0 ? "--" : sessionTimes[0],
            best: getPRSingle()
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
                    <TableCell className="text-center p-3">
                        {data.best}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default DataTableBody;
