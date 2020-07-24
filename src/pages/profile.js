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


const ProfilePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['account']);
  const [username, setUsername] = useState()
  const [description, setDescription] = useState()
  const [created, setCreated] = useState()
  const [updated, setUpdated] = useState()
  let token = cookies['jwt']
  let id = cookies['profileId']

  

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

  return (
    <Layout>
      <SEO title='Profile' description='Use this page to modify your annoymous account. Adding content here makes your opinions richer and more dynamic through the entire website.' />
      <h1>{username}'s Profile Page</h1>
      <ul>
        <li>username: {username}</li>
        <li>description: {description}</li>
        <li>created: {created}</li>
        <li>updated: {updated}</li>
      </ul>
      <br/>
      <Card interactive={false} elevation={Elevation.TWO}>
        <h2>Tags:</h2>
        <p>Help make richer content by adding tags to your profile!</p>
      </Card>
    </Layout>
  )
}

export default ProfilePage