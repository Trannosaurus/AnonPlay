'use client'

import { useSearchParams } from 'next/navigation'
import React, { use, useState, useEffect, useRef } from "react";
// import useSWR from 'swr'
import * as PusherTypes from 'pusher-js'
import ClientPusher from 'pusher-js'
import axios from 'axios'


export default function RoomPage({params}: {params: any}){
    const roomid = params.roomid;

    const searchParams = useSearchParams()
    const username = searchParams.get('name');
    const src = searchParams.get('src');
    const iframeRef = useRef<HTMLIFrameElement>(null);



    // change the type of these later
    const [chats, setChats] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([])

    const clientPusher = new ClientPusher(
        process.env.NEXT_PUBLIC_key!,
        {
            authEndpoint: "api/pusher/auth",
            cluster: 'mt1',
            forceTLS: true,
            auth: {params: {username}}
        }
    );
    /* clientPusher.connection.bind('error', function (err: any) {
        if( err.error.data.code === 4004 ){
            console.log('Over Limit')
        }
    }) */

    useEffect(() =>{
        let mounted = true;
        if(mounted){
            const channel = clientPusher.subscribe('presence-' + roomid) as PusherTypes.PresenceChannel;

            // when someone subscribes to the channel
            channel.bind("pusher:subscription_succeeded", (members: any) => {
                setOnlineUsersCount(members.count);
                console.log("new user online")
            });

            channel.bind("pusher:member_added", (member: any) => {
                setOnlineUsersCount(channel.members.count);

                 setOnlineUsers(() => [
                    ...onlineUsers, 
                    member.username
                  ]);
                 setOnlineUsers((prevState) => [
                    ...prevState, 
                    {username: member.info.username}
                  ]);
            });

            channel.bind("chat-update", (data: any) => {
                const {message, username} = data;
                console.log("new message detected");

                setChats( (prevState) => [
                    ...prevState,
                    {username, message}
                ])
            })
        }
        return (() => {
            clientPusher.unsubscribe('presence-' + roomid)
            mounted = false;
        })
    },[])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log("making post")
        await fetch('/api/pusher',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                username,
                roomid
            })
        });
        /* await axios.post('/api/pusher', {
            message,
            username
        }) */
    }
    return <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="text-purple-500">There are {onlineUsersCount}</div>
            {chats.map((chat, id) => {
                return(
                    <div key={id}>
                        {chat.message}
                    </div>
                )

            })}
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e=>setMessage(e.target.value)} placeholder="enter a message" 
                className="border-2 border-gray-500 px-2 py-2 rounded-md text-black"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    </>
}

