import React from 'react';
import { AppProps } from 'next/app';
import { inspect } from '@xstate/inspect';

if (typeof window !== 'undefined') {
    inspect({
        // options
        url: 'https://statecharts.io/inspect', // (default)
        iframe: false, // open in new window
    });
}

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
