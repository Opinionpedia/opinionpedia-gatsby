import React, { useState, useEffect, useReducer } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation, FormGroup, InputGroup, Icon, TextArea, Button, Intent, Tag, ButtonGroup, Alignment } from '@blueprintjs/core'

const axios = require('axios');

/*
Post
*/
const postQuestion = async (prompt,description,tags,options) => {
  const response = await 
    axios({
      method: 'post',
      url: 'https://opinionpedia.net/api/question',
      data: {
        prompt: prompt,
        description: description
      }
    })
    console.log(response.data)
  return response.data
}

const arrayReduce = (myArray, { type, value, setter }) => {
  switch (type) {
    case 'add':
      setter("")
      return [...myArray, value]
    case 'remove':
      return myArray.filter((_, index) => index !== value)
    default:
      return myArray
  }
}

const CreatePage = () => {
  const [tags, tagsDispatch] = useReducer(arrayReduce, [])
  const [options, optionsDispatch] = useReducer(arrayReduce, [])
  const [tag, setTag] = useState()
  const [option, setOption] = useState()

  //check question
  const [question, setQuestion] = useState()
  const [prompt, setPrompt] = useState("")
  const [description, setDescription] = useState("")
  const addQuestion = (e) => {
    let i = 1;
    if(prompt === ""){
      alert("Error: Please enter a prompt")
      i++
    }
    if(options.length < 2){
      alert("Error: Please add at least two options")
      i++
    }
    if(description.length > 10000){
      alert("Error: Your description is too large")
      i++
    }
    if(i == 1){
      setQuestion({prompt,description,tags,options})
      console.log(question)
      postQuestion(prompt,description,tags,options)
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
          <InputGroup id="prompt" placeholder="Have you ever ______" onChange={e => setPrompt(e.target.value)}/>
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
              onChange={e => setDescription(e.target.value)}
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
            <Button style={{marginTop:.2+"rem"}} onClick={() => tagsDispatch({type: 'add', value: tag, setter: setTag})}>Add Tag</Button>
            <Button style={{marginTop:.2+"rem"}} onClick={() => tagsDispatch({type: 'remove', value: tags.length - 1, setter: setTag})}>Remove Tag</Button>
        </FormGroup>
        
        <FormGroup
          helperText="Pick the options for your survey question"
          label="Options"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup 
            id="option" 
            placeholder="9/10"
            onChange={e => setOption(e.target.value)}
            value={option}
          />
          <Button style={{marginTop:.2+"rem"}} onClick={() => optionsDispatch({type: 'add', value: option, setter: setOption })}>Add Option</Button>
          <Button style={{marginTop:.2+"rem"}} onClick={() => optionsDispatch({type: 'remove', value: options.length - 1, setter: setOption  })}>Remove Option</Button>
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
          onClick={addQuestion}
        />
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
        </div>
      </Card>
    </Layout>
  )
}

export default CreatePage