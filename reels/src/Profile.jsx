import { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { firestore } from "./firebase";
import VideoCard from "./VideoCard";


import "./Profile.css";

let Profile = () => {

    let value = useContext(AuthContext);
    let [totalPosts, setTotalPosts] = useState(0);

    // console.log(value);

    let [posts, setPosts] = useState([]);

    useEffect(() => {
        let f = async () => {
            let querySnapshot = await firestore
                .collection("posts")
                .where("uid", "==", value.uid)
                .get();

            let arr = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                arr.push({ ...doc.data(), id: doc.id });
            });
            // console.log("size", querySnapshot.size);
            setTotalPosts(querySnapshot.size);
            setPosts(arr);
        };

        f();
    }, []);


    return (
        <>
            {value ? (
                <>
                    <div>
                        <img className="profile-img" src={value.photoURL} alt="User Post" />
                        <p className="username-profile" >{value.displayName}</p>
            
                        <div>
                            <p className="ttpost-count">{totalPosts}</p>
                            <p className="ttpost">Posts</p>
                        </div>

                    </div>
                    
                    <hr />

                    <div className="user-posts">
                        {
                            // console.log(posts)
                            posts.map((post, index) => {
                                console.log("1");
                                console.log(post);
                                return <VideoCard class="user-posts" key={index} post={post} />
                            })
                        }
                    </div>
                </>
            ) : (
                <Redirect to="/login" />
            )}
        </>
    );
};

export default Profile;