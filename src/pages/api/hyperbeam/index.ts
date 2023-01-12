import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
let computer: any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log("inside hyperbeam")
    if(computer){
        res.send(computer);
        return;
    }
    const resp = axios.post('https://engine.hyperbeam.com/v0/vm', {}, {
      headers: {
        'Authorization': 'Bearer process.env.HB_API_KEY',
      },
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error))

    /* const resp = await axios.post(
        "https://engine.hyperbeam.com/v0/vm",
            {},
        {
            headers: { 'Authorization': `Bearer ${process.env.HB_API_KEY}` },
        }
    ); */
    computer = resp;
    res.send(computer);
}
