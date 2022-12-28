import React from "react"
import { NextPage } from "next";
import CreateRoomForm from "./CreateRoomForm"

const Home = () => {
        
    return (
    <>
        <div> Goto
            <a href="https://www1.gogoanime.ar/"></a>
            and choose out an episode to watch, then paste it's link into the 
            episode url field and start watching!
            <br/>
            P.S. use an adblocker
        </div>
        <div className="w-screen flex items-center justify-center h-screen ">
            <CreateRoomForm />
        </div>
    </>
    );
};

export default Home;
