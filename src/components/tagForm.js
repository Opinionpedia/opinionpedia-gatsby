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
      savedTags.push({id:dbTag.data, name:tag, description:null, category:null})
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
            console.log("question tag added: " + savedTag.name)
            savedTags.push(savedTag)
          }
        })
      }
    }
  })
  alert('Profile tags have been updated')
  return savedTags
}

const removeTag = async (id, tag, token) => {
  const dbTag = await 
        axios({
          headers: {
            authorization: "Bearer " + token,
          },
          method: 'delete',
          url: 'https://opinionpedia.net/api/tag/profile',
          data: {
            profile_id: id,
            tag_id: tag
          }
        })
  console.log(dbTag)
}

const TagForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['account']);
  let token = cookies['jwt']
  let id = cookies['profileId']

  const [tag, setTag] = useState("")
  const [savedTags, setSavedTags] = useState([])

  useEffect(() => {
    fetch(`https://opinionpedia.net/api/tag/profile/${id}`)
    .then(response => response.json())
    .then(resultData => {
      setSavedTags(resultData)
      console.log(savedTags)
    })
  }, []);

  return (
      <Card interactive={false} elevation={Elevation.TWO}>
        <h2>Tags:</h2>
        <p>Help make richer content by adding tags to your profile!</p>
        <FormGroup
          helperText="Describe yourself in one or two words"
          label="Profile Tags:"
          labelFor='text-input' 
        >
          {savedTags.map((tag) => (
                <Tag
                style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}
                large={true}
                intent={Intent.NONE}
                >
                  {tag.name}
                  <Button style={{marginLeft:'.6em'}} minimal={true} small={true} onClick={async () => {removeTag(id, tag.id, token)}}><Icon icon="cross" style={{color: '#fff'}}></Icon></Button>
                </Tag>
          ))}
          <br/>
          <br/>
          <InputGroup 
            id="tag" 
            placeholder="Education"
            onChange={e => setTag(e.target.value)}
            value={tag}
          />
          <Button style={{marginTop:.2+"rem"}} onClick={async () => {postTag(id, [tag], token); setTag("")}}>Add Tag</Button>
        </FormGroup>
    </Card>
  )
}

export default TagForm