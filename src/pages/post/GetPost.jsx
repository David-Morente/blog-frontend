import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPost } from '../../hooks/useGetPost';
import { useCreateComment } from '../../hooks/useCreateComment';

const GetPost = () => {
    const { id } = useParams();

    const { post, fetchPost, isLoading } = useGetPost(id);
    
    useEffect(() => {
        if (id) fetchPost(id);
      }, [id]);
    
    const list = Array.isArray(post.comments)
      ? post.comments
      : [];

    // Agregar un nuevo comentario
    const { registerComment, isLoadingComment } = useCreateComment();
    const [form, setForm] = useState({ username: '', content: '', post: id});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerComment(form);
        setForm({ username: '', content: '', post: id});
        fetchPost(id);
    };

    if (isLoading) {
        return (
        <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-primary" role="status" />
        </div>
        );
    }
      
    return (
        <div className="container py-5">
            <a href="/" className="back-link">
                <i className="fas fa-arrow-left"></i> Volver a todos los artículos
            </a>

            <div className="post-container">
                <div className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        <i className="far fa-calendar-alt"></i>
                        <span>
                            {new Date(post.date).toLocaleString('es-ES', {
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
                
                <div className="post-content">
                    <p>{post.content}</p>
                </div>
            </div>

            <div className="comments-container">
                <h3 className="comments-title">Comentarios ({list.length})</h3>
                
                {list.map(comment => (
                    <div key={comment._id} className="comment">
                        <div className="comment-header">
                            <div className="comment-author">
                                <i className="far fa-user"></i>
                                <span>{comment.username}</span>
                            </div>
                            <div className="comment-date">
                                <i className="far fa-clock"></i>
                                <span>
                                    {new Date(comment.date).toLocaleString('es-ES', {
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
                        <p className="comment-text">{comment.content}</p>
                    </div>
                ))}
                
                <div className="add-comment">
                    <h4>Deja un comentario</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username"
                                name="username" 
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Comentario</label>
                            <textarea
                                className="form-control" 
                                id="content"
                                name="content"
                                rows="4"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="Escribe tu comentario aquí..."
                            ></textarea>
                        </div>
                        
                        <button
                            disabled={isLoadingComment}
                            type="submit"
                            className="btn btn-primary"
                        >
                            {isLoadingComment ? 'Guardando...' : 'Publicar comentario'}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};


export default GetPost;