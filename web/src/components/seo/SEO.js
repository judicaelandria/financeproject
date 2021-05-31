import Head from "next/head";

export default function SEO({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" type="image/png" href="/images/favicon.ico" />
    </Head>
  );
}
