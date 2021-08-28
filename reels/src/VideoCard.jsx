import { getDatabase, ref } from "./firebase";

import { useContext, useState, useEffect } from "react";
import { firestore } from "./firebase";

import { AuthContext } from "./AuthProvider";

let VideoCard = (props) => {

    // for opening and closing of the comment box
    let [boxOpen, setBoxOpen] = useState(false);

    // for video play and pause
    let [playing, setPlaying] = useState(false);

    let [currentUserComment, setCurrentUserComment] = useState("");
    let [allComments, setAllComments] = useState([]);
    let [currentUserLike, setCurrentUserLike] = useState(false);

    let [currentUserFollowing, setCurrentUserFollowing] = useState(false);
    let [followers, setFollowers] = useState([]);
    let [following, setFollowing] = useState([]);
    // let [currentUserCaption, setCurrentUserCaption] = useState("");

    let value = useContext(AuthContext);

    useEffect(() => {
        let f = async () => {
            let allCommentId = props.post.comments;
            let arr = [];

            for (let i = 0; i < allCommentId.length; i++) {
                let id = allCommentId[i];

                let doc = await firestore.collection("comments").doc(id).get();
                let commentData = { ...doc.data(), id: doc.id };
                arr.push(commentData);
            };
            setAllComments(arr);

            let isUserLikedPersent = props.post.likes.filter((id) => {
                return id === value.uid;
            });
            // console.log(isUserLikedPersent);

            if (isUserLikedPersent[0] === value.uid) {
                console.log(isUserLikedPersent);
                setCurrentUserLike(true);
            }
        };

        f();
    }, [props]);

    return (
        <div className="video-card">

            <video
                src={props.post.url}
                onClick={(e) => {
                    // to play & pause the video
                    if (playing) {
                        setPlaying(false);
                        e.currentTarget.pause();
                    } else {
                        setPlaying(true);
                        e.currentTarget.play();
                    };
                }}
            ></video>

            {!currentUserLike ?
                <div>
                    <span
                        onClick={() => {
                            // e.currentTarget.classList = "material-icons-outlined";
                            setCurrentUserLike(true);
                            // allLikes = ;

                            // setAllLikes(value.uid);

                            firestore
                                .collection("posts")
                                .doc(props.post.id)
                                .update({
                                    likes: [...props.post.likes, value.uid],
                                });


                        }}

                        class="material-icons-outlined like">favorite_border
                    </span>
                </div>
                :
                <div>
                    <span
                        onClick={() => {
                            setCurrentUserLike(false);

                            let isUserLikedPersent = props.post.likes.filter((id) => {
                                return id !== value.uid;
                            });

                            firestore
                                .collection("posts")
                                .doc(props.post.id)
                                .update({
                                    likes: isUserLikedPersent,
                                });

                            console.log(isUserLikedPersent);

                        }}
                        class="material-icons-outlined liked">
                        favorite
                    </span>
                </div>

            }
            <p className="post-like-count">{props.post.likes.length}</p>

            <span
                class="material-icons-outlined comment"
                onClick={() => {
                    // comment box koo open and close karna kaa lia
                    if (boxOpen)
                        setBoxOpen(false);
                    else
                        setBoxOpen(true);
                }}
            >mode_comment</span>

            <p className="username">
                <b>{props.post.username}</b>
            </p>

            {!currentUserFollowing ?
                <>
                    <button
                        onClick={() => {
                            // console.log(value.follow)
                            setCurrentUserFollowing(true);
                            // setFollowing(value.uid);
                            console.log(value.uid);
                            firestore
                                .collection("users")
                                .doc(value.uid)
                                .update({
                                    following: [...value.following, value.uid],
                                });
                        }}

                        className="follow-btn">
                        Follow
                    </button>
                </>
                :
                <>
                    <button
                        onClick={async () => {
                            // console.log(value.follow)
                            setCurrentUserFollowing(false);

                            console.log(value.uid);
                            let docRef = firestore.collection("users").doc(value.uid);
                            let document = await docRef.get();
                            
                            console.log(document.exists);
                            console.log(document); 
                            console.log(await getDatabase.users.doc(value.uid).get());

                            // const ans = getDatabase.users.doc(value.uid).onSnapshot((doc) => {
                            //     return doc;
                            // });
                            // console.log(ans);                        


                            // let isUserfollowing = document.following.filter((id) => {
                            //     return id !== value.uid;
                            // });

                            // firestore
                            // .collection("users")
                            // .doc(value.uid)
                            // .update({
                            //     following: [isUserfollowing],
                            // });
                        }}
                        className="follow-btn">
                        Following
                    </button>
                </>
            }

            <p className="song">
                <span className="material-icons-outlined">music_note</span>
                {/* woo song kaa text gol gol guma gaa issa                 */}
                <marquee>Yaar Anmulla</marquee>
            </p>

            {boxOpen ? (
                <div className="comment-box">
                    <button
                        className="comment-box-close-btn"
                        onClick={() => {
                            setBoxOpen(false);
                        }}
                    >Close</button>

                    <div className="all-comments">

                        {allComments.map((comment, index) => {
                            return (
                                <div key={index} className="comment-container">
                                    <img className="comment-profile-img" src={comment.pic} />
                                    <div>
                                        <p>
                                            <b>{comment.username}</b>
                                        </p>
                                        <p className="inner-comment">{comment.comment}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="comment-form">
                        <input
                            type="text"
                            value={currentUserComment}
                            onChange={(e) => {
                                setCurrentUserComment(e.currentTarget.value);
                            }}
                        />

                        <button onClick={() => {
                            let p = firestore.collection("comments").add({
                                comment: currentUserComment,
                                username: value.displayName,
                                pic: value.photoURL,

                            });

                            setCurrentUserComment("");

                            p.then(docRef => {
                                return docRef.get();
                            }).then(doc => {
                                firestore
                                    .collection("posts")
                                    .doc(props.post.id)
                                    .update({
                                        comments: [...props.post.comments, doc.id],
                                    });
                            });
                        }}
                        >Post</button>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div
                // onKeyDown={(e) => {
                //     if(e.code === "shift + Enter" && e.code === "Enter")
                //     console.log(e.currentTarget.innerText);
                //     setCurrentUserCaption(e.currentTarget.innerHTML);
                // }}
                className="caption" >Add Caption</div>
        </div>
    );
};

export default VideoCard;