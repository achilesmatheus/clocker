import { Button } from "@chakra-ui/button";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useAuthentication } from "./../Auth";

export default function Agenda() {
  const [authentication, { logout }] = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    !authentication.user && router.push("/");
  }, [authentication, router]);

  if (authentication.loading) return "Carregando";

  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  );
}
