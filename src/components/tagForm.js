import React, { useState, useEffect, useReducer } from "react"
import { Card, Elevation, FormGroup, InputGroup, Icon, TextArea, Button, Intent, Tag,} from '@blueprintjs/core'
import { useCookies } from 'react-cookie'

const axios = require('axios');

/*
Post
*/
const postTag = async (id, tags, token) => {
  let savedTags = []
  //create Tags and Profile Tags
  tags.forEach(async tag => {
    //create unique Tags and Question Tags
    try{
      const dbTag = await 
        axios({
          headers: {
            authorization: "Bearer " + token,
          },
          method: 'post',
          url: 'https://opinionpedia.net/api/tag',
          data: {
            name: tag,
            description: null,
            category: null
          }
        })    
      const dbQuestionTab = await 
      axios({
        headers: {
          authorization: "Bearer " + token,
        },
        method: 'post',
        url: 'https://opinionpedia.net/api/tag/profile',
        data: {
          tag_id: dbTag.data.tag_id,
          profile_id: id,
        }
      })
      console.log(dbTag.data + ", " + dbQuestionTab.data) 
      savedTags.push(dbTag.data)
    }
    //create Question Tags with existing Tags
    catch(err) {
      if (err.response.data == "Already exists") {
        const allTags = await 
          axios({
            method: 'get',
            url: 'https://opinionpedia.net/api/tag'
        })
        allTags.data.forEach(async savedTag => {
          console.log('here')
          if(tag === savedTag.name) {
            let newQuestionTag = await axios({
              headers: {
                authorization: "Bearer " + token,
              },
              method: 'post',
              url: 'https://opinionpedia.net/api/tag/question',
              data: {
                tag_id: savedTag.id,
                profile_id: id,              }
            })
            console.log("question tag added: " + newQuestionTag.data)
            savedTags.push(savedTag.id)
          }
        })
      }
    }
  })
  alert('Profile tags have been updated')
  return savedTags
}

const arrayReduce = (myArray, { type, value, setter }) => {
  switch (type) {
    case 'add':
      setter("")
      if (value == ""){
        return [...myArray]
      }
      return [...myArray, value]
    case 'remove':
      return myArray.filter((_, index) => index !== value)
    default:
      return myArray
  }
}

const TagForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['account']);

  const [tags, tagsDispatch] = useReducer(arrayReduce, [])
  const [tag, setTag] = useState("")
  const [savedTags, setSavedTags] = useState([])

  let token = cookies['jwt']
  let id = cookies['profileId']

  const addTags = (e) => {
    let i = 1;
    if(tags.length === 0){
      alert("Error: Please add tags")
      i++
    }
    if(i == 1){
      postTag(id, tags, token)
    }
  }

  useEffect(() => {
    fetch(`https://opinionpedia.net/api/tag/profile/${id}`)
    .then(response => response.json())
    .then(resultData => {
      setSavedTags(resultData)
      console.log(savedTags)
    })
  }, []);

  return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <h2>Tags:</h2>
        <p>Help make richer content by adding tags to your profile!</p>
        <FormGroup
          helperText="Describe yourself in one or two words"
          label="Profile Tags"
          labelFor='text-input' 
        >
          {savedTags.map((tag) => (
                <Tag
                style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}
                large={true}
                intent={Intent.NONE}
                >
                  {tag.name}
                </Tag>
          ))}
          {tags.map((tag) => (
            <Tag
            style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}
            large={true}
            intent={Intent.SUCCESS}
            >
              {tag}
            </Tag>
          ))}
          <br/>
          <InputGroup 
            id="tag" 
            placeholder="Education"
            onChange={e => setTag(e.target.value)}
            value={tag}
          />
          <Button style={{marginTop:.2+"rem"}} onClick={() => tagsDispatch({type: 'add', value: tag, setter: setTag})}>Add Tag</Button>
          <Button style={{marginTop:.2+"rem"}} onClick={() => tagsDispatch({type: 'remove', value: tags.length - 1, setter: setTag})}>Remove Tag</Button>
        </FormGroup>
        <Button 
          style={{margin: `1.45rem 0rem`}} 
          intent={Intent.SUCCESS}
          large={true} 
          fill={true} 
          text="Submit Question"
          onClick={addTags}
        />
    </Card>
  )
}

export default TagForm