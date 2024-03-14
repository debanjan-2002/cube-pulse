"use client";

import Link from "next/link";
import React from "react";
import { useTimer } from "../hooks/useTimer";

const TimerButton = () => {
    const { getCurrentSessionId } = useTimer();
    return (
        <Link
            href={`/timer/${getCurrentSessionId()}`}
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-500 text-white py-2 px-4 rounded-md"
        >
            Go to Timer
        </Link>
    );
};

export default TimerButton;
