import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import {
  Divider,
  Card,
  Button,
  Tag,
  Intent,
} from '@blueprintjs/core'
 

const TagPage = ({ pageContext }) => {
  const { id, name, description, tagsCount, questions, } = pageContext
  const [currentQuestions, setCurrentQuestions ] = useState(questions)

  const [index, setIndex] = useState()
  const [pages, setPages] = useState([])
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    fetch(`https://opinionpedia.net/api//tag/question/${id}/count`)
    .then(response => response.json())
    .then(resultData => {
      setCount(resultData)
    })
    setIndex(0)
  }, [count]);

  useEffect(() => {
    fetch(`https://opinionpedia.net/api/tag/question/${id}/questions/${index}`)
      .then(response => response.json())
      .then(resultData => {
        setCurrentQuestions(resultData)
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
      <SEO title={name} description={description} />
      <Tag
            style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' , padding: '12px 20px'}}
            intent={Intent.NONE}
            minimal={true}
          >
            <h1>{name} ({tagsCount})</h1>
      </Tag>
      <h3>Linked to: {tagsCount} questions</h3>
      <p>{description}</p>
      <Divider />
      <br/>
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

      <br/><br/>
      {currentQuestions.map((q) => {
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
              <h3>{q.prompt}</h3>
              <p>{q.description}</p>
            </Card>
          </Link>
          <br/>
        </>
      )
      })}


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
  
export default TagPage
