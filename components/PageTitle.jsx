import React from 'react'
import Head from 'next/head'

const PageTitle = (props) => {
  return <Head>
    <title>{props.title}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
}

export default PageTitle