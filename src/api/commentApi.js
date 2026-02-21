import axiosInstance from './axiosInstance';

export const commentApi = {
  // commentId = 0 for top-level comment, parent comment ID for replies
  create: (postId, commentId, data) =>
    axiosInstance.post(`/api/post/${postId}/comment/${commentId}`, data),

  getOne: (id) => axiosInstance.get(`/api/comment/${id}`),

  update: (id, data) => axiosInstance.put(`/api/comment/${id}`, data),

  delete: (id) => axiosInstance.delete(`/api/comment/${id}`),
};
