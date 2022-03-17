import React, { useEffect , useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './css/loginForm.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index';


import { app } from '../../firebase/firebase';
import { getDatabase, ref, child, get, set } from "firebase/database";

import { GoogleAuthProvider } from "firebase/auth";


import { getAuth, signInWithPopup } from "firebase/auth";



export default function LoginForm() {

    const onFinish = values => {
        console.log('Received values of form: ', values);
        fetchuser();
    };

    useEffect(() => {

    }, []);

    const dispatch = useDispatch();
    const { getProfile } = bindActionCreators(actionCreators, dispatch);

    const [ username , setUsername ] = useState('')
    const [ pass , setPass ] = useState('')


    const provider = new GoogleAuthProvider();
    const history = useHistory();


    function gAuth() {


        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {


                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                const userId = result.user.uid;

                checkUserstatus(userId, user)
                    .then((result) => {
                        console.log("before register", userId)
                    }).catch((error) => {
                        console.log("faild to check status")
                    });


                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log('g error', error)
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }

    const checkUserstatus = async (userId, user) => {
        const dbRef = ref(getDatabase(app));

        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                localStorage.setItem('userid', userId);
                history.push("/dashboard");
                console.log("user already there", snapshot);
            } else {
                console.log("No data available");

                registerUser(userId, user);
                localStorage.setItem('userid', userId);

                setTimeout(() => {
                    history.push("/dashboard");
                }, 1000);
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    const registerUser = (userId, user) => {

        const db = getDatabase();
        try {
            set(ref(db, 'users/' + userId), {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
                likes: 0,
                disLikes: 0,
                status: 'Hi there,you are using plug!',
                pass : pass
            });
            console.log('registration done');
        } catch {
            console.log('err');
        }


    }

    const checkUserstatusforAnom = async ( user) => {
        const dbRef = ref(getDatabase(app));

        const userId = generateId(username);

        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                      
                if(snapshot.val().pass !== pass){
                   alert('Enter a valid password for this email id')
                   return;
                }
                

                localStorage.setItem('userid', userId);
                history.push("/dashboard");
                // console.log("user already there", snapshot , snapshot.val());
            } else {
                console.log("No data available");

                registerUserAnom( user);
                localStorage.setItem('userid', userId);

                setTimeout(() => {
                    history.push("/dashboard");
                }, 1000);
            }
        }).catch((error) => {
            console.error(error);
        });

    }


    const fetchuser = async (sitename) => {
        
        const url = 'https://randomuser.me/api/';
    
    
    
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
          },
        };
    
        return fetch(url, requestOptions)
          .then((res)=>res.json())
          .then((res) => {
           
            // console.log("results==== , ", res);
            checkUserstatusforAnom( res )
          })
          .catch((err) => {
              alert('failed to get you logged in')
            console.log("error", err);
          })
    
          
        
        }
    

    const registerUserAnom = (res) => {
        
        let user = res.results[0]; 

        const userId = generateId(username);
        const db = getDatabase();

        try {
            set(ref(db, 'users/' + userId), {
                username: user.name.first + " "+user.name.last,
                email: username,
                profile_picture: user.picture.medium,
                likes: 0,
                disLikes: 0,
                status: 'Hi there,you are using plug!',
                pass : pass
            });
            console.log('registration done');
            localStorage.setItem('userid', userId);
            history.push("/dashboard");

        } catch(e) {
            console.log('err' , e);
            alert('failed to get you logged in')
        }


      }



    const generateId = (str)=>{
         let ret = ""
         for(var i = 0;i<str.length ; i++){
              if(str[i] !=='@'&&str[i] !=='.'){
                  ret+=str[i];
              }
         }
         return ret ;
    }

    return (
        < div className='wrap-login'>

            <div>
                <div className="btn-google" href="" style={{ borderColor: 'orangered', borderRadius: '10px', borderWidth: '10px' }}>
                    <div className="google-content">
                        <div className="logo">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48">
                                <defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                                </defs><clipPath id="b"><use xlinkHref="#a" overflow="visible" /></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                                <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                            </svg>
                        </div>
                        <button
                            onClick={gAuth}
                            style={{ backgroundColor: '#FFF', border: 'none' }}><p style={{ marginTop: '10%' }}>Log in with Google</p></button>

                    </div>
                </div>
            </div>
            <br />
            <h2>Or Anonymous login</h2>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                     placeholder="Username" 
                     onChange={(e)=>{setUsername(e.target.value) }}
                     />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        onChange={(e)=>{setPass(e.target.value) }}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};
