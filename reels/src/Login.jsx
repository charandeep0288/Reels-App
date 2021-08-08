import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { auth, signInWithGoogle, firestore } from "./firebase";

import { AuthContext } from "./AuthProvider";

let Login = () => {

    // useContext -> hook hai ik yaa
    let value = useContext(AuthContext);

    console.log(value);

    // useEffect(() => {

    //     // jaab user login hota hai, yaa logout hota hai tho yaa run hota hai onAuthStateChanged() fn
    //     auth.onAuthStateChanged(async (user) => {
    //         // if login -> user info
    //         // if logout -> user = null
    //         if (user) {
    //             let { displayName, email, uid } = user; // destructuring kar raha hai
    //             // console.log(user); //user kaa object display kar raha hai

    //             // jiss user naa login kia hai woo mara database mai hai ki nahi 
    //             // firestore uska reffernce laa kai ayi gaa
    //             let docRef = firestore.collection("users").doc(uid); 
    //             let document = await docRef.get(); // temp reffernce banaga agar user database mai exist nahi kartadocument -> refernce hai
    //             console.log(document.exist); //
    //             if(!document.exist){
    //                 docRef.set({
    //                     displayName,
    //                     email,
    //                     posts: [],
    //                 });
    //             } 

    //             props.handlerUser({ displayName, email });
    //         } else {
    //             props.handlerUser(user);
    //         }
    //         // console.log(user);
    //     });
    // }, []);

    // this useEffect will run on each render
    useEffect(() => {
        // useContext -> hook hai ik yaa
        // let value = useContext(userContext);

        // console.log(value);
    });

    return (
        <div>
            {value ? <Redirect to="/home" /> : ""}

            <button
                type="submit"
                onClick={signInWithGoogle}
                className="btn btn-primary m-4"
            >
                Login With Google
            </button>

        </div>
    );
};

export default Login;