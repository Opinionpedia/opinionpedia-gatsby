import React from 'react'
import { Link } from 'gatsby'

const SuggestedQuestions = (props) => (
  <React.Fragment>
    <h3>Suggested Questions</h3>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        alignContent: 'stretch',
      }}
    >
    <ul style={{ listStyle: 'none' }}>
      {props.data.map((question, index) => (
        <li key={`link-${index}`}>
          <Link key={`question-${index}`} to={`/question/${question}`}>
            {question}
          </Link>
        </li>
      ))}
    </ul>
    </div>
  </React.Fragment>
)

export default SuggestedQuestions
