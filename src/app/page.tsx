'use client'
import React, { useRef, useEffect, useState} from "react"
// import { NextPage } from "next";
import { motion, useAnimationControls } from 'framer-motion'
import Link from "next/link";
import {v4} from 'uuid'

// import CreateRoomForm from "./CreateRoomForm"

const Home = () => {
    const nameRef = useRef<any>();
    const roomidRef = useRef<any>();
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const linkRef = useRef<any>();

    const helloControls = useAnimationControls()
    const welcomeControls = useAnimationControls()
    const nameControls = useAnimationControls()
    const optionsControls = useAnimationControls()
    const joinControls = useAnimationControls()

    useEffect(() => {
        if( path && name) {
            linkRef.current.click()
            return;
        }else if (name) return
        /* why do we need this if name?
         * because on every setState the page is reloaded meaning the useEffect 
         * is run again, this is a problem because on the initial page load
         * we have the opening animation, so if we have set name, then we know
         * we have passed the opening animation and can skip this */

        const sequence = async () => {
            await helloControls.start({x: 0, transition:{delay: 0}})
            await helloControls.start({opacity: 1, transition: {delay: 1, duration: 1}})
            await helloControls.start({ opacity: 0, transition: { delay: .5, duration: 1 } })

            await welcomeControls.start({x: 0, transition:{delay: 0}})
            await welcomeControls.start({opacity: 1, transition: {delay: 1, duration: 2}})
            await welcomeControls.start({ opacity: 0, transition: { delay: .5, duration: 1 } })

            await nameControls.start({x: 0, transition:{delay: 0}})
            await nameControls.start({opacity: 1, transition: {delay: .5, duration: 2}})
        }
        sequence()
    })

    const nameSubmit = async (e:any) => {
        e.preventDefault();
        await nameControls.start({ opacity: 0, transition: {duration: .5 } })
        await optionsControls.start({x: 0, transition:{delay: 0}})
        await optionsControls.start({opacity: 1, transition: {duration: 1}})
        setName(nameRef.current.value);
        // setName(nameRef.current.value);
    }

    const handleCreate = async () => {
        await optionsControls.start({ opacity: 0, transition: { delay: .5, duration: 1 } })
        setPath(v4())
    }
    const handleJoin = async () => {
        await optionsControls.start({ opacity: 0, transition: { delay: .5, duration: 1 } })
        await joinControls.start({x: 0, transition:{delay: 0}})
        await joinControls.start({opacity: 1, transition: {delay: .5, duration: 1}})
    }
    const handleJoinRoom = async (e: any) => {
        e.preventDefault()
        setPath(roomidRef.current.value)
    }
  return (
    <div className="text-6xl flex items-center justify-center h-screen">
        <motion.div
            className="absolute"
            initial={{opacity: 0, x: -10000}}
            animate={helloControls}
        >Hey there
        </motion.div>

        <motion.div
            className="absolute max-w-6xl text-center"
            initial={{opacity: 0, x: -10000}}
            animate={welcomeControls}
        >Welcome to AnonPlay where you can watch anything with your friends
        </motion.div>

        <motion.form
            onSubmit={nameSubmit}
            className="absolute"
            initial={{opacity: 0, x: -10000}}
            animate={nameControls}
        >
            <label>What's your name?</label><br/>
            <input 
            ref={nameRef}
            className="mt-6 outline-none text-6xl bg-transparent border-slate-400 border-b-4 hover:border-white duration-300"
            />
        </motion.form>

        <motion.div
            className="absolute flex justify-around w-screen"
            initial={{opacity: 0, x: -10000}}
            animate={optionsControls}
        >
            <p
            onClick={handleCreate}
            className="text-slate-400 hover:-translate-y-1 hover:scale-110 hover:text-white duration-300"
            >
            Create a room
            </p>
            <p
            onClick={handleJoin}
            className="text-slate-400 hover:-translate-y-1 hover:scale-110 hover:text-white duration-300"
            >Join a room</p>
        </motion.div>

        <motion.form
            onSubmit={handleJoinRoom}
            className="absolute"
            initial={{opacity: 0, x: -10000}}
            animate={joinControls}
        >
        <label>What is the room id?</label><br/>
        <input
            ref={roomidRef}
            className="mt-6 outline-none text-6xl bg-transparent border-slate-400 border-b-4 hover:border-white duration-300"
        />

        </motion.form>

        <Link
        ref={linkRef}
        href={{
            pathname:`${path}`,
            query: {
                username: `${name}`
            }
        }}
        >

        </Link>
    </div>
  );
};
export default Home;
