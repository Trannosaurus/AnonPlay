'use client'

import { useSearchParams } from 'next/navigation'

export default function RoomPage(){

    const searchParams = useSearchParams()
    console.log(searchParams.get('name'));
    const name = searchParams.get('name');
    const src = searchParams.get('src');
    console.log(src)
    // console.log(props.params.roomId);
    // console.log(props.params.src);

    return <>
    <div> howdy
       <iframe 
            className="w-full aspect-video"
        
           src={src} allowfullscreen="true" marginwidth="0" marginheight="0" frameborder="0"
       ></iframe>
    </div>
    </>
}
