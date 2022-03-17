import React , {useEffect , useState} from 'react'

import { auth, db } from '../../firebase/firebase'
import { ref, child, get, getDatabase } from "firebase/database";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index';
import { Button } from 'antd';
import { signOutWithGoogle } from '../../firebase/gauth';
import { Redirect, useHistory } from 'react-router-dom'



export default function UserShowProfile(prop) {

    const [userData , setUserData] = useState({})

    useEffect(() => {
        const userId = localStorage.getItem('userid');
        fetchUser(userId);
    }, []);

    const dispatch = useDispatch() ; 


    const {getProfile} = bindActionCreators( actionCreators, dispatch) ; 
    
    
    const fetchUser = (userId) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {

              setUserData(snapshot.val())
              prop.helper(snapshot.val())
              getProfile(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
   
   const handleChange = () =>{
       prop.handleChange();
   }

   const history = useHistory();


   const handleLogout = () =>{
    signOutWithGoogle() ; 
    localStorage.setItem('userid' , "");
    history.push("/login");
  }

    return (
        <div>
            <Button style={{marginLeft:'80%'}} onClick={handleLogout} type="primary">Logout</Button>

            <h2>Little about Yourself</h2>

            <p><strong>name : {userData.username}</strong></p>
            <p><strong>email : {userData.email}</strong></p>
            <p><strong>status : {userData.status}</strong></p>


            <h2>What is Your Polularity?</h2>

            <ol>
                <li>likes : {userData.likes}</li>
                <li>Dislikes : {userData.disLikes}</li>
            </ol>
            <br/><br/>

            <Button style={{marginLeft:'40%'}} onClick={handleChange} type="primary">Update Profile</Button>
            <br/>
            <br/>
            <h2>User's Profiles</h2>
        </div>
    )
}
