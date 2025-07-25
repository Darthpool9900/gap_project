import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileCard from "../components/cards/ProfileCard";

export default function Layout() {
  return (
    <div className="w-screen h-screen flex justify-start item">
        <nav className="w-1/5 h-screen bg-BlueWhale flex flex-col items-center">
            <ul className="w-full h-4/5 flex flex-col justify-center items-center text-xl xl:text-2xl gap-8 text-Snow">
                <li className="w-full h-auto text-center p-2 transition-colors hover:bg-blue-500 cursor-pointer">
                    <Link to={"/home"}>Home</Link>
                </li>
                <li className="w-full h-auto text-center p-2 transition-colors hover:bg-blue-500 cursor-pointer">
                    <Link to={"/agents_user"}>My agents</Link>
                </li>
                <li className="w-full h-auto text-center p-2 transition-colors hover:bg-blue-500 cursor-pointer">
                    <Link to={"/user_chats"}>My chats</Link>
                </li>
                <li className="w-full h-auto text-center p-2 transition-colors hover:bg-blue-500 cursor-pointer">
                    <Link to={"/"}>Configurations</Link>
                </li>
            </ul>
            <ProfileCard/>
        </nav>
      <Outlet/>
    </div>
  );
}
