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

            <div className="filter-container">
                <div className="filter-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filtrar publicaciones
                </div>
                
                    <div className="filter-options">
                        <div className="category-filters">
                            <button className="filter-btn active" data-category="all">Todos</button>
                            <button className="filter-btn" data-category="taller">Taller</button>
                            <button className="filter-btn" data-category="tecnologia">Tecnología</button>
                            <button className="filter-btn" data-category="practica">Práctica Supervisada</button>
                        </div>
                        
                        <div className="sort-options">
                            <button className="sort-btn active" data-sort="desc">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 16 4 4 4-4"></path>
                                    <path d="M7 20V4"></path>
                                    <path d="M11 4h4"></path>
                                    <path d="M11 8h7"></path>
                                    <path d="M11 12h10"></path>
                                </svg>
                                Más recientes
                            </button>
                            <button className="sort-btn" data-sort="asc">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 8 4-4 4 4"></path>
                                    <path d="M7 4v16"></path>
                                    <path d="M11 12h4"></path>
                                    <path d="M11 16h7"></path>
                                    <path d="M11 20h10"></path>
                                </svg>
                                Más antiguos
                            </button>
                        </div>
                    </div>
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
