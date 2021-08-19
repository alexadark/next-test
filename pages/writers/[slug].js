import React from "react"
import { client } from "../../lib/apolloClient"
import { gql } from "@apollo/client"
import { isEmpty } from "lodash"

const GET_WRITER = gql`
  query ($id: ID!) {
    writer(id: $id, idType: SLUG) {
      title
      id
      slug
    }
  }
`

const Writer = ({ writerData = {} }) => {
  const { writer } = writerData?.data || {}
  return <h1 className="uppercase">{writer.title}</h1>
}

export default Writer

export const getStaticProps = async (context) => {
  const writerData = await client.query({
    query: GET_WRITER,
    variables: {
      id: context.params.slug,
    },
    errorPolicy: "all",
  })

  if (!writerData?.data?.writer) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      writerData,
    },
  }
}

export const getStaticPaths = async () => {
  const GET_WRITERS_SLUGS = gql`
    query {
      posts: writers(last: 1) {
        nodes {
          id
          slug
        }
      }
    }
  `
  const { data } = await client.query({
    query: GET_WRITERS_SLUGS,
  })
  const pathsData = []

  data?.posts?.nodes &&
    data?.posts?.nodes.map((post) => {
      if (!isEmpty(post?.slug)) {
        pathsData.push({ params: { slug: post?.slug } })
      }
    })

  return {
    paths: pathsData,
    fallback: "blocking",
  }
}
