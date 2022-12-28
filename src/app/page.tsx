import React from "react"
import { NextPage } from "next";
import CreateRoomForm from "./CreateRoomForm"

const Home = () => {
        
    return (
        <div className="w-screen flex items-center justify-center h-screen ">
            <CreateRoomForm />
        </div>
    );
};

export default Home;
