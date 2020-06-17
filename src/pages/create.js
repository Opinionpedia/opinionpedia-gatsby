import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation, FormGroup, InputGroup, Icon, TextArea, Button, Intent, Tag, ButtonGroup, Alignment } from '@blueprintjs/core'

/*
global fetch
*/

const IndexPage = () => {

  const [tags, setTags] = useState([])
  const [tag, setTag] = useState()
  const addTag = (e) => {
    if(tag != ""){
      setTags(tags.concat(tag))
      setTag("")
    }
  }
  const removeTag = (e) => {
    setTags(tags.splice(0, tags.length-1));
    if(tags.length == 0) {
      setTags([])
    }
  }

  const [options, setOptions] = useState([])
  const [option, setOption] = useState()
  const addOption = (e) => {
    if(option != ""){
      setOptions(options.concat(option))
      setOption("")
    }
  }
  const removeOption = (e) => {
    setOptions(options.splice(0, options.length-1))
    if(options.length == 0) {
      setOption([])
    }
  }

  return (
    <Layout>
      <SEO title='Home' />
      <Card interactive={false} elevation={Elevation.TWO}>
        <h2>Create Question</h2>
        <p>Please create a multichoice question to post on opinionpedia.</p>
        <br/>
        <FormGroup
          helperText="What do you want peoples opinions on?"
          label="Prompt"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup id="prompt" placeholder="Have you ever ______" />
        </FormGroup>
        <FormGroup
          helperText="what should people know before answering this question?"
          label="Description"
          labelFor="text-input"
        >
          <TextArea
              id="description"
              growVertically={true}
              fill={true}
              placeholder="Offer additional information to voters"
          />
        </FormGroup>

        <FormGroup
          helperText="enter tags to help people find this question"
          label="Tags"
          labelFor='text-input' 
        >
          {tags.map((tag) => (
            <Tag
            style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}
            large={true}
            intent={Intent.SUCCESS}
            >
              {tag}
            </Tag>
          ))}
            <InputGroup 
              id="tag" 
              placeholder="Education"
              onChange={e => setTag(e.target.value)}
              value={tag}
            />
            <Button style={{marginTop:.2+"rem"}} onClick={addTag}>Add Tag</Button>
            <Button style={{marginTop:.2+"rem"}} onClick={removeTag}>Remove Tag</Button>
        </FormGroup>
        
        <FormGroup
          helperText="Pick the options for your survey question"
          label="Options"
          labelFor="text-input"
        >
          <InputGroup 
            id="option" 
            placeholder="9/10"
            onChange={e => setOption(e.target.value)}
            value={option}
          />
          <Button style={{marginTop:.2+"rem"}} onClick={addOption}>Add Option</Button>
          <Button style={{marginTop:.2+"rem"}} onClick={removeOption}>Remove Option</Button>
        </FormGroup>
        <center>
            <ButtonGroup
              vertical={true}
              alignText={Alignment.CENTER}
              style={{
                marginTop: '.2rem',
                marginBottom: '.2rem',
                minWidth: 120,
              }}
            >
              {options.map((option) => (
                <Button large={false} text={option}/>
              ))}
            </ButtonGroup>
          </center>
        <Button 
          style={{margin: `1.45rem 0rem`}} 
          intent={Intent.SUCCESS}
          large={true} 
          fill={true} 
          text="Submit Question"
        />
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
        </div>
      </Card>
    </Layout>
  )
}

export default IndexPage