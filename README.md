# TODO
- use useRef instead of useEffect and state in form
- use private pusher channels, requires express

# Pusher
when using pusher auth for presence channels, the new pusher instance 
will make api calls to your specified backend, it passes the socket_id and 
channel_name that is required in authorizeChannel function. You can pass 
additional data through the pusher instance with state and auth{params:{}}
