'use client'
import {useSearchParams} from 'next/navigation'
import Chat from './Chat'

export default function RoomPage({ params }: { params: any }) {
  const searchParams = useSearchParams()
  const roomid = params.roomid;
  const username = searchParams?.get('username');
  const url = searchParams?.get('embed_url');

  return(
  <div className="grid grid-cols-6">
    <div className='col-span-5'>
      <iframe className="w-full aspect-video" src={url}></iframe>
    </div>
    <Chat roomid={roomid} username={username}></Chat>

    </div>
  )
}
