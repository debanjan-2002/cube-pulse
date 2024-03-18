"use client";

import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    defaults
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTimer } from "@/app/hooks/useTimer";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    plugins: {
        legend: {
            display: true
        },
        colors: {
            enabled: true
        },
        title: {
            display: true,
            text: "Number of solves in time ranges (in sec.)",
            font: {
                size: 16
            }
        }
    }
};

export default function PieChart() {
    const { getTimeRangeData } = useTimer();
    const { labels, dataCount } = getTimeRangeData();

    const data = {
        labels,
        datasets: [
            {
                label: "Solve count",
                data: dataCount,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
            }
        ]
    };
    return <Doughnut data={data} options={options} />;
}
