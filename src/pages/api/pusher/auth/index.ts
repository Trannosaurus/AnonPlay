import { pusher } from '../../../../lib/pusher'
import type { NextApiRequest, NextApiResponse } from 'next'
import {v4} from 'uuid'

/* type Data = {
  name: string
} */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if( req.method ! == 'POST'){
        res.status(405).json({name: "Method Not Allowed"});
    }
    const { socket_id, channel_name, name} = req.body

    const randomString = Math.random().toString(36).slice(2);

    // const user_id = v4()

    const presenceData = {
        // user_id: user_id,
        user_id: randomString,
        user_info: {
            name
        }
    }

    try {
        const auth = pusher.authorizeChannel(socket_id, channel_name, presenceData)
    } catch (error) {
        console.log(error)
    }
}
