import {serverPusher} from '../../../lib/pusher'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {message, username} = req.body;

    await serverPusher.trigger('presence-channel', 'chat-update', {
        message,
        username
    })

    res.json({status: 200});
}
