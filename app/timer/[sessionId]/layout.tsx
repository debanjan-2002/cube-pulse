import SideBar from "@/app/components/SideBar/SideBar";
import React from "react";

const TimerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full">
            <SideBar />
            {children}
        </div>
    );
};

export default TimerLayout;
