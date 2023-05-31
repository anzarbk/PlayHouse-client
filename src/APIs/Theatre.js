import express from '../utils/express'; // axios
export const theatreCreateAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/theatre',
      data: dataV,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    // throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const theatreEditAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/theatre',
      data: dataV,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    // throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};

// API for editing images profile of user
export const theatreImagesEditAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/theatre-image',
      data: dataV,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getTheatreDataAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/theatre-data/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const movieCreateAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/movie',
      data: dataV,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    // throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const movieEditAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/movie',
      data: dataV,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    // throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};

// API for editing images profile of user
export const movieImagesEditAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/movie-image',
      data: dataV,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getMovieDataAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/movie-data/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};

export const getAlltheatreAPI = async (token) => {
  try {
    const { data } = await express({
      url: `/admin/theatre-data`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getUniqueTheatreAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: `/admin/theatre-only-data/${dataV}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const seatCharterAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/seat-charter',
      data: dataV,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    // throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const updateCharterAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/seat-charter',
      data: dataV,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    // throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getSeatCharterDataAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/seat-data/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getSeatCharterDataBYNameAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/seat-data-name/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const addShowAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/add-show',
      data: dataV,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    if (data?.status === 'failed') return data;
  } catch (err) {
    throw err;
  }
};
export const createTicketAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: '/ticket',
      data: dataV,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    if (data?.status === 'failed') return data;
  } catch (err) {
    throw err;
  }
};
export const getShowDataAPI = async (token) => {
  try {
    const { data } = await express({
      url: `/show-data`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getChartDataAPI = async (token) => {
  try {
    const { data } = await express({
      url: `/chart-data`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const movieFromDb = async (token) => {
  try {
    const { data } = await express({
      url: `/db-movie`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getSpecificTheatre = async (id, token) => {
  try {
    const { data } = await express({
      url: `/spec-theatre/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getScreenDataAPI = async (token) => {
  try {
    const { data } = await express({
      url: `/screen-data`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const addShowTimeAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: `/add-show-time`,
      method: 'PATCH',
      data: dataV,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getShowTimeAPI = async (token) => {
  try {
    const { data } = await express({
      url: `/get-show-time`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const deleteSeatCharterAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/delete-seat-charter/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const deleteShowTimeAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/delete-show-time/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const deleteShowAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/delete-show/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getSeatCharterSingleDataAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/get-single-seat/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const getShowDataByIdAPI = async (id, token) => {
  try {
    const { data } = await express({
      url: `/show-data/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
export const deleteTicketAPI = async (dataV, token) => {
  try {
    const { data } = await express({
      url: `/delete-ticket`,
      method: 'DELETE',
      data: dataV,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};

export const getTicketListByUserId = async (token) => {
  try {
    const { data } = await express({
      url: `/get-tickets`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (data?.status === 'success') return data;
    throw new Error('Something went wrong !');
  } catch (err) {
    throw err;
  }
};
