import { useState } from "react";


let VideoCard = () => {

    // for opening and closing of the comment box
    let [boxOpen, setBoxOpen] = useState(false);

    // for vedio play and pause
    let [playing, setPlaying] = useState(false);

    return (
        <div className="video-card">

            <video src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4"
            onClick={(e) => {
                // to play & pause the video
                if(playing){
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
                <b>@username</b>
            </p>

            <p className="song">
                <span class="material-icons-outlined">music_note</span>
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

                <div className="all-comments"></div>

                <div className="comment-form">
                    <input /> 
                    <button>Post</button>
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