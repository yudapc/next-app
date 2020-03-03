import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

const API_URL = 'https://private-cf0fb-yudacogati.apiary-mock.com/sample/items/'

const Posts = (article) => {
  return (
    <div>
      <h1>My blog post #{article.id}</h1>
      <p>Phone: {article.phone}</p>
      <p>Nominal: {article.nominal}</p>
      <p>Note: {article.note}</p>
    </div>
  );
}

Posts.getInitialProps = async ({ query }) => {
  const id = query.id
  const res = await fetch(API_URL + id, {
    headers: {
      'Authorization': 'Bearer ABCDEF',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  const json = await res.json()
  return json.data
}

export default Posts
