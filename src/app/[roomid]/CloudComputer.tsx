'use client'

import { useSearchParams } from 'next/navigation'
import {useRef} from 'react'
import Hyperbeam from '@hyperbeam/web'

export default async function CloudComputer(){
    const searchParams = useSearchParams()
    const src = searchParams.get('src')!;
    const iframeRef = useRef<HTMLIFrameElement|HTMLDivElement>(null);


    /* const resp = await fetch("/api/hyperbeam");
    const data = await resp.json()
    const hb = await Hyperbeam(iframeRef.current, data.embed_url); */

    return(
    <>
        <div ref={iframeRef} id="cloudComputerDiv">words</div>
    </>
    )
}
