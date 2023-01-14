'use client'

import React, { useState, useEffect, useRef } from "react";
import ClientPusher from 'pusher-js'
import * as PusherTypes from 'pusher-js'

export default function Chat({roomid, username}: {roomid: any, username: any}){
    const inputRef = useRef<HTMLInputElement>(null)

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
                setChats( (prevState) => [
                    ...prevState,
                    {username: "bot", message: `${member.info.username} joined`}
                ])
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
        inputRef!.current!.value = "";
    }
    return(
    <div className="w-1/5 h-screen relative">
        <div className="p-2 border-b-2 border-gray-600">
            <p className="m-2 text-2xl font-semibold inline">AnonPlay</p>
            <p className="ml-8 inline text-purple-500 ">Users Online: {onlineUsersCount}</p><br/>
            <div className="m-2">
                <p className="px-2 select-all inline">Room Id: </p>
                <p className="px-s select-all bg-gray-600 rounded-md inline">{roomid}</p>
            </div>
        </div>
        <div className="h-4/5 overflow-auto">
            {chats.map((chat, id) => {
                if(chat.username === "bot"){
                    return(
                    <p className="text-center m-2 text-gray-400">{chat.message}
                    </p>

                    )
                }
                return(
                <div className={`flex flex-col items-start w-fit m-2 mb-6
                ${username===chat.username ? "ml-auto items-end": "items-start"}
                `}
                key={id}>
                    <p className={`px-2 
                    ${username===chat.username }`}>
                    {chat.username}
                    </p>
                    <div className={`px-3 py-2 rounded-lg max-w-xs w-fit 
                    ${username===chat.username? "bg-blue-400": "bg-gray-600"}`}>
                        <p>{chat.message}</p>
                    </div>

                </div>
                )

            })}
        </div>
        <form className="w-full bg-gray-600 flex justify-around rounded-lg bottom-0 absolute"onSubmit={handleSubmit}>
            <input type="text" onChange={e=>setMessage(e.target.value)} 
            ref={inputRef}
            placeholder="Enter a message"
            className="m-4 outline-none bg-transparent border-slate-400 border-b-4 hover:border-white duration-300"
            />
            <button type="submit">Send</button>
        </form>

    </div>
    )
}
