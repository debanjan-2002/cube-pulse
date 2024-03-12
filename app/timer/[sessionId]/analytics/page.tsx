import AnalyticsBody from "@/app/components/Analytics/AnalyticsBody";
import AnalyticsHeader from "@/app/components/Analytics/AnalyticsHeader";
import React from "react";

const page = () => {
    return (
        <div className="flex flex-col w-full">
            <AnalyticsHeader />
            <AnalyticsBody />
        </div>
    );
};

export default page;
