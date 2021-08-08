import { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { firestore } from "./firebase";


let Profile = () => {

    let value = useContext(AuthContext);
    let [totalPosts, setTotalPosts] = useState(0);

    console.log(value);

    useEffect(() => {
        let f = async () => {
            let querySnapshot = await firestore
                .collection
                .where("username", "==", value.displayName)
                .get();

            console.log("size", querySnapshot.size);
            setTotalPosts(querySnapshot);
        };

        f();
    }, []);


    return (
        <>
            { value ? (
                <div>
                    <img src={value.photoURL} alt="User Post"/>
                    <p className="username-profile">{value.displayName}</p>
                    <p className="ttpost">Total Posts: {totalPosts}</p>
                </div>
            ) : (
                <Redirect to="/login" />
            )}
        </>
    )
}

export default Profile;