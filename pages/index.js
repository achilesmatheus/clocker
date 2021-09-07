import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Login from "../components/Login/Login";
import Agenda from "../components/Agenda/Agenda";
import { useState, useEffect } from "react";
import app from "./../config/firebase/index";

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: null,
  });

  useEffect(() => {
    const authentication = getAuth(app);
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
