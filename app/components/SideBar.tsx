import CurrentTimes from "./CurrentTimes";
import Session from "./Session";

const SideBar = () => {
    return (
        <div className="p-4 space-y-4 w-fit h-full flex flex-col">
            <Session />
            <CurrentTimes />
        </div>
    );
};

export default SideBar;
