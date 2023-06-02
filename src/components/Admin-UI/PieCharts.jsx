import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { adminChartDataAPI } from '../../APIs/Theatre';

const PieCharts = () => {
  const [data, setData] = useState([]);
  const currentUserToken = useSelector((state) => state?.token?.data);
  console.log(currentUserToken);
  // const demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';
  useEffect(() => {
    async function invoke() {
      const data = await adminChartDataAPI(currentUserToken);
      if (data.status) {
        console.log(data);
        setData(data.result);
      }
    }
    invoke();
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={50} height={200}>
        <Pie dataKey="value" isAnimationActive={false} data={data} cx="40%" cy="50%" outerRadius={150} fill="#8884d8" label />
        {/* <Pie dataKey="value" data={data02} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieCharts;
