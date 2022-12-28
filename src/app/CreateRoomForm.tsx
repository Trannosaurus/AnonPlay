'use client'

import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link'
import useSWR from 'swr'
import {v4} from 'uuid'

const fetcher = async (url: any) => {
    const res = await fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const element = doc.querySelector('.play-video iframe') as HTMLIFrameElement
            const src = element?.src
            return {"src": src};
        })
    return res;
}

export default function CreateRoomForm() {
    const [name, setName] = useState("");
    const [url, setURL] = useState("");
    const [src, setSrc] = useState("");
    const myLink = useRef(null);

    const {data, error} = useSWR(url ? url: null, fetcher)
    // const { data , error} = useSWR(name, fetcher);

    if(error) console.log("error")
    if(!data) console.log("loading");

    useEffect(() => {
        if(src){
            // @ts-ignore
            myLink.current.click();
        }
    })

    const handleForm = async (e: any) => {
        e.preventDefault();

        if (data) {
            setSrc(data.src);
            // myLink.current.click();
        } else {
           setURL("");
        }
    };

    return <>
        <div className="border rounded-lg p-10 m-3 w-1/3">
            <div className="flex flex-col items-center space-y-4">
                <p className="text-3xl font-semibold">Create a Room</p>
                <label className="text-2xl font-medium">Screen Name</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    value={name}
                    placeholder="Enter Your Screen Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="text-2xl font-medium">Episode URL</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    value={url}
                    placeholder="Enter the URL"
                    onChange={(e) => setURL(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleForm}
                >Button</button>
                <Link
                    className="hidden"
                    ref={myLink}
                    href={{
                        pathname: `/${v4()}`,
                        query: {
                            name: `${name}`,
                            src: `${src}`,
                        }
                    }}
                >Link</Link>

            </div>
        </div>
    </>
}
