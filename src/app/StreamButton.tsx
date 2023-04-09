'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { useToast } from "@/hooks/ui/use-toast"

export default function StreamButton() {
    const {toast} = useToast()
    const [path, setPath] = useState("")
    const [name, setName] = useState("")
    const [embed_url, setURL] = useState("")
    const linkRef = useRef<any>();
    const joinNameRef = useRef<any>();
    const createNameRef = useRef<any>();
    const roomIdRef = useRef<any>();

    const handleJoin = async (e: any) => {
        e.preventDefault()
        let url;
        try{
            const roomid = roomIdRef.current.value
            url = `api/hyperbeam?roomid=${roomIdRef.current.value}`
        }catch {
            url = "api/hyperbeam"
        }
        const res = await fetch(url,
            {
                method: 'POST',
            }
        )
        const data = await res.json()
        const { session_id, embed_url } = data
        if (session_id) {
            try{
                const name = joinNameRef.current.value
                setName(name)
            }catch{
                const name = createNameRef.current.value
                setName(name)
            }
            setPath(session_id)
            setURL(embed_url)
        } else {
            const {code} = data
            if(code == "err_exceeded_vm_limit"){
                toast({
                    title: "Uh oh! Our Servers are at max capacity.",
                    description: "Please come back later when we have more resources.",
                })
            }else{
                toast({
                    title: "Uh oh! The Room-Id you entered was wrong",
                    description: "Try checking it again.",
                })
            }
        }
    }
    useEffect(() => {
        if (embed_url) {
            linkRef.current.click()
        }
    })
    return (
        <>
            <Link
                ref={linkRef}
                href={{
                    pathname: `${path}`,
                    query: {
                        username: `${name}`,
                        embed_url: `${embed_url}`
                    }
                }}
            >

            </Link>
            <div className="my-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 rounded-lg p-2 mr-3">
                            Stream Now
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px]">
                        <Tabs defaultValue="Create" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="Create">Create a Room</TabsTrigger>
                                <TabsTrigger value="Join">Join a Room</TabsTrigger>
                            </TabsList>
                            <TabsContent value="Create">
                <form onSubmit={handleJoin}>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Enter your name and create a room. Then, share the room-id with your friends.
                                </p>
                                <div className="grid gap-2 py-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Name</Label>
                                        <Input required ref={createNameRef} id="name" placeholder="Your Name" />
                                    </div>
                                </div>
                                <div className="flex">
                                    <Button>Create Room</Button>
                                </div>
                </form>
                            </TabsContent>
                            <TabsContent value="Join">
                <form onSubmit={handleJoin}>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Join the room by entering your name and the room ID below to start your personalized streaming experience
                                </p>
                                    <div className="grid gap-2 py-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="Join">Name</Label>
                                            <Input required ref={joinNameRef} id="name" placeholder="Your Name" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="room-id">Room-id</Label>
                                            <Input required ref={roomIdRef} id="room-id" placeholder="room-id" />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <Button>Join Room</Button>
                                    </div>
                </form>
                            </TabsContent>
                        </Tabs>
                        </DialogContent>
                    </Dialog>
            </div>
        </>
    )
}
