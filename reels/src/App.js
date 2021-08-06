import { createContext, useEffect, useState } from "react";
import { firestore } from "./firebase";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context Api use ki hai yaa
let userContext = createContext();

function App() {

  let [user, setUser] = useState(null);

  // useEffect(() => {
  //   let f = async () => {
  //     let querySnapshot = await firestore
  //       .collections("posts")
  //       .limit(5) // limit kitna posts manga sakta hai ik bar mai
  //       .order("index", "asc") // sort karka daa raha hai acs order mai "asc" pre defined keyword hai & we have "desc"
  //       .get();
  //     querySnapshot.forEach((doc) => console.log(doc.data()));
  //   };

  //   f();
  // }, []);



  return (
    <div>
      {/* This is condional Rendering  */}
      {/* {(user) ? <Home user={user} /> :<Login handlerUser={setUser}/>} */}

      {/* React fragement */}
      <>
        <Router>
          <userContext.Provider value={user}>
          <Switch>
            
            <Route path="/home">
              <Home />
            </Route>

            <Route path="/">
              <Login handlerUser={setUser} />
            </Route>
            
          </Switch>
          </userContext.Provider>
        </Router>
      </>
    </div>
  );
}

export { userContext };

export default App;
