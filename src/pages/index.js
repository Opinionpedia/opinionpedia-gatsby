import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation, Button, Intent } from '@blueprintjs/core'

/*
global fetch
*/

const IndexPage = () => {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState()
  const [pages, setPages] = useState([])
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    fetch(`https://opinionpedia.net/api/question/count`)
    .then(response => response.json())
    .then(resultData => {
      setCount(resultData)
    })
    setIndex(0)
  }, [count]);

  useEffect(() => {
    fetch(`https://opinionpedia.net/api/question/page/${index}`)
      .then(response => response.json())
      .then(resultData => {
        setQuestions(resultData)
      })
  }, [index])

  useEffect(() => {
    let tally = count
    let i = 0
    let cells = []
    while(tally > 0){
      cells.push(i)
      i=i+20
      tally = tally - 20
    }
    setPages(cells)
  }, [count]);

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
          Our mission is to create a publicly owned repository of peoples’ opinions that is legible and accessible to all.
        </p>
        <p>Our current goals are:</p>
        <ul>
            <li>To create educational infographics</li>
            <li>To create a rewarding user experience</li>
            <li>To generate organic site traffic</li>
        </ul>
        <p>
          Please explore the site, our hope is that Opinionpedia can give you a new channel for interacting with the world.
          Help us create an encyclopedia we can share with our future generations. Thank you.
        </p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image filename={'vote.png'}/>
        </div>
        <Link to={`/about-us`}><Button intent={Intent.SUCCESS} fill={true}>Learn More</Button></Link>
      </Card>

      <br/><br/>
      <h1>Question Index:</h1>

      {index >= 20 ?
        <Button 
          onClick={() => setIndex(index-20)}
          minimal={true}
          icon={`chevron-left`}
        />
      :
        <Button 
        onClick={() => setIndex(index-20)}
        minimal={true}
        icon={`chevron-left`}
        disabled={true}
        />
      }
      {pages.map((page, i) => (
        <>
        {i === index/20 ?
          <Button 
          key={`page-${i+1}`} 
          onClick={() => setIndex(page)}
          minimal={true}
          text={i+1}
          active={true}
          />
        :
          <Button 
            key={`page-${i+1}`} 
            onClick={() => setIndex(page)}
            minimal={true}
            text={i+1}
          />
        }
        </>
      ))} 
      {index+21 > count ?
        <Button 
          onClick={() => setIndex(index+20)}
          minimal={true}
          icon={`chevron-right`}
          disabled={true}
        />
      :
        <Button 
        onClick={() => setIndex(index+20)}
        minimal={true}
        icon={`chevron-right`}
        />
      }   

      <br/><br/><br/>
      {questions.map((question) => (
        <>
          <Link 
            key={`question-${question.id}`} 
            to={`/question/${question.id}`}
            style={{
              color: `inherit`,
              textDecoration: `none`,
            }}
          >
            <Card interactive={true} elevation={Elevation.ONE} key={`link-${question.id}`}>
              <h3>{question.prompt}</h3>
              <p>{question.description}</p>
            </Card>
          </Link>
          <br/>
        </>
      ))}

      
      {index >= 20 ?
        <Button 
          onClick={() => setIndex(index-20)}
          minimal={true}
          icon={`chevron-left`}
        />
      :
        <Button 
        onClick={() => setIndex(index-20)}
        minimal={true}
        icon={`chevron-left`}
        disabled={true}
        />
      }
      {pages.map((page, i) => (
        <>
        {i === index/20 ?
          <Button 
          key={`page-${i+1}`} 
          onClick={() => setIndex(page)}
          minimal={true}
          text={i+1}
          active={true}
          />
        :
          <Button 
            key={`page-${i+1}`} 
            onClick={() => setIndex(page)}
            minimal={true}
            text={i+1}
          />
        }
        </>
      ))} 
      {index+21 > count ?
        <Button 
          onClick={() => setIndex(index+20)}
          minimal={true}
          icon={`chevron-right`}
          disabled={true}
        />
      :
        <Button 
        onClick={() => setIndex(index+20)}
        minimal={true}
        icon={`chevron-right`}
        />
      }   
    </Layout>
  )
}

export default IndexPage