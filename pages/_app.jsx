import { DokzProvider, GithubLink, ColorModeSwitch } from "dokz";
import React, { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import { ChakraProvider } from "@chakra-ui/react";

export default function App(props) {
    const { Component, pageProps } = props
    return (
        <ChakraProvider resetCSS>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Fira+Code"
                    rel="stylesheet"
                    key="google-font-Fira"
                />
            </Head>
            <DokzProvider
                headerLogo={<Image src="/Unfinished-logo.jpg"
                                   alt="unfinished logo"
                                   height={50}
                                   width={230}
                />}
                headerItems={[
                    <GithubLink
                        key="0"
                        url="https://github.com/LibertyDSNP/spec"
                    />,
                    <ColorModeSwitch key="1" />,
                ]}
                sidebarOrdering={{
                    "index.mdx": true,
                    Documents_Group: {
                        "another.mdx": true,
                    },
                }}
            >
                <Component {...pageProps} />
            </DokzProvider>
        </ChakraProvider>
    )
};
