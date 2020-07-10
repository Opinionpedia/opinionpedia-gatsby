import React, { useState } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SuggestedQuestions from '../components/SuggestedQuestions'
import OptionsPie from '../components/options-pie'
import {
  Divider,
  Tag,
  Button,
  ButtonGroup,
  Alignment,
  Tab,
  Tabs,
  Intent,
  Card,
  Elevation
} from '@blueprintjs/core'
import { Column, Table, Cell } from '@blueprintjs/table'
import { getMockNames, getMockNo, getMockYes } from '../data/mock-table.js'


const getIntent = (description) => {
  if(description.length == 0){
    return Intent.NONE
  } else {
    console.log(description)
    return Intent.NONE
  }
}

const RenderTable = (props) => (
  <Table style={{ marginTop: '40px' }} numRows={5}>
    <Column name='Groups' cellRenderer={getMockNames} />
    <Column name='Yes' cellRenderer={getMockYes} />
    <Column name='No' cellRenderer={getMockNo} />
  </Table>
)

const RenderConstruction = (props) => (
  <center><div style={{marginTop:'50px', marginBottom:'50px'}}>Under construction</div></center>
)

const Question = ({ pageContext }) => {
  const [currentTab, setCurrentTab] = useState('ng')
  const { tags, tagsCount, prompt, description, suggestions, options, voteTable } = pageContext

  return (
    <Layout>
        
      <SEO title={prompt} description={description} />
      <h1>{prompt}</h1>
      <Divider />
      <h4>Tags:</h4>
      {tags.map((tag, index) => (
        <Tag
          key={`tag-${index}`}
          style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}
          intent={getIntent(tag.description)}
          minimal={true}
        >
          {tag.name} ({tagsCount[index]})
        </Tag>
      ))}
      <br/>
      <br/>
      <br/>
      <h3>Prompt:</h3>
      <Card interactive={true} elevation={Elevation.ONE}>
        <h3>{prompt}</h3>
        <p>
          {description}
        </p>
        <center>
          <ButtonGroup
            vertical={true}
            alignText={Alignment.CENTER}
            fill={true}
            style={{
              minWidth: 120,
              marginTop: '50px',
              marginBottom: '50px',
            }}
          >
            {options.map((option, index) => (
              <Button 
                key={`option-${index}`}
                large={true}
                text={option.prompt} 
              />
            ))}
          </ButtonGroup>
        </center>
      </Card>
      <br/>
      <br/>

      <h3>Results:</h3>
      <Card interactive={true} elevation={Elevation.ONE}>
        <Tabs
          id='TabsExample'
          large={true}
          selectedTabId={currentTab}
          onChange={setCurrentTab}
        >
          <Tab id='ng' title='Table' panel={<RenderTable />} />
          <Tab id='mb' title='Bar Chart' panel={<RenderConstruction />} />
          <Tab
            id='rx'
            title='Line Chart'
            panel={<RenderConstruction />}
          />
          <Tab id='rv' title='Pie Chart' panel={<OptionsPie options={pageContext.options} />} />
        </Tabs>
      </Card>
      <br/>
      <br/>
      <SuggestedQuestions data={suggestions} />
    </Layout>
  )
}
export default Question
