"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface SessionSelectorProps {
    sessions: { sessionName: string }[];
}

export default function SessionSelector({ sessions }: SessionSelectorProps) {
    return (
        <Select defaultValue={sessions[0].sessionName}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select session" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {sessions.map(session => (
                        <SelectItem
                            value={session.sessionName}
                            key={session.sessionName}
                        >
                            {session.sessionName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
