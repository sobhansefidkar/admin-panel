/** @format */
import { useEffect, useState } from "react";
import "./chart.scss"
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
import axios from "axios";

function Chart() {
  const [data , setData] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3000/api/registrationDate`)
    .then(res => {    
      setData(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    } , [])
  return (
    <div className='chart'>
      <h1>نمودار تعداد کاربران</h1>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend verticalAlign='top' height={36} />
          <Line
            name=''
            type='monotone'
            dataKey='pv'
            stroke='#8884d8'
          />
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
