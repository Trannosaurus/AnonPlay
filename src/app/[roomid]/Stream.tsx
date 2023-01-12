// 'use client'

// import React, {useRef, useEffect, useState} from 'react'
/* import Hyperbeam from '@hyperbeam/web'
import useSWR from "swr" */

// const fetcher = (path: string) => fetch(`http://localhost:3000${path}`).then(res =>res.json())

export default function Stream() {
    /* const cloudComputerDiv = useRef<HTMLDivElement>(null)
    const {data, error, isLoading}  =useSWR('/api/hyperbeam', fetcher)
    if(error) console.log("error")
    else if(isLoading) console.log("loading")
    else console.log("DATA: " + JSON.stringify(data)) */
    /* const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const cloudComputerDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log("inside use effect")
        async function fetchData(){
            try{
                const resp = await fetch("/api/hyperbeam");
                const data = await resp.json()
                setData(data)
                setLoading(false)
                //@ts-ignore
                const hb = await Hyperbeam(cloudComputerDiv.current, data.embed_url);
            }catch (e) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    },[])

    if (loading) console.log("loading")
    if (error) console.log("error")
    if(data) console.log(data) */

    /* const resp = await fetch("/api/hyperbeam");
    const data = await resp.json()
    const hb = await Hyperbeam(cloudComputerDiv.current, data.embed_url); */
    // const hb = await Hyperbeam(cloudComputerDiv.current, 'https://1n3gz1hpcnqdu0d7un7mi7olf.hyperbeam.com/qPJNvxlDQ62by7zJhuFnjw?token=YSQY4f-IKXgmyuKnvN0oNk_VZ1eUJOAFW5GnMxPSOFE');

    return(
    <div className="w-full">
        <iframe className="w-full aspect-video" src="https://6vfprhd2zq392od50gh7j0b10.hyperbeam.com/WASv0xULRJmhhP0PlqD8Ng?token=1DktEDjDRB-olCk018oa87aSKAaRNa96DMHxmoL3llM"></iframe>
    </div>

    )
}

