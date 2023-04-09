'use client'

import React, { useState, useEffect, useRef } from "react";
import ClientPusher from 'pusher-js'
import * as PusherTypes from 'pusher-js'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"


export default function Chat({ roomid, username }: { roomid: any, username: any }) {
    const inputRef = useRef<HTMLInputElement>(null)

    // change the type of these later
    const [chats, setChats] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([])
    const dummy = useRef<any>()

    const clientPusher = new ClientPusher(
        '7808c3403c700488c5a2',
        {
            authEndpoint: "api/pusher/auth",
            cluster: 'mt1',
            forceTLS: true,
            auth: { params: { username } }
        }
    );
    /* clientPusher.connection.bind('error', function (err: any) {
        if( err.error.data.code === 4004 ){
            console.log('Over Limit')
        }
    }) */

    useEffect(() => {
        let mounted = true;
        if (mounted) {
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
                    { username: member.info.username }
                ]);
                setChats((prevState) => [
                    ...prevState,
                    { username: "bot", message: `${member.info.username} joined` }
                ])
            });

            channel.bind("chat-update", (data: any) => {
                const { message, username } = data;
                console.log("new message detected");

                setChats((prevState) => [
                    ...prevState,
                    { username, message }
                ])
            })
        }
        return (() => {
            clientPusher.unsubscribe('presence-' + roomid)
            mounted = false;
        })
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await fetch('/api/pusher', {
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
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }
    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )
    return (
        <div className="relative">
            <div className="m-2 space-y-1">
                <h4 className="text-sm font-medium leading-none">Users Online: {onlineUsersCount}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Room Id:
                </p>
                <p className=" select-all text-sm text-slate-500 dark:text-slate-400">
                    {roomid}
                </p>
            </div>

            <ScrollArea className="h-4/6 w-full rounded-md border border-slate-100 dark:border-slate-700">
                <div className="p-4">
                    {chats.map((chat, id) => {
                        if (chat.username === "bot") {
                            return (
                                <p className="text-center m-2 text-gray-400" key={id}>{chat.message}
                                </p>
                            )
                        }
                        return (
                            <div className={`flex flex-col items-start w-fit m-2 mb-6
                ${username === chat.username ? "ml-auto items-end" : "items-start"}
                `}
                                key={id}>
                                <p className={`px-2 
                    ${username === chat.username}`}>
                                    {chat.username}
                                </p>
                                <div className={`px-3 py-2 rounded-lg max-w-xs w-fit 
                    ${username === chat.username ? "bg-blue-400" : "bg-gray-600"}`}>
                                    <p>{chat.message}</p>
                                </div>
                            </div>
                        )

                    })}
                    <div ref={dummy}></div>
                </div>
            </ScrollArea>
            <form className="" onSubmit={handleSubmit}>
                <div className="grid w-full gap-2">
                    <input type="text" onChange={e => setMessage(e.target.value)}
                        ref={inputRef}
                        placeholder="Enter a message"
                        className="m-4 outline-none bg-transparent border-slate-400 border-b-4 hover:border-white duration-300"
                    />
                    <Button className="" type="submit">Send message</Button>
                </div>
            </form>

        </div>
    )
}