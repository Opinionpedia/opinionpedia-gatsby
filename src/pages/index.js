import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation, Button } from '@blueprintjs/core'

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
      <SEO title='Home' 
           description="Opinionpedia.org, A free encyclopedia of peoples' opinions
                        Opinionpedia is a public survey site.
                        Our mission is to create a publicly owned repository of peoples’ opinions that is legable and excessable to all.
           "/>
      <Card interactive={false} elevation={Elevation.ONE}>
        <h1>Opinionpedia.org</h1>
        <h3><i>A free encyclopedia of peoples' opinions</i></h3>
        <p>Opinionpedia is a public survey site.
          Our mission is to create a publicly owned repository of peoples’ opinions that is legable and excessable to all.
        </p>
        <p>Our current goals are:</p>
        <ul>
            <li>to create educational info graphics</li>
            <li>to create a rewarding user experience</li>
            <li>to generate site traffic</li>
        </ul>
        <p>
          Please explore the site, our hope is that Opinionpedia can give you a new channel for interacting with the world.
          Help us create something we can share with future generations. Thank you.
        </p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image filename={'vote.png'}/>
        </div>
        <Link to={`/about-us`}><Button fill={true}>Learn More</Button></Link>
      </Card>

      <br/><br/>
      <h1>Question Index:</h1>
        {questions.map((question, index) => (
          <div style={{marginTop:10, marginLeft:15}} key={`link-${index}`}>
            <Link key={`tag-${index}`} to={`/question/${question.id}`}>
              {question.prompt}
            </Link>
          </div>
        ))}
    </Layout>
  )
}

export default IndexPage