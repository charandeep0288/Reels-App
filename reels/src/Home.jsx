import { Redirect } from "react-router-dom";
import { auth } from "./firebase";

import {userContext} from "./App";
import { useContext } from "react";

import VideoCard from "./VideoCard";
import "./Home.css";

let Home = () => {
    // console.log(props.user ? "ture" : "false");

    // useContext -> hook hai ik yaa
    let value = useContext(userContext);

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
                </>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
}

export default Home;