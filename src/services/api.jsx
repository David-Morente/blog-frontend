import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/learningBlog/v1/',
    timeout: 1000,
});

export const getPostByFilter = async (category = 'all', order = 'desc') => {
    return apiClient.get('postByFilter', {
        params: { category, order }
    });
}

export const getPosts = async => {
    return apiClient.get('post/getPosts');
}

export const getPostById = async (postId) => {
    return apiClient.get(`post/getPostById/${postId}`);
}

export const getLatestComment = async (postId) => {
    return apiClient.get(`comment/getLatestComment/${postId}`);
}

export const getComments = async => {
    return apiClient.get('comment/getComments');
}

export const createComment = async (data) => {
    return apiClient.post('comment/createComment', data);
}