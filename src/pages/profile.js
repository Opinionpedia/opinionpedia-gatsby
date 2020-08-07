import React, { useState, useEffect, useReducer } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation, Intent, Tag, FormGroup, Button, Icon, InputGroup } from '@blueprintjs/core'
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
      savedTags.push({tag_id:dbTag.data, name:tag, description:null, category:null})
      window.location.assign(window.location)
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
            window.location.assign(window.location)
          }
        })
      }
    }
  })
}

const removeTag = async (tag, token) => {
  console.log(tag)
  const dbTag = await 
        axios({
          headers: {
            authorization: "Bearer " + token,
          },
          method: 'delete',
          url: `https://opinionpedia.net/api/tag/profile/${tag}`,
        })
  console.log(dbTag)
  window.location.assign(window.location)
}


const ProfilePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['account']);
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState()
  const [created, setCreated] = useState()
  const [updated, setUpdated] = useState()

  const [tag, setTag] = useState("")
  const [saved, setSaved] = useState(0)
  const [savedTags, setSavedTags] = useState([])

  let token = cookies['jwt']
  let id = cookies['profileId']

  useEffect(() => {
    if (token === undefined) {
      window.location.assign("https://opinionpedia.org")
    }
  });

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
  }, [saved]);

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
                intent={Intent.NONE}
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
                  {tag.id}
                  {tag.name}
                  <Button style={{marginLeft:'.6em'}} minimal={true} small={true} onClick={async () => {removeTag(tag.tag_id, token)}}><Icon icon="cross" style={{color: '#fff'}}></Icon></Button>
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
  </Layout>
  )
}

export default ProfilePage