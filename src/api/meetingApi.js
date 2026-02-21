import axiosInstance from './axiosInstance';

export const meetingApi = {
  // Meeting pagination is 1-indexed (page=1 is first page)
  getList: (page = 1, category = null) => {
    const params = { page };
    if (category) params.category = category;
    return axiosInstance.get('/api/meeting', { params });
  },

  getOne: (meetingId) => axiosInstance.get(`/api/meeting/${meetingId}`),

  create: (data) => axiosInstance.post('/api/meeting', data),

  join: (meetingId) => axiosInstance.post(`/api/meeting/${meetingId}`),
};
