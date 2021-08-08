import { createContext, useState, useEffect } from "react";
import { auth, firestore } from "./firebase";

export const AuthContext = createContext();

let AuthProvider = ({children}) => {

    let [currentUser, setCurrentUser] = useState(null);

    let [loading, setLoading] = useState(true);


    useEffect(() => {

        // jaab user login hota hai, yaa logout hota hai tho yaa run hota hai onAuthStateChanged() fn
        let unsub = auth.onAuthStateChanged(async (user) => {
            // if login -> user info
            // if logout -> user = null
            if (user) {
                let { displayName, email, uid, photoURL } = user; // destructuring kar raha hai
                // console.log(user); //user kaa object display kar raha hai

                // jiss user naa login kia hai woo mara database mai hai ki nahi 
                // firestore uska reffernce laa kai ayi gaa
                let docRef = firestore.collection("users").doc(uid); 
                let document = await docRef.get(); // temp reffernce banaga agar user database mai exist nahi kartadocument -> refernce hai
                console.log(document.exist); //
                if(!document.exist){
                    docRef.set({
                        displayName,
                        email,
                        // posts: [],
                        photoURL,
                    });
                } 

                setCurrentUser({ displayName, email, uid, photoURL });
            } else {
                setCurrentUser(user);
            }
            // console.log(user);
            setLoading(false);
        });

        // cleanup
        return () => {
            unsub();
        }
    }, []);

    //jab user login yaa logout pura kr lega tab loading false ho jaigi


    return (
        <AuthContext.Provider value={currentUser}>

            {!loading && children}

        </AuthContext.Provider>
    )
}

export default AuthProvider;