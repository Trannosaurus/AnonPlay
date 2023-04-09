import {pusher} from '../../../lib/pusher'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {message, username, roomid} = req.body;

    const resp = await pusher.trigger('presence-' + roomid, 'chat-update', {
        message,
        username
    })
    console.log("RESP"+resp)
    console.log("IT WORKS")

    res.json({status: 200});

}
