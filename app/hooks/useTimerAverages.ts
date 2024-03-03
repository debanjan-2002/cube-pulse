import { useSession } from "../contexts/SessionContext";

export const useTimerAverages = () => {
    const session = useSession();

    const getAverageOfFive = () => {
        if (!session) return "--";
        if (session.sessionTimes.length < 5) return "--";
        const lastFiveTimes = [];
        for (let i = 0; i < 5; i++) {
            lastFiveTimes.push(parseFloat(session.sessionTimes[i]));
        }
        lastFiveTimes.sort((a, b) => a - b);
        let sum = 0;
        for (let i = 1; i < 4; i++) {
            sum += lastFiveTimes[i];
        }
        const avg = sum / 3;
        return avg.toFixed(2).toString();
    };

    const getAverageOfTwelve = () => {
        if (!session) return "--";
        if (session.sessionTimes.length < 12) return "--";
        const lastTwelveTimes = [];
        for (let i = 0; i < 12; i++) {
            lastTwelveTimes.push(parseFloat(session.sessionTimes[i]));
        }
        lastTwelveTimes.sort((a, b) => a - b);
        let sum = 0;
        for (let i = 1; i < 11; i++) {
            sum += lastTwelveTimes[i];
        }
        const avg = sum / 10;
        return avg.toFixed(2).toString();
    };

    return { getAverageOfFive, getAverageOfTwelve };
};
