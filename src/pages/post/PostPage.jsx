import React, { useEffect } from 'react';
import { useGetPosts } from '../../hooks/useGetPosts.jsx';
import { Link } from "react-router-dom";

export const PostPage = () => {
    const { posts, fetchPosts, isLoading } = useGetPosts();

    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]);

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      );
    }
    
    const list = Array.isArray(posts)
      ? posts
      : [];
    return (
        
        <div className="container py-5">
        <div className="row">
            <div className="col-12 mb-4">
                <h1 className="display-6 mb-4">Publicaciones</h1>
            </div>

            {list.map(item => (
                <div key={item._id} className="col-md-6 col-lg-4">
                    <Link to={`/GetPost/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                {item.title}
                                </h5>
                                <div className="post-meta">
                                    <i className="far fa-calendar-alt"></i>
                                    <span>
                                    {new Date(item.date).toLocaleString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                    </span>
                                </div>
                                <p className="card-text">{item.content}</p>
                                <span className="badge text-bg-dark">Curso: {item.courseCategory}</span>
                                {
                                    item.lastComment != null ? (
                                        <div className="comment-section">
                                            <div className="comment-header">
                                                <div className="comment-author">
                                                    <i className="far fa-comment"></i>
                                                    <span>{item.lastComment.username}</span>
                                                </div>
                                                <div className="comment-date">
                                                    <i className="far fa-clock"></i>
                                                    <span>
                                                        {new Date(item.lastComment.date).toLocaleString('es-ES', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="comment-text">{item.lastComment.content}</p>
                                        </div>
                                    ) : (
                                        <div className="comment-section">
                                            <p className="comment-text">No hay comentarios</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Link>
                </div>  
              ))}

        </div>
    </div>
    );
};
