import Layout from '../../components/User-UI/Layout';
import TheatreSidebar from '../../components/Theatre-UI/Dashboard/TheatreSidebar';
// import PieChart from '../../components/Theatre-UI/Dashboard/PieChart';
// import DoughnutChart from '../../components/Theatre-UI/Dashboard/Doughnut';
import LineCharts from '../../components/Theatre-UI/Dashboard/LineCharts';
import BookingTable from '../../components/Theatre-UI/Dashboard/BookingTable';

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex ">
        <TheatreSidebar />
        <div className="flex flex-col  w-screen  pt-12 pl-2 gap-2">
          {/* <PieChart />
          <DoughnutChart /> */}
          <div className="flex justify-center">
            <button type="submit" className="inline-flex justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 w-1/2">
              Daily ticket chart
            </button>
          </div>
          <div className="h-80 mt-14">
            <LineCharts />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="inline-flex justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 w-1/2">
              Booking Table
            </button>
          </div>
          <div className="h-4 mt-6"></div>
          <BookingTable />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
