This code is not mine. Original code is from link below.<br>
https://codesandbox.io/p/sandbox/nextjs-xstate-ssr-forked-6kct2r
# Next.js + xstate in the real world

This is a proof-of-concept around integrating xstate with Next.js.

It aims to show a real-case scenario and has these requirements:

-   Use xstate for routing
-   Be able to handle page refresh
-   Have individual machines for each page that are initialised from the main app machine
-   Be able to fetch data for SSR on page refresh
-   Persist state in localstorage
