import axiosInstance from './axiosInstance';

export const postApi = {
  getList: (page = 0, size = 10) =>
    axiosInstance.get('/api/post', { params: { page, size } }),

  getOne: (id) => axiosInstance.get(`/api/post/${id}`),

  create: (data) => axiosInstance.post('/api/post', data),

  update: (id, data) => axiosInstance.put(`/api/post/${id}`, data),

  delete: (id) => axiosInstance.delete(`/api/post/${id}`),

  like: (id) => axiosInstance.post(`/api/post/${id}/like`),

  unlike: (id) => axiosInstance.delete(`/api/post/${id}/like`),
};
