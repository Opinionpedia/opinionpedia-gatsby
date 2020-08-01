import React, { useState, useEffect, useReducer } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation, FormGroup, InputGroup, Icon, TextArea, Button, Intent, Tag, ButtonGroup, Alignment } from '@blueprintjs/core'
import { string } from "prop-types"
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'

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

const ProfilePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['account']);
  const [username, setUsername] = useState()
  const [description, setDescription] = useState()
  const [created, setCreated] = useState()
  const [updated, setUpdated] = useState()

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
    fetch(`https://opinionpedia.net/api/profile/${id}`)
    .then(response => response.json())
    .then(resultData => {
      setUsername(resultData.username)
      setDescription(resultData.description)
      setCreated(resultData.created)
      setUpdated(resultData.updated)
    })
  }, []);

  useEffect(() => {
    fetch(`https://opinionpedia.net/api/tag/profile/${id}`)
    .then(response => response.json())
    .then(resultData => {
      setSavedTags(resultData)
      console.log(savedTags)
    })
  }, []);

  return (
    <Layout>
      <SEO title='Profile' description='Use this page to modify your annoymous account. Adding content here makes your opinions richer and more dynamic through the entire website.' />
      <h1>{username}'s Profile Page</h1>
      <Card interactive={false} elevation={Elevation.TWO}>
        <table className="bp3-html-table .modifier">
          <thead>
            <tr>
              <th>Profile Data:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{username}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>Standard User</td>
            </tr>
            <tr>
              <td>Created:</td>
              <td>{created}</td>
            </tr>
            <tr>
              <td>Update:</td>
              <td>{updated}</td>
            </tr>
            <tr>
              <td>Saved Tags:</td>
              <td>
              {savedTags.map((tag) => (
                <Tag
                style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}
                large={true}
                intent={Intent.SUCCESS}
                >
                  {tag.name}
                </Tag>
              ))}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
      <br/>
      <Card interactive={true} elevation={Elevation.TWO}>
        <h2>Tags:</h2>
        <p>Help make richer content by adding tags to your profile!</p>
        <FormGroup
          helperText="Describe yourself in one or two words"
          label="Profile Tags"
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
        <Button 
          style={{margin: `1.45rem 0rem`}} 
          intent={Intent.SUCCESS}
          large={true} 
          fill={true} 
          text="Submit Question"
          onClick={addTags}
        />
      </Card>
    </Layout>
  )
}

export default ProfilePage