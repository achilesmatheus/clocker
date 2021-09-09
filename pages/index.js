import Login from "./login";
import { useAuthentication } from "./../components/Auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function Home() {
  const [authentication] = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    authentication.user && router.push("/agenda");
  }, [authentication, router]);

  if (authentication.loading) return "Carregando";

  return <Login />;
}
