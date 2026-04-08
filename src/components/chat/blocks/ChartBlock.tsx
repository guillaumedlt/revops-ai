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
  Legend,
  ComposedChart,
} from "recharts";

interface Props {
  chartType: "bar" | "line" | "area" | "donut" | "stacked_bar" | "horizontal_bar" | "combo";
  title: string;
  data: Array<Record<string, unknown>>;
  xKey?: string;
  yKey?: string;
  yKeys?: string[];
  colors?: string[];
}

var PALETTE = [
  "#0A0A0A", "#6366F1", "#22C55E", "#F59E0B", "#EF4444",
  "#8B5CF6", "#06B6D4", "#EC4899", "#14B8A6", "#F97316",
];

var tooltipStyle = {
  backgroundColor: "#0A0A0A",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "12px",
  padding: "8px 12px",
};

function formatValue(val: unknown): string {
  if (typeof val !== "number") return String(val ?? "");
  if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
  if (val >= 1000) return (val / 1000).toFixed(1) + "K";
  return val.toLocaleString();
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <p className="font-medium mb-1">{String(label)}</p>
      {payload.map(function(entry: any, i: number) {
        return (
          <div key={i} className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="opacity-70">{entry.name}:</span>
            <span className="font-medium">{formatValue(entry.value)}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ChartBlock({ chartType, title, data, xKey, yKey, yKeys, colors }: Props) {
  if (!data || data.length === 0) return null;

  var keys = Object.keys(data[0] || {});
  if (keys.length === 0) return null;

  var x = xKey || keys.find(function(k) { return typeof data[0][k] === "string"; }) || keys[0];

  // Multi-series: use yKeys if provided, otherwise detect all numeric keys
  var numericKeys = keys.filter(function(k) { return k !== x && typeof data[0][k] === "number"; });
  var seriesKeys = yKeys && yKeys.length > 0 ? yKeys : (yKey ? [yKey] : numericKeys.length > 0 ? numericKeys : (keys.length > 1 ? [keys[1]] : []));

  // Defensive: if no series found, render error state instead of crashing
  if (seriesKeys.length === 0) {
    return (
      <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4 text-[12px] text-[#999]">
        Chart could not be rendered: missing numeric data.
      </div>
    );
  }
  var palette = colors && colors.length > 0 ? colors : PALETTE;
  var isMultiSeries = seriesKeys.length > 1;
  var height = isMultiSeries || chartType === "combo" ? 300 : 260;

  var commonAxisProps = {
    tick: { fontSize: 11, fill: "#737373" },
    axisLine: false,
    tickLine: false,
  };

  var renderLegend = isMultiSeries || chartType === "combo";

  return (
    <div className="border border-[#EAEAEA] rounded-lg p-4 bg-white">
      {title && <div className="text-sm font-semibold text-[#111] mb-3">{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        {chartType === "bar" ? (
          <BarChart data={data} barGap={2}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={formatValue} />
            <Tooltip content={<CustomTooltip />} />
            {renderLegend && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />}
            {seriesKeys.map(function(key, i) {
              return <Bar key={key} dataKey={key} fill={palette[i % palette.length]} radius={[4, 4, 0, 0]} />;
            })}
          </BarChart>
        ) : chartType === "stacked_bar" ? (
          <BarChart data={data}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={formatValue} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            {seriesKeys.map(function(key, i) {
              return <Bar key={key} dataKey={key} stackId="stack" fill={palette[i % palette.length]} radius={i === seriesKeys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />;
            })}
          </BarChart>
        ) : chartType === "horizontal_bar" ? (
          <BarChart data={data} layout="vertical" barGap={2}>
            <CartesianGrid stroke="#F0F0F0" horizontal={false} />
            <XAxis type="number" {...commonAxisProps} tickFormatter={formatValue} />
            <YAxis type="category" dataKey={x} {...commonAxisProps} width={100} />
            <Tooltip content={<CustomTooltip />} />
            {renderLegend && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />}
            {seriesKeys.map(function(key, i) {
              return <Bar key={key} dataKey={key} fill={palette[i % palette.length]} radius={[0, 4, 4, 0]} />;
            })}
          </BarChart>
        ) : chartType === "line" ? (
          <LineChart data={data}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={formatValue} />
            <Tooltip content={<CustomTooltip />} />
            {renderLegend && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />}
            {seriesKeys.map(function(key, i) {
              return <Line key={key} type="monotone" dataKey={key} stroke={palette[i % palette.length]} strokeWidth={2} dot={{ r: 3, fill: palette[i % palette.length] }} activeDot={{ r: 5 }} />;
            })}
          </LineChart>
        ) : chartType === "area" ? (
          <AreaChart data={data}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={formatValue} />
            <Tooltip content={<CustomTooltip />} />
            {renderLegend && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />}
            {seriesKeys.map(function(key, i) {
              return <Area key={key} type="monotone" dataKey={key} stroke={palette[i % palette.length]} fill={palette[i % palette.length]} fillOpacity={0.08 + (i * 0.03)} strokeWidth={2} />;
            })}
          </AreaChart>
        ) : chartType === "combo" ? (
          <ComposedChart data={data}>
            <CartesianGrid stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey={x} {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={formatValue} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            {seriesKeys.map(function(key, i) {
              if (i === 0) return <Bar key={key} dataKey={key} fill={palette[0]} radius={[4, 4, 0, 0]} />;
              return <Line key={key} type="monotone" dataKey={key} stroke={palette[i % palette.length]} strokeWidth={2} dot={{ r: 3 }} />;
            })}
          </ComposedChart>
        ) : (
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Pie
              data={data}
              dataKey={seriesKeys[0]}
              nameKey={x}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map(function(_, i) {
                return <Cell key={i} fill={palette[i % palette.length]} />;
              })}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
