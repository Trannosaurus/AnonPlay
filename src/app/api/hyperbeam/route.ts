import { NextRequest, NextResponse } from 'next/server';

//TODO jchange form action to this route
export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const roomid = url.searchParams.get("roomid")
  if (roomid) {
    const request_url = `https://engine.hyperbeam.com/v0/vm/${roomid}`
    const data = await fetch(request_url, {
      headers: {
        'Authorization': `Bearer ${process.env.HB_API_KEY}`,
      }
    })
      .then(response => response.json())
      .then(data => NextResponse.json(data))
      .catch(error => { console.log("HERE>>>" + error); NextResponse.json(error) })
    return data

  } else {
    const request_url = "https://engine.hyperbeam.com/v0/vm"
    const data = await fetch(request_url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => NextResponse.json(data))
      .catch(error => { console.log("HERE>>>" + error); NextResponse.json(error) })
    return data
  }

}