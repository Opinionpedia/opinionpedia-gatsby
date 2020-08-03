import React, { useState, useEffect, useReducer } from "react"
import Layout from '../components/layout'
import Image from '../components/image'
import TagForm from '../components/tagForm'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Card, Elevation, Intent, Tag, } from '@blueprintjs/core'
import { useCookies } from 'react-cookie'

const ProfilePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['account']);
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState()
  const [created, setCreated] = useState()
  const [updated, setUpdated] = useState()

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
  });

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
      <TagForm/>
    </Layout>
  )
}

export default ProfilePage