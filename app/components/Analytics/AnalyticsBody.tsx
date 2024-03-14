import React from "react";
import LineChart from "@/app/components/Analytics/Charts/LineChart";
import BarChart from "./Charts/BarChart";

const AnalyticsBody = () => {
    return (
        <div className="p-6 text-4xl leading-tight flex-1 bg-slate-900 overflow-y-scrol flex flex-wrap gap-7 justify-center items-center">
            <div className="g-slate-400 rounded-md p-2 w-[92%] h-[20rem] border">
                <LineChart />
            </div>
            <div className="g-slate-400 rounded-md p-2 w-[45%] h-[20rem] border">
                <BarChart />
            </div>
            <div className="g-slate-400 rounded-md p-2 w-[45%] h-[20rem] border">
                <LineChart />
            </div>
        </div>
    );
};

export default AnalyticsBody;
