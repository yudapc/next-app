import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import fetchClient from 'unfetch'
import useSWR from 'swr'

const API_URL = 'https://api.github.com'

async function fetcher(path) {
  const res = await fetchClient(API_URL + path)
  const json = await res.json()
  return json
}

const About = ({ forks }) => {
  const { data, error } = useSWR('/repos/zeit/next.js', fetcher)

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          About
        </h1>

        <p className="description">
          Halaman Tentang Saya
        </p>

        <div>Next stars: {!data ? `000` : data.stargazers_count}</div>
        <div>Forks: {forks}</div>
      </main>
    </div>
  );
}

About.getInitialProps = async () => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { forks: json.forks }
}

export default About
