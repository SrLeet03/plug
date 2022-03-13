import React, { useEffect, useState } from 'react'
import './css/updatefile.css'
import { Input } from 'antd';
import { Button } from 'antd';
import { getDatabase, ref, child, get, set, update, push } from "firebase/database";
import { db } from '../../firebase/firebase';
import { Redirect, useHistory } from 'react-router-dom'


export default function UserUpdateprofile({ original, handleChange1 }) {

    useEffect(() => {
        var loadFile = function (event) {
            var image = document.getElementById("output");
            image.src = URL.createObjectURL(event.target.files[0]);
        };
    }, [])

    const [user, setUser] = useState({});
    const [userStatus, setUserstatus] = useState(original.status);
    const [username, setUsername] = useState(original.username);
    const [userPic, setUserpic] = useState(original.profile_picture);
    const history = useHistory();

    const submitUpdate = async () => {

        const userId = localStorage.getItem('userid')


        const postData = {
            username: username,
            profile_picture: userPic,
            status: userStatus,
            likes: original.likes,
            disLikes: original.disLikes,
            email: original.email
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/users/' + userId] = postData;

        try {
            update(ref(db), updates);
            alert('data updated!')
            handleChange1();
        } catch {
            console.log('error')
        }

    }

    return (

        <div>
            <div className="profile-pic11">
                <label className="-label" for="file">
                    <span className="glyphicon glyphicon-camera"></span>
                    <span>Change Image</span>
                </label>
                {/* <input id="file" type="file" value={userPic} onChange={(e)=>{setUserpic(e.target.value)}}/> */}
                <img src={userPic} id="output" width="200" />
            </div>
            <br /><br />
            <div style={{ marginLeft: '5%', maxWidth: '50%' }}>
                <Input placeholder="your name" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <br /><br /><br />
                <Input placeholder="status" value={userStatus} onChange={(e) => { setUserstatus(e.target.value) }} />
                <br />

            </div>
            <br />

            <Button onClick={submitUpdate} type="primary">Update</Button>
            <br /><br />
            <br /><br />

            <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js'></script>
            <script src="./script.js"></script>
        </div>
    )
}
