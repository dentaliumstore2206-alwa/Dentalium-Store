import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta name="description" content="DENTALIUM STORE - Distributor alat kesehatan terpercaya Indonesia. Menyediakan berbagai macam alat medis, peralatan kedokteran, dan obat-obatan." />
        <meta name="keywords" content="alat kesehatan, medical equipment, obat-obatan, distributor kesehatan, indonesia" />
        <meta name="author" content="DENTALIUM STORE INDONESIA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>DENTALIUM STORE - Distributor Alat Kesehatan Terpercaya Indonesia</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}