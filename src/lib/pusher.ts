import Pusher from 'pusher';

console.log(process.env.app_id)
console.log("its this")
export const pusher = new Pusher({
    // appId: "7808c3403c700488c5a2",
    appId: process.env.app_id!,
    key : process.env.key!,
    secret: process.env.secret!,
    cluster : "mt1",
    useTLS: true,
});