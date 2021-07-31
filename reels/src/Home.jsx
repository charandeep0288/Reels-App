import { Redirect } from "react-router-dom";
import { auth } from "./firebase";

let Home = (props) => {
    console.log(props.user ? "ture" : "false");

    return (
        // <h1>Home</h1>
        <div>
            {/* jabar dasti user aya idar home pai aya tho */}
            {/* {props.user ? "" : <Redirect /> } */}

            {props.user ? (
                <>
                    <h1>{props.user.displayName}</h1>
                    <p>Email: {props.user.email}</p>
                    <button
                        onClick={() => {
                            auth.signOut();
                        }}
                    >Logout</button>
                </>
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    );
}

export default Home;