import CurrentTimes from "./components/CurrentTimes";
import Session from "./components/Session";

export default function Home() {
    return (
        <>
            <div className="p-4 space-y-4 w-fit h-full flex flex-col">
                <Session />
                <CurrentTimes />
            </div>
        </>
    );
}
