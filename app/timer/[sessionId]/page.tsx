import SideBar from "../../components/SideBar";
import Timer from "../../components/Timer";
import Scramble from "../../components/Scramble";

const page = () => {
    return (
        <>
            <SideBar />
            <div className="flex flex-col w-full">
                <Scramble />
                <Timer />
            </div>
        </>
    );
};

export default page;
