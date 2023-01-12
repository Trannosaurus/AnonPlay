import React from "react";
// import useSWR from 'swr'
import Chat from './Chat'
import Stream from './Stream'


export default function RoomPage({params}: {params: any}){
    const roomid = params.roomid;

    return <>
        <div className="flex items-center justify-center space-around">
        <Stream />
        <Chat roomid={roomid}/>
        </div>
    </>
}

