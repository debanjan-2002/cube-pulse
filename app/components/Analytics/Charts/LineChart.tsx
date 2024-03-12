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

defaults.maintainAspectRatio = false;
defaults.responsive = true;
console.log(defaults);

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
    // plugins: {
    //     legend: {
    //         position: "top" as const
    //     },
    //     title: {
    //         display: true,
    //         text: "Chart.js Line Chart"
    //     }
    // }
    scales: {
        x: {
            ticks: {
                display: false
            }
        }
    },
    elements: {
        line: {
            tension: 0.5
        }
    }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => Math.floor(Math.random() * 10)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
    ]
};

export default function App() {
    return <Line data={data} options={options} />;
}
