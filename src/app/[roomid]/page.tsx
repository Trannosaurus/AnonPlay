'use client'
import React from "react";
// import useSWR from 'swr'
import Chat from './Chat'
import Stream from './Stream'
import {useSearchParams} from 'next/navigation'


export default function RoomPage({params}: {params: any}){
    const searchParams = useSearchParams()
    const roomid = params.roomid;
    const username = searchParams.get('username');
    const url = searchParams.get('embed_url');
    console.log("URL>>>" + url)

    return <>
        <div className="flex w-screen h-screen items-center justify-center space-around">
        <Stream url={url}/>
        <Chat roomid={roomid} username={username}/>
        </div>
    </>
}

