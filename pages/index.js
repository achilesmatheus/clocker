import Login from "./login";
import { useAuthentication } from "./../components/Auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { getApps } from "firebase/app";

export default function Home() {
  const [authentication] = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    authentication.user && router.push("/agenda");
  }, [authentication, router]);

  if (authentication.loading) return "Carregando";

  console.log("APPS", getApps());

  return <Login />;
}
