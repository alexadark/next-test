import Link from "next/link"
import { gql } from "@apollo/client"
import { client } from "../../lib/apolloClient"

const GET_ALL_WRITERS = gql`
  query {
    writers {
      nodes {
        uri
        title
        id
      }
    }
  }
`

const Writers = ({ writersData = {} }) => {
  let writers = writersData.data.writers.nodes || []
  console.log("writers", writers)

  return (
    <>
      {writers?.map((item) => {
        console.log("writer item", item)

        // return <Listing key={item.id} item={item} noBl writer />
        return (
          <h2 key={item.id}>
            <Link href={item.uri}>
              <a>{item.title}</a>
            </Link>
          </h2>
        )
      })}
    </>
  )
}

export const getStaticProps = async (context) => {
  const writersData = await client.query({
    query: GET_ALL_WRITERS,
  })
  return {
    props: {
      writersData,
    },
  }
}

export default Writers
