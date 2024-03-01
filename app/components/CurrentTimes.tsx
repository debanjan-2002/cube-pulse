import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

const tags = Array.from({ length: 50 }).map((_, i, a) => `10.${a.length - i}`);

const CurrentTimes = () => {
    return (
        <ScrollArea className="w-full rounded-md border">
            <div className="p-5">
                <h4 className="mb-8 font-medium leading-none text-center">
                    Current Session
                </h4>
                {tags.map(tag => (
                    <>
                        <div key={tag} className="text-center">
                            {tag}
                        </div>
                        <Separator className="my-4" />
                    </>
                ))}
            </div>
        </ScrollArea>
    );
};

export default CurrentTimes;
