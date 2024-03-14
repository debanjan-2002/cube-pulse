"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    defaults
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTimer } from "@/app/hooks/useTimer";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        legend: {
            // position: "top" as const,
            display: false
            // title: {
            //     display: true,
            //     font: {
            //         size: 24
            //     }
            // },
            // labels: {
            //     font: {
            //         size: 16
            //     }
            // }
        },
        title: {
            display: true,
            text: "Variation of Session times w.r.t to Average time",
            font: {
                size: 16
            }
        }
    },

    scales: {
        x: {
            ticks: {
                display: false
            }
        },
        y: {
            title: {
                text: "Times (in sec.)",
                display: true
            },
            ticks: {
                stepSize: 0.5
            }
        }
    },
    elements: {
        line: {
            tension: 0.5
        }
    }
};

export default function LineChart() {
    const { getSessionTimes } = useTimer();
    const sessionTimes = getSessionTimes();

    const labels = sessionTimes.map((time, i) => i + 1);
    const sum = sessionTimes.reduce((acc, time) => acc + parseFloat(time), 0);
    const avg = sum / sessionTimes.length;
    sessionTimes.reverse();

    const data = {
        labels,
        datasets: [
            {
                label: "Times of session",
                data: sessionTimes.map(time => time),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            },
            {
                label: "Average time of session",
                data: sessionTimes.map(() => avg.toFixed(2)),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                pointRadius: 0,
                borderDash: [5, 5]
            }
        ]
    };

    return <Line data={data} options={options} />;
}
