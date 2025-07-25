import { UserCircle } from "phosphor-react";
import React, { useState, useEffect } from "react";

export default function ProfileCard() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUsername(parsed.username || "");
      } catch {
        setUsername("");
      }
    }
  }, []);

  return (
    <div className="w-5/6 h-24 bg-Snow drop-shadow-black gap-4 shadow-2xl flex justify-start items-center p-4 rounded-lg">
      <div className="size-16 rounded-full  flex justify-center items-center">
        {/*Aqui será o profile image do user*/}
        <UserCircle size={64} color="black"/>
      </div>
      <div className="w-1/6 xl:w-4/6 h-auto flex justify-start">
        <span className="text-MainText text-lg xl:text-xl">
          {username || "Usuário"}
        </span>
      </div>
    </div>
  );
}
