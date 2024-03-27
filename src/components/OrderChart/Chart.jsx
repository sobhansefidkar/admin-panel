/** @format */

import "./chart.scss";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
const data = [
  { name: "فروردین", uv: 500 },
  { name: "فروردین", uv: 200 },
  { name: "فروردین", uv: 400 },
  { name: "فروردین", uv: 150 },
  { name: "فروردین", uv: 350 },
  { name: "فروردین", uv: 350 },
  { name: "فروردین", uv: 120 },
  { name: "فروردین", uv: 160 },
  { name: "فروردین", uv: 450 },
  { name: "فروردین", uv: 120 },
  { name: "فروردین", uv: 160 },
  { name: "فروردین", uv: 450 },
];

function Chart() {
  return (
    <div className='chart'>
      <h1>نمودار فروش</h1>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend verticalAlign='top' height={36} />
          <Line name='' type='monotone' dataKey='pv' stroke='#8884d8' />
          <Line
            name=''
            type='monotone'
            dataKey='uv'
            stroke='#82ca9d'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
