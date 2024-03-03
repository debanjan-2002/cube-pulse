import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface NewSessionProps {
    onAddSession: (sessionName: string) => void;
}

export default function NewSession(props: NewSessionProps) {
    const [sessionName, setSessionName] = useState("");
    const addNewSessionHandler = () => {
        if (sessionName === "") return;
        props.onAddSession(sessionName);
        setSessionName("");
    };
    return (
        <div className="flex w-full max-w-sm items-center flex-col gap-2">
            <Input
                type="email"
                value={sessionName}
                placeholder="Session name"
                onChange={e => setSessionName(e.target.value)}
            />
            <Button
                type="button"
                className="w-full"
                onClick={addNewSessionHandler}
            >
                Add
            </Button>
        </div>
    );
}
