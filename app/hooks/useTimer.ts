import { redirect, useParams } from "next/navigation";
import { useSession } from "../contexts/SessionContext";

export const useTimer = () => {
    const session = useSession();

    const { sessionId } = useParams<{ sessionId: string }>();

    const getSessionNames = () => {
        const sessionNames: string[] = [];
        session?.sessionNameToId.forEach((value, key) => {
            sessionNames.push(key);
        });
        return sessionNames;
    };

    const getSessionIdByName = (sessionName: string) => {
        if (!session) return "";
        const sessionId = session.sessionNameToId.get(sessionName);
        return sessionId;
    };

    const getSessionNameById = (sessionId: string) => {
        if (!session) return "";
        const sessionName = session.sessionIdToName.get(sessionId);

        if (!sessionName) {
            const defaultId = session.data[0].sessionId;
            redirect(`/timer/${defaultId}`);
        }
        return sessionName;
    };

    const getCurrentSessionId = () => {
        if (!session) return "";
        return sessionId || session?.data[0].sessionId;
    };

    const getSessionTimes = () => {
        if (!session) return [];

        const currentSessionData = session.data.filter(sessionData => {
            return sessionData.sessionId === sessionId;
        });
        if (currentSessionData.length === 0) return [];

        const currentSessionTimes: string[] = [];
        if (currentSessionData) {
            currentSessionData[0].sessionTimes.forEach(data => {
                currentSessionTimes.push(data.time);
            });
        }
        return currentSessionTimes;
    };

    const getSessionTimesAndId = () => {
        if (!session) return [];

        const currentSessionData = session.data.filter(sessionData => {
            return sessionData.sessionId === sessionId;
        });
        if (currentSessionData.length === 0) return [];

        return currentSessionData[0].sessionTimes;
    };

    const getAverage = (n: number) => {
        const currentSessionTimes = getSessionTimes();

        if (currentSessionTimes.length < n) return "--";

        const lastNTimes = [];
        for (let i = 0; i < n; i++) {
            lastNTimes.push(parseFloat(currentSessionTimes[i]));
        }
        lastNTimes.sort((a, b) => a - b);
        let sum = 0;
        for (let i = 1; i < n - 1; i++) {
            sum += lastNTimes[i];
        }
        const avg = sum / (n - 2);
        return avg.toFixed(2).toString();
    };

    const getAveragePR = (n: number) => {
        let latestAvg = getAverage(n);
        if (latestAvg === "--") return latestAvg;

        let avg = parseFloat(latestAvg);
        const currentSessionTimes = getSessionTimes();
        const len = currentSessionTimes.length;

        const lastNTimes = [];
        for (let i = 0; i < n; i++) {
            lastNTimes.push(parseFloat(currentSessionTimes[i]));
        }

        for (let i = n; i < len; i++) {
            lastNTimes.push(parseFloat(currentSessionTimes[i]));
            lastNTimes.shift();

            const lastNTimesSorted = lastNTimes.toSorted((a, b) => a - b);

            let currSum = 0;
            for (let j = 1; j < n - 1; j++) {
                currSum += lastNTimesSorted[j];
            }
            const currAvg = currSum / (n - 2);
            avg = Math.min(avg, currAvg);
        }
        return avg.toFixed(2).toString();
    };

    const getLatestTimeInSession = () => {
        const sessionTimes = getSessionTimes();
        if (sessionTimes.length !== 0) {
            const latestTime = sessionTimes[0];

            const decimalIndex = latestTime.indexOf(".");
            const latestMiliseconds = parseInt(
                latestTime.substring(decimalIndex + 1)
            );
            const latestSeconds = parseInt(
                latestTime.substring(0, decimalIndex)
            );

            return {
                latestSeconds,
                latestMiliseconds
            };
        }
        return {
            latestSeconds: 0,
            latestMiliseconds: 0
        };
    };

    const getLatestTimeChange = () => {
        const sessionTimes = getSessionTimes();
        if (sessionTimes.length < 2) {
            return {
                difference: (0.0).toFixed(2),
                isBetter: false
            };
        }

        const lastTime = parseFloat(sessionTimes[0]);
        const secondLastTime = parseFloat(sessionTimes[1]);
        const difference = lastTime - secondLastTime;

        const isBetter = difference >= 0 ? false : true;
        const absoluteDifference = Math.abs(difference);

        return {
            difference: absoluteDifference.toFixed(2),
            isBetter
        };
    };

    const getSolveCountInSession = () => {
        const sessionTimes = getSessionTimes();
        return sessionTimes.length;
    };

    const getSessionTimesAndPR = () => {
        const currentSessionTimes = getSessionTimesAndId().map(sessionTime => {
            return { ...sessionTime, isBest: false };
        });

        let bestIndex = -1;
        let minimumTime = Infinity;
        for (let i = 0; i < currentSessionTimes.length; i++) {
            if (parseFloat(currentSessionTimes[i].time) < minimumTime) {
                minimumTime = parseFloat(currentSessionTimes[i].time);
                bestIndex = i;
            }
        }
        for (let i = 0; i < currentSessionTimes.length; i++) {
            if (i === bestIndex) {
                currentSessionTimes[i].isBest = true;
            }
        }
        return currentSessionTimes;
    };

    const getPRSingle = () => {
        const currentSessionTimes = getSessionTimesAndId();
        if (currentSessionTimes.length === 0) {
            return {
                time: "--",
                scramble: "",
                id: "",
                date: new Date(),
                solveNumber: -1
            };
        }

        let minimumTime = Infinity;
        let bestIndex = -1;

        for (let i = 0; i < currentSessionTimes.length; i++) {
            if (parseFloat(currentSessionTimes[i].time) < minimumTime) {
                minimumTime = parseFloat(currentSessionTimes[i].time);
                bestIndex = i;
            }
        }
        return {
            ...currentSessionTimes[bestIndex],
            solveNumber: currentSessionTimes.length - bestIndex
        };
    };

    const getDayWiseAverage = () => {
        const currentSessionTimes = getSessionTimesAndId();
        const dayWiseSum: Map<number, number[]> = new Map([
            [0, [0, 0]],
            [1, [0, 0]],
            [2, [0, 0]],
            [3, [0, 0]],
            [4, [0, 0]],
            [5, [0, 0]],
            [6, [0, 0]]
        ]);
        currentSessionTimes.map(sessionTime => {
            const day = new Date(sessionTime.date).getDay();
            const prevSum = dayWiseSum.get(day)![0];
            const currTime = parseFloat(sessionTime.time);
            const prevCount = dayWiseSum.get(day)![1];

            dayWiseSum.set(day, [prevSum + currTime, prevCount + 1]);
        });
        const averageData: string[] = [];

        dayWiseSum.forEach((value, key) => {
            averageData.push((value[0] / value[1]).toFixed(2).toString());
        });
        return averageData;
    };

    return {
        getSessionTimes,
        getSessionNames,
        getSessionIdByName,
        getCurrentSessionId,
        getSessionNameById,
        getLatestTimeInSession,
        getLatestTimeChange,
        getSolveCountInSession,
        getSessionTimesAndId,
        getSessionTimesAndPR,
        getPRSingle,
        getAverage,
        getAveragePR,
        getDayWiseAverage
    };
};
