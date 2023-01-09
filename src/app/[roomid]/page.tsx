'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect, useRef } from "react";
// import useSWR from 'swr'
import * as PusherTypes from 'pusher-js'
import ClientPusher from 'pusher-js'

export default function RoomPage({params}: {params: any}){
    const roomid = params.roomid;

    const searchParams = useSearchParams()
    const name = searchParams.get('name');
    const src = searchParams.get('src');
    const iframeRef = useRef<HTMLIFrameElement>(null);



    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    const clientPusher = new ClientPusher(
        process.env.NEXT_PUBLIC_key!,
        {
            authEndpoint: "api/pusher/auth",
            cluster: 'mt1',
            forceTLS: true,
            auth: {params: {name}}
        }
    );

    useEffect(() =>{
        let mounted = true;
        if(mounted){
            // const channel = clientPusher.subscribe("presence-channel") 
            const channel = clientPusher.subscribe('presence-channel') as PusherTypes.PresenceChannel;

            channel.bind("pusher:subscription_succeded", (members: any) => {
                setOnlineUsersCount(members.count)
            });

            channel.bind("pusher:member_added", (member: any) => {
                setOnlineUsersCount(channel.members.count);

                 setOnlineUsers(() => [
                    ...onlineUsers, 
                    member.username
                  ]);
            });

            channel.bind("chat-update", (data: any) => {
                const {message, username} = data;

                setChats( prevState => {
                    return {
                        ...prevState,  
                    }
                })
            })
        }
    })

    return <>
        <div> howdy
            <div>Number of Online Users: {onlineUsersCount}</div>
           <iframe 
                ref={iframeRef}
                className="w-full aspect-video"
            
                //@ts-ignore
               src={src} allowFullScreen={true} 
           ></iframe>
        </div>
    </>
}
