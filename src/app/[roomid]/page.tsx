'use client'
import {useSearchParams} from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import ClientPusher from 'pusher-js'
import * as PusherTypes from 'pusher-js'

export default function RoomPage({ params }: { params: any }) {
  const searchParams = useSearchParams()
  const roomid = params.roomid;
  const username = searchParams?.get('username');
  const url = searchParams?.get('embed_url')??""

    const [chats, setChats] = useState<any[]>([]);
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([])

    const ref = useRef<any>()
    const inputRef = useRef<any>()

    const clientPusher = new ClientPusher(
        '7808c3403c700488c5a2',
        {
            authEndpoint: "api/pusher/auth",
            cluster: 'mt1',
            forceTLS: true,
            auth: { params: { username } }
        }
    );

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

    const handleClick = async (e: any) => {
        e.preventDefault()
        await fetch('/api/pusher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: inputRef.current.value,
                username,
                roomid
            })
        });
        inputRef.current.value = ""
    }

    useEffect(() => {
        ref.current.scrollIntoView(false);
    }, [chats])

    return (
        <div className="overflow-y-auto flex flex-col md:flex-row h-full w-full">
            <iframe className="w-full h-full" src={url} />
            <div className="overflow-y-auto flex flex-col h-full w-full md:w-[360px] bg-slate-50">
                <div className='p-3 bg-slate-100'>
                    <h4 className="text-sm font-medium leading-none">Users Online: {onlineUsersCount}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Room Id:
                    </p>
                    <p className=" select-all text-sm text-slate-500 dark:text-slate-400">
                        {roomid}
                    </p>
                </div>
                <div className="overflow-y-auto overflow-x-hidden h-full p-3 flex-col justify-end">
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
                    ${username === chat.username ? "bg-blue-400" : "bg-gray-400"}`}>
                                    <p className='overflow-x-hidden flex'>{chat.message}</p>
                                </div>
                            </div>
                        )

                    })}
                    <div ref={ref}></div>
                </div>
                <form onSubmit={handleClick} className='flex p-3 bg-slate-100'>
                    <Input ref={inputRef}/>
                </form>
            </div>
        </div>
    )
}

