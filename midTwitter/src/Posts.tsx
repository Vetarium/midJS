import { useState } from "react";
import { Header } from "./Header";
import { PostsData } from "./data";

export const Posts = () => {
    const [posts, setPosts] = useState(PostsData);
    const [editing, setEditing] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>('');
    const [newContent, setNewContent] = useState<string>('');

    function Like(id: number) {
        const updated = posts.map((post) => {
            if (id === post.id) {
                post.likes = post.likes + 1;
            }
            return post;
        });
        setPosts(updated);
    }

    function Dislike(id: number) {
        const updated = posts.map((post) => {
            if (id === post.id) {
                post.dislikes = post.dislikes + 1;
            }
            return post;
        });
        setPosts(updated);
    }

    function postDelete(id: number) {
        const updated = posts.filter(post => post.id !== id);
        setPosts(updated);
    }

    function startEdit(id: number, content: string) {
        setEditing(id);
        setEditedContent(content);
    }

    function saveEdit(id: number) {
        const updated = posts.map((post) => {
            if (id === post.id) {
                post.content = editedContent;
            }
            return post;
        });
        setPosts(updated);
        setEditing(null);
        setEditedContent('');
    }

    function cancelEdit() {
        setEditing(null);
        setEditedContent('');
    }

    function addNewPost() {
        const newPost = {
            id: posts.length + 1, 
            title: newTitle,
            content: newContent,
            likes: 0,
            dislikes: 0
        };
        setPosts([...posts, newPost]);
        setNewTitle('');
        setNewContent('');
    }

    return (
        <div className="container">
            <Header />
            <h1> Posts page</h1>
            <div>
                <h2>Add New Post</h2>
                <input 
                    type="text" 
                    value={newTitle} 
                    placeholder="Enter post title" 
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <br></br>
                <br></br>
                <textarea 
                    value={newContent} 
                    placeholder="Enter post content" 
                    onChange={(e) => setNewContent(e.target.value)} 
                />
                <br></br>
                <br></br>
                <button onClick={addNewPost}>Add Post</button>
            </div>

            <hr />

            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <div>{post.title}</div>
                    {editing === post.id ? (
                        <div>
                            <textarea 
                                value={editedContent} 
                                onChange={(e) => setEditedContent(e.target.value)} 
                            />
                            <button onClick={() => saveEdit(post.id)}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <div>{post.content}</div>
                    )}
                    <div>
                        <button onClick={() => Like(post.id)}>Like: {post.likes}</button>
                        <button onClick={() => Dislike(post.id)}>Dislike: {post.dislikes}</button>
                      
                        <button onClick={() => postDelete(post.id)}>Delete</button>
                        {editing === post.id ? (
                            <button onClick={cancelEdit}>Cancel</button>
                        ) : (
                            <button onClick={() => startEdit(post.id, post.content)}>Edit</button>
                        )}
                    </div>
                </div>
            ))}
            
        </div>
    );
};
