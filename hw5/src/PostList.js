import React, {useState} from "react";
import './PostList.css'
import {PostForm} from "./PostForm";

export function PostList({list, editPost, deleteOldPost}) {
    const [post, setPost] = useState(null);
    let noRepeatData = list.filter((post, index, arr) =>
        arr.findIndex(t => (t.id === post.id)) === index
    )

    const editOldPost = (post) =>{
        if (post){
            let currentPost = noRepeatData.find((e) => e.id ===post.id);
            currentPost = {id:currentPost.id, ...post}
            editPost(currentPost);
        }
    }
    const  addNewPost = (post) =>{
        if (post){
            editPost(post);
        }
    }

    const deletePost = (e) => {
        let currentId = e.parentElement.id
        deleteOldPost(currentId);
    }


    const submitForm = (post) =>{
        if(post && post.id !== null){
            editOldPost(post);
        }
        else if (post){
            addNewPost(post,'post')
        }

    }




    const findPost = (currentBtn) => {
        let currentPostId = currentBtn.closest('.post-wrapper').id;
        return currentPostId
    }
    const changePost = (e) => {
        let currentBtn = e.target;
        if (e.target.className === 'btn-delete') {
            deletePost(currentBtn)

        } else if (e.target.className === 'edit-btn') {
            handleEditPost(currentBtn)
        }
    }

    
    const handleEditPost = (e) => {
        let currentPostId = findPost(e);
        let currentPost = list.find((arr) =>arr.id === currentPostId);
        setPost({id:currentPost.id, title:currentPost.title, body:currentPost.body });

    }
    return (
        <div className="posts-wrapper">
            <PostForm oldPost={post} submitForm={submitForm}/>

            <div className='example' onClick={changePost}>{noRepeatData.map(data =>
                <div id={data.id} key={data.id} className="post-wrapper">
                    {typeof (data.title) == "string" ? <h1>{data.title}</h1> : <h1>{data.title.name}</h1>}
                    <p className='post-body'>{data.body}</p>
                    <div className="edit-btn">Edit</div>
                    <span className="btn-delete">X</span>
                </div>
            )}</div>
        </div>
    )
}
