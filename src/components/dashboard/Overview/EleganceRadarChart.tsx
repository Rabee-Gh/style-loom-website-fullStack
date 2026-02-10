import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface EleganceRadarChartProps {
  data: any[];
}

const EleganceRadarChart = ({ data }: EleganceRadarChartProps) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isDark = mode === "dark";
  return (
    <div className="w-full h-80 bg-white dark:bg-dark-15 p-6 rounded-2xl border-2 border-dashed border-dark-15 transition-all hover:bg-white/80 dark:hover:bg-dark-20">
      <h3 className="text-dark-10 dark:text-white font-bold font-mono mb-4">
        Elegance Evaluation (by Segment)
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={isDark ? "#b39a8233" : "#e5e7eb"} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#888", fontSize: 10, fontFamily: "monospace" }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />

          <Radar
            name="Women"
            dataKey="Women"
            stroke={isDark ? "var(--color-dark-accent)" : "#8B4513"}
            fill={isDark ? "var(--color-dark-accent)" : "#8B4513"}
            fillOpacity={0.4}
          />
          <Radar
            name="Men"
            dataKey="Men"
            stroke={isDark ? "var(--color-brown-50)" : "#4A3728"}
            fill={isDark ? "var(--color-brown-50)" : "#4A3728"}
            fillOpacity={0.4}
          />
          <Radar
            name="Kids"
            dataKey="Kids"
            stroke={isDark ? "var(--color-brown-80)" : "#D2B48C"}
            fill={isDark ? "var(--color-brown-80)" : "#D2B48C"}
            fillOpacity={0.4}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1a1a1a" : "#fff",
              border: "none",
              borderRadius: "12px",
              color: isDark ? "#fff" : "#333",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
            itemStyle={{ color: isDark ? "#fff" : "#333" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "10px" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EleganceRadarChart;
