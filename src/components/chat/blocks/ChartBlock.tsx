"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  chartType: "bar" | "line" | "area" | "donut";
  title: string;
  data: Array<Record<string, unknown>>;
  xKey?: string;
  yKey?: string;
}

const COLORS = ["#0A0A0A", "#525252", "#A3A3A3", "#D4D4D4", "#737373"];

const customTooltipStyle = {
  backgroundColor: "#0A0A0A",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "12px",
};

export default function ChartBlock({ chartType, title, data, xKey, yKey }: Props) {
  if (!data || data.length === 0) return null;

  // Auto-detect keys from first data item
  const keys = Object.keys(data[0]);
  const x = xKey || keys.find((k) => typeof data[0][k] === "string") || keys[0];
  const y = yKey || keys.find((k) => typeof data[0][k] === "number" && k !== x) || keys[1];

  return (
    <div className="border border-[#E5E5E5] rounded-lg p-4 bg-white">
      {title && <div className="text-sm font-medium text-[#0A0A0A] mb-3">{title}</div>}
      <ResponsiveContainer width="100%" height={250}>
        {chartType === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={customTooltipStyle} />
            <Bar dataKey={y} fill="#0A0A0A" radius={[3, 3, 0, 0]} />
          </BarChart>
        ) : chartType === "line" ? (
          <LineChart data={data}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={customTooltipStyle} />
            <Line type="monotone" dataKey={y} stroke="#0A0A0A" strokeWidth={2} dot={false} />
          </LineChart>
        ) : chartType === "area" ? (
          <AreaChart data={data}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={customTooltipStyle} />
            <Area type="monotone" dataKey={y} stroke="#0A0A0A" fill="#0A0A0A" fillOpacity={0.1} />
          </AreaChart>
        ) : (
          <PieChart>
            <Tooltip contentStyle={customTooltipStyle} />
            <Pie
              data={data}
              dataKey={y}
              nameKey={x}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
