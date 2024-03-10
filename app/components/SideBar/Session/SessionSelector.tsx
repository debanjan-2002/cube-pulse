"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { redirect } from "next/navigation";
import { useTimer } from "../../../hooks/useTimer";

export default function SessionSelector() {
    const {
        getSessionNames,
        getSessionIdByName,
        getCurrentSessionId,
        getSessionNameById
    } = useTimer();

    const sessionNames = getSessionNames();
    const currentSessionId = getCurrentSessionId();
    const currentSessionName = getSessionNameById(currentSessionId);

    return (
        <Select
            defaultValue={currentSessionName}
            onValueChange={sessionName => {
                const id = getSessionIdByName(sessionName);
                redirect(`/timer/${id}`);
            }}
        >
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select session" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {sessionNames.map(name => (
                        <SelectItem value={name} key={name}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
