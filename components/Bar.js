"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Usage Data",
    },
  },
};

const generateDataset = (
  usageData,
  key,
  label,
  borderColor,
  backgroundColor
) => {
  return {
    label,
    data: usageData.map((item) => item[key]),
    borderColor,
    backgroundColor,
  };
};

export function CPUChart({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "cpu",
        "CPU Usage",
        "rgb(255, 99, 132)",
        "rgba(255, 99, 132, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}

export function MemoryChart({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "memory",
        "Memory Usage",
        "rgb(75, 192, 192)",
        "rgba(75, 192, 192, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}

export function DiskChart({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "disk",
        "Disk Usage",
        "rgb(255, 205, 86)",
        "rgba(255, 205, 86, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}

export function S3ObjectsChart({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "objects",
        "S3 Objects",
        "rgb(255, 99, 132)",
        "rgba(255, 99, 132, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}

export function S3SizeChart({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "size",
        "S3 Size",
        "rgb(75, 192, 192)",
        "rgba(75, 192, 192, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}

export function S3HitsChart({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "hits",
        "S3 Hits",
        "rgb(255, 205, 86)",
        "rgba(255, 205, 86, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}
export function FwRequests({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "requests",
        "Firewall Requests",
        "rgb(86, 184, 255)",
        "rgba(86, 184, 255, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}
export function FwAllow({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        label: "Firewall Allow",
        data: usageData.map((dataPoint) => dataPoint.allowed),
        borderColor: "rgb(123, 230, 100)",
        backgroundColor: "rgba(123, 230, 100, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export function FwBlocked({ usageData }) {
  const data = {
    labels: usageData.map((_, index) => (index + 1).toString()),
    datasets: [
      generateDataset(
        usageData,
        "blocked",
        "Firewall Blocked",
        "rgb(255, 99, 132)",
        "rgba(255, 99, 132, 0.5)"
      ),
    ],
  };

  return <Line options={options} data={data} />;
}
