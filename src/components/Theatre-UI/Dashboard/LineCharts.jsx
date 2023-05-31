import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart, ArcElement } from 'chart.js';
import { useSelector } from 'react-redux';
import { getChartDataAPI } from '../../../APIs/Theatre';
Chart.register(ArcElement);

const LineCharts = () => {
  const [data, setData] = useState();
  const currentUserToken = useSelector((state) => state?.token?.data);
  useEffect(() => {
    async function chartData() {
      const chartData = await getChartDataAPI(currentUserToken);
      if (chartData.status) {
        setData(chartData?.tickets);
      }
    }
    chartData();
  }, []);
  return (
    <ResponsiveContainer width="80%" height="80%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineCharts;
