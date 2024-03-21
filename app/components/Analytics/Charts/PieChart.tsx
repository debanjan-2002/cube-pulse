"use client";

import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    TooltipItem
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useTimer } from "@/app/hooks/useTimer";
import { BACKGROUND_COLORS, BORDER_COLORS } from "@/app/constants/colors";

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
        },
        tooltip: {
            callbacks: {
                afterLabel: function (tooltipItem: TooltipItem<"doughnut">) {
                    const totalSolveCount = tooltipItem.dataset.data.reduce(
                        (acc, item) => acc + item,
                        0
                    );
                    const currentRangeSolveCount = parseInt(
                        tooltipItem.formattedValue
                    );
                    const percentage =
                        (currentRangeSolveCount / totalSolveCount) * 100;
                    return `Percentage: ${percentage.toFixed(2)}%`;
                }
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
                backgroundColor: BACKGROUND_COLORS,
                borderColor: BORDER_COLORS,
                borderWidth: 1
            }
        ]
    };
    return <Doughnut data={data} options={options} />;
}
