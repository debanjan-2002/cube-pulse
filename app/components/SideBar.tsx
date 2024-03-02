import CurrentTimes from "./CurrentTimes";
import Session from "./Session";

interface SideBarProps {
    time: string[];
}

const SideBar = ({ time }: SideBarProps) => {
    return (
        <div className="p-4 space-y-4 w-fit h-full flex flex-col">
            <Session />
            <CurrentTimes times={time} />
        </div>
    );
};

export default SideBar;
