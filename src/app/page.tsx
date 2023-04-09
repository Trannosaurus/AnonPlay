import { Toaster } from "@/components/ui/toaster"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

import hero from '../../public/anonplay.png'

import StreamButton from "./StreamButton"


export default function Home() {
  return (
    <>
    <Toaster />
      <div className="p-5 max-w-7xl flex-col justify-between items-center mx-auto w-full">
        <div className="w-2/3">
          <h1 className="animate-text text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-pink-600 mt-10 mb-4 scroll-m-20 text-4xl sm:text-2xl md:text-3xl font-extrabold tracking-tight lg:text-5xl">
            Stream anything, anywhere with our app&apos;s private rooms and cloud computer capabilities.
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-400">
            Experience seamless streaming of cloud computers in private rooms with our cutting-edge app, unlocking unlimited possibilities for watching anything, anytime, anywhere.
          </p>
        </div>
        <p className="my-3 text-sm text-slate-500 dark:text-slate-400">
          You are looking at an early preview. You can follow the progress on
          <a href="https://github.com/Trannosaurus/AnonPlay"> <u>Github</u></a>.
        </p>

        <StreamButton/>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Q: What can I watch with your app?</AccordionTrigger>
            <AccordionContent>
              <div className="w-2/3">
                <blockquote className="border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
                  A: Our app allows you to watch virtually anything! You can stream movies, TV shows, sports events, play games, use software applications, and more on a cloud computer.
                </blockquote>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Q: How does cloud computer streaming work?</AccordionTrigger>
            <AccordionContent>
              <div className="w-2/3">
                <blockquote className="border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
                  A: Cloud computer streaming allows you to access a virtual computer that is hosted on the cloud. You can interact with the computer remotely through our app and stream its screen to your device in real-time, enabling you to watch, play, or work on anything you would normally do on a physical computer.
                </blockquote>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Q: Is my streaming experience private?</AccordionTrigger>
            <AccordionContent>
              <div className="w-2/3">
                <blockquote className="border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
                  A: Yes, your streaming experience is private! Our app creates private rooms for each user, ensuring that your activities on the cloud computer are not visible to other users. Your data and activities are securely encrypted to protect your privacy.
                </blockquote>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Q: Can I use your app on any device?</AccordionTrigger>
            <AccordionContent>
              <div className="w-2/3">
                <blockquote className="border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
                  A: Yes, our app is designed to be compatible with various devices, including desktop computers, laptops, tablets, and mobile phones. You can enjoy cloud computer streaming on your preferred device, anytime, anywhere.
                </blockquote>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Q: How do I join a room and start streaming?</AccordionTrigger>
            <AccordionContent>
              <div className="w-2/3">
                <blockquote className="border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
                  A: Joining a room is easy! Simply enter your name and the room ID in the provided fields, and click the &quot;Join Room&quot; button. Our app will connect you to your private room, and you can start streaming the cloud computer right away.
                </blockquote>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="my-3 text-sm text-slate-500 dark:text-slate-400">
          Built by <a href="https://github.com/Trannosaurus"><u>Trannosaurus</u></a>. The source code is available on
          <a href="https://github.com/Trannosaurus/AnonPlay"> <u>Github</u></a>.
        </p>
      </div>
    </>
  )
}