import React , {useState} from 'react'
import './css/dashboard.css'
import { auth, db } from '../../firebase/firebase'
import { ref, child, get, getDatabase } from "firebase/database";
import { set, update, push } from "firebase/database";
import {
    LikeOutlined , DislikeOutlined 
,LoadingOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom'
  

export default function ListProfile({ data , cng }) {

    const [state , setSate] = useState(false) ; 

    const history = useHistory();

    const handleLikeChange = () => {

        const userId = data.userId;
        setSate(true) ; 


        const postData = {
            username: data.username,
            profile_picture: data.profile_picture,
            status: data.status,
            likes: data.likes + 1,
            disLikes: data.disLikes,
            email: data.email,
            pass : data.pass
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/users/' + userId] = postData;

        try {
            cng()

            update(ref(db), updates);

            setTimeout(() => {
                alert('profile liked succesfully')
                location.reload();
                setSate(false)    
                }, 2000);
    
        } catch {
            console.log('error')
        }


    }

    const handleDisLikeChange = () => {
        setSate(true) ; 
        const userId = data.userId;


        const postData = {
            username: data.username,
            profile_picture: data.profile_picture,
            status: data.status,
            likes: data.likes,
            disLikes: data.disLikes + 1,
            email: data.email,
            pass : data.pass
        };

        

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/users/' + userId] = postData;

        try {
            cng()

            update(ref(db), updates);

            setTimeout(() => {
            alert('profile disliked succesfully')
            location.reload();
            }, 2000);
        } catch {
            console.log('error')
        }


    }
    return (
        <div>
             
                
             <div className="col-md-4">
                <div className="card-content">
                    <div className="card-img">
                        <img src={data.profile_picture} alt="" />
                    </div>
                    <div className="card-desc">
                        <h3>{data.username}</h3>
                        <p>{data.status}</p>
                        <button onClick={() => handleLikeChange()} className="btn-card"><LikeOutlined /></button>{' '}
                        <button onClick={() => handleDisLikeChange()} className="btn-card"><DislikeOutlined /></button>
                    </div>
                </div>
            </div>
             
            
        </div>
    )
}
