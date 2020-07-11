import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import {
  Divider,
  Card,
} from '@blueprintjs/core'
 

const TagPage = ({ pageContext }) => {
  const { name, description, tagsCount, questions, } = pageContext

  return (
    <Layout>
      <SEO title={name} description={description} />
      <h1>{name}</h1>
      <h3>Linked to: {tagsCount} questions</h3>
      <p>{description}</p>
      <Divider />
      <br/><br/>

      {questions.map((q) => {
        return (
        <>
          <Link 
            to={`/question/${q.id}`} 
            key={`question-${q.id}`}
            style={{
              color: `inherit`,
              textDecoration: `none`,
            }}
          >
            <Card interactive='true'>
              <p>{q.id}</p>
              <p>{q.prompt}</p>
            </Card>
          </Link>
          <br/>
        </>
      )
      })}
      
    </Layout>
  )
}
  
export default TagPage
