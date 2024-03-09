import Image from "next/image";
import CurrentTimes from "./CurrentTimes";
import Session from "./Session";
import logo from "../../public/logo.jpg";

const SideBar = () => {
    return (
        <div className="p-6 space-y-4 w-fit h-full flex flex-col border border-r-slate-800">
            <div className="text-center text-3xl font-extrabold tracking-widest flex justify-center items-center gap-3">
                <div>CubePulse</div>
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                    <Image src={logo} alt="logo" />
                </div>
            </div>
            <Session />
            <CurrentTimes />
        </div>
    );
};

export default SideBar;
