import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation } from '@blueprintjs/core'

/*
global fetch
*/

const IndexPage = () => {
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    fetch(`https://opinionpedia.net/api/question`)
      .then(response => response.json())
      .then(resultData => {
        setQuestions(resultData)
      }) 
  }, [])
  
  return (
    <Layout>
      <SEO title='Home' />
      <Card interactive={false} elevation={Elevation.TWO}>
        <h3>A thought or belief about something or someone:</h3>
        <ul>
          <li>
            What's your <b>opinion</b> about/on the matter?
          </li>
          <li>
            People tend to have strong <b>opinions</b> on capital punishment.
          </li>
          <li>
            He didn't express/give an <b>opinion</b> on the matter.
          </li>
          <li>
            Who, in your <b>opinion</b>, (= who do you think) is the best soccer
            player in the world today?
          </li>
          <li>
            He's very much of the <b>opinion</b> that alternative medicine is a
            waste of time.
          </li>
        </ul>
    
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
      </Card>
      <br/>
      <Card interactive={false} elevation={Elevation.TWO}>
        <h3>Our Questions</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            alignContent: 'stretch',
            textTransform: 'capitalize'
          }}
        >
          <ul style={{ listStyle: 'none' }}>
            {questions.slice(0, 49).map((question, index) => (
              <li key={`link-${index}`}>
                <Link key={`tag-${index}`} to={`/question/${question.id}`}>
                  {question.prompt}
                </Link>
              </li>
            ))}
          </ul>
          <ul style={{ listStyle: 'none' }}>
            {questions.slice(50, 100).map((question, index) => (
              <li key={`link-${index}`}>
                <Link key={`tag-${index}`} to={`/question/${question.id}`}>
                  {question.prompt}
                </Link>
              </li>
            ))}
          </ul>
          <ul style={{ listStyle: 'none' }}>
            {questions.slice(101, 150).map((question, index) => (
              <li key={`link-${index}`}>
                <Link key={`tag-${index}`} to={`/question/${question.id}`}>
                  {question.prompt}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Layout>
  )
}

export default IndexPage