import { Redirect } from "react-router-dom";
import { auth, firestore, storage } from "./firebase";

import {userContext} from "./App";
import { useContext, useState, useEffect } from "react";

import VideoCard from "./VideoCard";
import "./Home.css";

let Home = () => {
    // console.log(props.user ? "ture" : "false");

    // useContext -> hook hai ik yaa
    let value = useContext(userContext);

    let [ posts, setPosts ] = useState([]);

    useEffect(() => {

        firestore.collection("posts").get.then((querySnapshot) => {
            
            let arr = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                arr.push(doc.data());
            });

            setPosts(arr);
        });

        // firestore.collection("posts").onSnapshot((querySnapshot) => {
            
        //     let arr = [];
        //     querySnapshot.forEach((doc) => {
        //         console.log(doc.data());
        //         arr.push(doc.data());
        //     });

        //     setPosts(arr);
        // });
    }, []);

    console.log(value);
    
    return (
        // <h1>Home</h1>
        <div>
            {/* jabar dasti user aya idar home pai aya tho */}
            {/* {props.user ? "" : <Redirect /> } */}

            {value ? (
                <>
                    {/* <h1>{props.user.displayName}</h1>
                    <p>Email: {props.user.email}</p> */}

                    <div className="posts-container">
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        
                    </div>

                    <button class="logout-btn"
                        onClick={() => {
                            auth.signOut();
                        }}
                    >Logout</button>

                    {/* <button 
                        onClick={() => {
                            
                        }}
                    >Upload</button> */}
                    {/* https://codepen.io/adamlaki/pen/VYpewx */}

                    <input onChange={(e) => {

                        if(!e.target.files[0])
                            return;

                        // console.log(e.target); // input jaha change hua hai
                        // console.log(e.target.files[0]); // gives file 
                        // console.log(e.); // 

                        // get file nmae size and type
                        let { name, size, type } = e.target.files[0];

                        // store the selected file so that we can upload it later on 
                        let file = e.target.files[0];

                        // console.log(name);
                        // console.log(size/1000000); // to convert into mb
                        // console.log(type);

                        size = size/1000000; // ton convert size in mb

                        // get file type
                        type = type.split("/")[0];

                        // if(type == "video"){
                        //     alert("Please upload");
            
                        // } else if (size > 10){

                        // } else {

                             // jab file tori file upload hoti hai tho yaa chalta hai
                            // f1 function passed to state_chanded event for uplaod progess
                            // to see progress
                            let f1 = (snapshot) => {
                                console.log(snapshot.byteTransferred); // kitni file upload hui hai bytes mai
                                console.log(snapshot.totalBytes); // gives file size
                            }

                            // for errors
                            // f2 function passed to state_changed event for error handling
                            let f2 = (error) => {
                                console.log(error);
                            }

                            // f3 function passed to state_chanded event which executes when file is uploaded
                            // so that we can get the upload file url 
                            let f3 = () => {
                                // promise based fn, to get url of video
                                // getDownloadURL method is used to generate the url, it gives a promise 
                                let p = uploadtask.snapshot.ref.getDownloadURL.then();
                                p.then((url) => {
                                    console.log(url);

                                    // ik post add kar raha hai posts name ki collection mai
                                    firestore.collection("posts").add({
                                        uid: value.uid,
                                        username: value.name,
                                        url,
                                        likes: 0,
                                        comments: [],
                                        
                                    });
                                });
                                console.log(p);
                            }

                            // storage mai - iss path pai refernce , tho usma yaa path dal doo
                            // using the firebase storage object we are gitting refernce of a file locatoin
                            // in our case posts/userId/fileName and uploading our file to that location
                            let uploadtask = storage.ref(`/post${value.uid}/${name}`).put(file); // iss loction kaa refernce nikal lia. iss path kaa

                             // the upload method gives us uploadTask which can be used to set up
              //state_changed event
              //this takes 3 callbacks 
                            // upload hooo rahi hai file state change hoo rahi hai
                            uploadtask.on("state_changed", f1, f2, f3);

                           

                            // upload
                        // }
                    }} class="uploadoad-btn" 
                        type="file"/>
                </>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
}

export default Home;