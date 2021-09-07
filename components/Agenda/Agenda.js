import { Button } from "@chakra-ui/button";
import { getAuth, signOut } from "firebase/auth";

export default function Agenda() {
  const auth = getAuth();
  function logout() {
    signOut(auth);
  }
  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  );
}
