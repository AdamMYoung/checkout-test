import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <html lang="en" />
            </Head>
            <ChakraProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
