import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Login from "../components/Login/Login";
import Agenda from "../components/Agenda/Agenda";
import { useState, useEffect } from "react";
import { firebaseClient } from "./../config/firebase/client";

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: null,
  });

  useEffect(() => {
    const authentication = getAuth(firebaseClient);
    onAuthStateChanged(authentication, (user) => {
      setAuth({
        loading: false,
        user,
      });
    });
  }, []);

  if (auth.loading) return "Carregando";

  return auth.user ? <Agenda /> : <Login />;
}
