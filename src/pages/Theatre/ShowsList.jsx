import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/User-UI/Layout';
import TheatreSidebar from '../../components/Theatre-UI/Dashboard/TheatreSidebar';
import { deleteShowAPI, getShowDataAPI } from '../../APIs/Theatre';
import ShowListElement from '../../components/Theatre-UI/ShowListElement';
const ShowsList = () => {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const currentUser = useSelector((state) => state?.user?.data?._id); //##### This function for fetch data from redux
  const [show, setShow] = useState([]);
  const lengther = () => {
    setShowLength(show.length);
  };
  const [showLength, setShowLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(showLength / itemsPerPage);

  // Slice the data array based on current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = show.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const getShow = async () => {
      const show = await getShowDataAPI(currentUserToken);
      if (show.status) {
        setShow(show.show);
      }
    };
    getShow();
    lengther();
  }, []);

  return (
    <Layout>
      <div className=" ">
        <div className="flex w-screen ">
          {' '}
          <TheatreSidebar />
          <div className="sm:px-6 w-[83vw] py-8">
            <div className="bg-white py-8 md:py-7 px-4 md:px-8 xl:px-10 ">
              <div className="sm:flex items-center justify-center">
                <button className="mt-4 sm:mt-0 inline-flex items-start justify-end px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">show List</p>
                </button>
              </div>
              <div className="mt-7 h-[90vh] overflow-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {currentItems.map((el) => (
                      <ShowListElement key={el._id} el={el} />
                    ))}
                  </tbody>
                </table>
                <div className="flex gap-2 w-full justify-center mt-2">
                  <button className="text-xs w-fit px-2 border  bg-sky-700 rounded-md py-1" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Prev
                  </button>
                  <button className="text-xs w-fit px-2 border bg-sky-700 rounded-md py-1" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <style>
            {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
          </style>
        </div>
      </div>
    </Layout>
  );
};

export default ShowsList;
