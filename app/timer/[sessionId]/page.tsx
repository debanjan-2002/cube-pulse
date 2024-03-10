import Timer from "../../components/TimerSection/Timer";
import Scramble from "../../components/TimerSection/Scramble";

const page = () => {
    return (
        <>
            <div className="flex flex-col w-full">
                <Scramble />
                <Timer />
            </div>
        </>
    );
};

export default page;
