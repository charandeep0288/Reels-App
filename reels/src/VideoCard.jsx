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
        };

        f();
    }, []);

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

            <span class="material-icons-outlined like">favorite_border</span>

            <span
                class="material-icons-outlined comment"
                onClick={() => {
                    // comment box koo open and close karna kaa lia
                    if (boxOpen)
                        setBoxOpen(false);
                    else
                        setBoxOpen(true);
                }}
            >chat_bubble</span>

            <p className="username">
                <b>{props.post.username}</b>
            </p>

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
                                <div key={index}>
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

            <p className="caption"></p>
        </div>
    );
};

export default VideoCard;