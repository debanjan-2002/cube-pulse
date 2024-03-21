"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    defaults
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTimer } from "@/app/hooks/useTimer";
import { BACKGROUND_COLORS } from "@/app/constants/colors";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.color = "#cacaca";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        colors: {
            enabled: true
        },
        title: {
            display: true,
            text: "Average solve time (day wise)",
            font: {
                size: 16
            }
        }
    },
    scales: {
        y: {
            title: {
                text: "Times (in sec.)",
                display: true
            },
            ticks: {
                stepSize: 0.5
            }
        }
    }
};

const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export default function BarChart() {
    const { getDayWiseAverage } = useTimer();
    const dayWiseData = getDayWiseAverage();

    const data = {
        labels,
        datasets: [
            {
                label: "Average Time (in sec)",
                data: dayWiseData,
                backgroundColor: BACKGROUND_COLORS
            }
        ]
    };
    return <Bar options={options} data={data} />;
}
