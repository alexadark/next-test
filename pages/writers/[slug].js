import React from "react"
import { client } from "../../lib/apolloClient"
import { gql } from "@apollo/client"
import { isEmpty } from "lodash"
import Image from "next/image"

const GET_WRITER = gql`
  query ($id: ID!) {
    writer(id: $id, idType: SLUG) {
      title
      id
      customDataAttributes: writerDataAttributes {
        about
        background
        specialistSubjects {
          subject
        }
        guideBooks {
          url
          title
        }
        awards {
          title
          url
        }
        onTheBucketList
        instagram
        location
        twitter
        website
        wikipedia
        facebook
        linkedin
      }
      featuredImage {
        node {
          altText
          sourceUrl
          id
          caption
          description
        }
      }
    }
  }
`

const Writer = ({ writerData = {} }) => {
  const { writer } = writerData?.data || {}
  const { title, featuredImage, customDataAttributes } = writer || {}
  const { altText, sourceUrl } = featuredImage?.node
  return (
    <div>
      <h1 className="uppercase">{writer.title}</h1>
      <div className="flex mb-5">
        <Image
          src={sourceUrl}
          alt={altText}
          width={414}
          height={276}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  )
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
