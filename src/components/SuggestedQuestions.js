import React from 'react'
import { Link } from 'gatsby'
import { Card, Elevation } from '@blueprintjs/core'

const SuggestedQuestions = (props) => (
  <React.Fragment>
    <h3>Suggested Questions:</h3>
    {props.data.map((question) => (
      <>
        <Card interactive={true} elevation={Elevation.ONE} key={`link-${question.id}`}>
          <Link 
            key={`question-${question.id}`} 
            to={`/question/${question.id}`}
            style={{
              color: `inherit`,
              textDecoration: `none`,
            }}
          >
            <h4>{question.prompt}</h4>
            <p>{question.description}</p>
          </Link>
        </Card>
        <br/>
      </>
      ))}
  </React.Fragment>
)

export default SuggestedQuestions
