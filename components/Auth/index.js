import React from "react";
import app from "./../../config/firebase/client";
import axios from "axios";

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
    return auth.currentUser;
  } catch (error) {
    console.log("LOGIN ERROR ", error);
  }
}

export async function signup({ email, password, username }) {
  console.log(email, username);
  try {
    // createUserWithEmailAndPassword(auth, email, password);
    const user = await login({ email, password });
    const token = await user.getIdToken();

    const { data } = await axios({
      method: "POST",
      url: "/api/profile",
      data: { username },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
