import React from 'react';
import { PostPage } from './pages/post/PostPage';
import GetPost from './pages/post/GetPost';

export const routes = [
    {
        path: '/',
        element: <PostPage />,
    },
    {
        path: '/GetPost/:id',
        element: <GetPost />,
    },
];