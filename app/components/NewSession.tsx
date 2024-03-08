"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "../contexts/SessionContext";

export default function NewSession() {
    const [sessionName, setSessionName] = useState("");
    const session = useSession();

    const addNewSessionHandler = () => {
        session?.addNewSession(sessionName);
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
