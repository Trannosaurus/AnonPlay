import React from "react"
import { NextPage } from "next";
import CreateRoomForm from "./CreateRoomForm"

const Home = () => {
        
    return (
    <>
        <div className="w-screen flex flex-col items-center justify-center space-y-14 h-screen ">
            <div className="w-1/2"> Goto
                <a className="text-blue-400" href="https://www1.gogoanime.ar/">https://www1.gogoanime.ar/</a>
                and choose out an episode to watch, then paste it's link into the 
                episode url field and start watching!
                <br/>
                P.S. use an adblocker
            </div>
            <CreateRoomForm />
        </div>
    </>
    );
};

export default Home;
