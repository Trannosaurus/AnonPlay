import Pusher from 'pusher';

export const pusher = new Pusher({
    // appId: "7808c3403c700488c5a2",
    appId: process.env.appId!,
    key : process.env.key!,
    secret: process.env.secret!,
    cluster : "mt1",
    useTLS: true,
});
