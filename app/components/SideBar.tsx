import CurrentTimes from "./CurrentTimes";
import Session from "./Session";

const SideBar = () => {
    return (
        <div className="p-6 space-y-4 w-fit h-full flex flex-col border border-r-slate-800">
            <Session />
            <CurrentTimes />
        </div>
    );
};

export default SideBar;
