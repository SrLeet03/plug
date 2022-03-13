import React from 'react'
import './css/dashboard.css'
import { auth, db } from '../../firebase/firebase'
import { ref, child, get, getDatabase } from "firebase/database";
import { set, update, push } from "firebase/database";


export default function ListProfile({ data }) {

    const handleLikeChange = () => {

        const userId = data.userId;


        const postData = {
            username: data.username,
            profile_picture: data.profile_picture,
            status: data.status,
            likes: data.likes + 1,
            disLikes: data.disLikes,
            email: data.email
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/users/' + userId] = postData;

        try {
            update(ref(db), updates);
            alert('profile liked succesfully')
        } catch {
            console.log('error')
        }


    }

    const handleDisLikeChange = () => {

        const userId = data.userId;


        const postData = {
            username: data.username,
            profile_picture: data.profile_picture,
            status: data.status,
            likes: data.likes,
            disLikes: data.disLikes + 1,
            email: data.email
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/users/' + userId] = postData;

        try {
            update(ref(db), updates);
            alert('profile disliked succesfully')
        } catch {
            console.log('error')
        }


    }
    return (
        <div>
            <div class="col-md-4">
                <div class="card-content">
                    <div class="card-img">
                        <img src={data.profile_picture} alt="" />
                    </div>
                    <div class="card-desc">
                        <h3>{data.username}</h3>
                        <p>{data.status}</p>
                        <button onClick={() => handleLikeChange()} class="btn-card">Like</button>{' '}
                        <button onClick={() => handleDisLikeChange()} class="btn-card">DisLike</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
