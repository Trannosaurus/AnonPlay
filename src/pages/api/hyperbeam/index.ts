import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try{
        const body = JSON.parse(req.body)
        const { roomid } = await body
        console.log("joinging")
        console.log("this is the id: " + roomid)
    }catch{
        console.log("creating room")
        const resp = axios.post('https://engine.hyperbeam.com/v0/vm', {}, {
            headers: {
            'Authorization': `Bearer ${process.env.HB_API_KEY}`,
        },
        })
        .then(response => res.status(200).json(response.data))
        .catch(error => res.status(500).send(error))
    }
}
