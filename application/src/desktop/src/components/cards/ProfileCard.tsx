import { useState, useEffect } from "react";
import { ProfileCard as NewProfileCard } from "../ui";

export default function ProfileCard() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUsername(parsed.username || "");
        setEmail(parsed.email || "");
      } catch {
        setUsername("");
        setEmail("");
      }
    }
  }, []);

  return (
    <NewProfileCard
      name={username || "Usuário"}
      email={email || "usuario@email.com"}
      role="Membro"
    />
  );
}
