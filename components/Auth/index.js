import React from "react";
import app from "./../../config/firebase/client";

import {
  signInWithEmailAndPassword,
  setPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  browserSessionPersistence,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const Context = React.createContext([{}, () => {}]);

const auth = getAuth(app);

export async function login({ email, password }) {
  setPersistence(auth, browserSessionPersistence);

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("LOGIN ERROR ", error);
  }
}

// export async function signup({ email, password, username }) {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     await login();
//     //setupProfile(token, username)
//   } catch (error) {
//     console.log('SIGNUP ERRROR', error)
//   }
// }

export async function signup({ email, password, username }) {
  console.log(email, username);
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await login({ email, password });
    // const { data } = await axios({
    //   method: "POST",
    //   url: "/api/profile",
    //   data: {
    //     username: username,
    //   },
    //   headers: {
    //     Authentication: `Bearer ${user.getToken()}`,
    //   },
    // });
  } catch (error) {
    console.log("SIGNUP ERROR: ", error);
  }
}

export function logout() {
  signOut(auth);
}

export function useAuthentication() {
  const [authentication] = React.useContext(Context);
  return [authentication, { login, logout, signup }];
}

export function AuthProvider({ children }) {
  const [authentication, setAuthentication] = React.useState({
    loading: true,
    user: false,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthentication({
        loading: false,
        user,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <Context.Provider value={[authentication, setAuthentication]}>
      {children}
    </Context.Provider>
  );
}
