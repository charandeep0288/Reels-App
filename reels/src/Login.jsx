import { useEffect } from "react";
import { auth, signInWithGoogle } from "./firebase";

let Login = (props) => {

    useEffect(() => {

        // jaab user login hota hai yaa logout hota hai tho yaa run hota hai
        auth.onAuthStateChanged( (user) => { 
            // if login -> user info
            // if logout -> user = null
            if(user){
                let {displayName, email } = user; // destructuring kar raha hai
                console.log(user);
                
                props.handlerUser({ displayName, email});
            } else {
                props.handlerUser(user);
            }
            // console.log(user);
        }); 
    }, []);

    return (
        <button
            type="submit"
            onClick={signInWithGoogle}
            className="btn btn-primary m-4"
        >
            Login With Google
        </button>
    );
};

export default Login;