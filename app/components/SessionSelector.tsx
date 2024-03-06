import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { redirect } from "next/navigation";

interface SessionSelectorProps {
    sessionNames: string[];
    getSessionId: (sessionName: string) => string;
    currentSessionName: string;
}

export default function SessionSelector({
    sessionNames,
    currentSessionName,
    getSessionId
}: SessionSelectorProps) {
    return (
        <Select
            defaultValue={currentSessionName}
            onValueChange={sessionName => {
                const id = getSessionId(sessionName);
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
