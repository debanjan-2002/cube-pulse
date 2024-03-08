"use client";

import { useSession } from "../contexts/SessionContext";

const Scramble = () => {
    const session = useSession();
    const scramble = session?.scramble;

    return (
        <div className="p-6 text-4xl text-center whitespace-pre-wrap">
            {scramble}
        </div>
    );
};

export default Scramble;
