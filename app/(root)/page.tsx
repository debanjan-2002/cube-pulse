import Link from "next/link";
import { useTimer } from "../hooks/useTimer";
import TimerButton from "./TimerButton";

export default function Home() {
    // const { getCurrentSessionId } = useTimer();

    return (
        <main className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center flex-1">
            <div className="max-w-4xl mx-auto p-8 bg-gray-800 dark:bg-gray-900 shadow-md rounded-md">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome to Speed Cubing Analytics
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                    Track your speed cubing times and analyze your performance
                    with our tools and analytics.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-blue-500 dark:bg-blue-600 rounded-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Track Your Times
                        </h2>
                        <p className="text-gray-200">
                            Record your solves and keep track of your
                            improvement over time.
                        </p>
                    </div>
                    <div className="p-6 bg-green-500 dark:bg-green-600 rounded-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Analytics
                        </h2>
                        <p className="text-gray-200">
                            Analyze your solves with detailed statistics and
                            insights.
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <TimerButton />
                </div>
            </div>
        </main>

        //   <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center py-4 mt-8">
        //     <p>&copy; 2024 Speed Cubing Analytics. All rights reserved.</p>
        //   </footer>
    );
}
