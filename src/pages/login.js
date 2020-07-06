import React, { useState, useEffect, useReducer } from 'react'
import { useCookies } from 'react-cookie';
import Layout from '../components/layout'
import Register from '../components/register'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import {
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Icon,
  TextArea,
  Button,
  Intent,
  Tag,
  ButtonGroup,
  Alignment,
} from '@blueprintjs/core'
import { string } from 'prop-types'

const INTENT_DEFAULT = 'none'

const submitForm = async (username, password, setCookie) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
					username,
					password
				})
    }
		
    const response = await fetch('https://opinionpedia.net/api/login', requestOptions)
		const data = await response.json()
		
    if(data.hasOwnProperty('token') && data.token){
      setCookie('jwt', data.token)
      setCookie('profileId', data.profile_id)
      window.location = '/';
    }else{
      alert('Incorrect password')
    }
}

const handleIntent = (username, password) => {
		if(!username && !password)
			return null
		
		let usernameIntent = Intent.DANGER
		let passwordIntent = Intent.DANGER
		
		
		if(username.length > 0) 
			usernameIntent = Intent.SUCCESS
			
		if(password.length > 0)
			passwordIntent = Intent.SUCCESS
		
	return {
			usernameIntent,
			passwordIntent
	}
}

const intentSuccess = intent => {
	return Object.values(intent).reduce( (total, current) => {
		return !total ? false : current === Intent.SUCCESS ? true : false
	}, true)
}

const LoginPage = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['account']);
	console.log(cookies)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [intent, setIntent] = useState({
    usernameIntent: INTENT_DEFAULT,
    passwordIntent: INTENT_DEFAULT,
    confirmPasswordIntent: INTENT_DEFAULT,
  })

  useEffect(() => {
		const _intent = handleIntent(username, password)
		
		if(_intent)
			setIntent(_intent)
		
  }, [username, password])

  return (
    <Layout>
      <SEO title='Home' />
      <Card interactive={false} elevation={Elevation.TWO}>
        <Register />
        <h2>Login</h2>
        <p>Please fill out below in order to log in</p>
        <FormGroup
          label='Username'
          labelFor='text-input'
          labelInfo='(required)'
        >
          <InputGroup
            intent={intent.usernameIntent}
            onChange={(e) => setUsername(e.target.value)}
            id='Username'
            placeholder=''
          />
        </FormGroup>
        <FormGroup
          label='Password'
          labelFor='text-input'
          labelInfo='(required)'
        >
          <InputGroup
            intent={intent.passwordIntent}
            onChange={(e) => setPassword(e.target.value)}
            id='Password'
            placeholder=''
          />
        </FormGroup>
        <Button
					intent={Intent.SUCCESS}
					disabled={ intentSuccess(intent) ? false : true}
          style={{ margin: `1.45rem 0rem` }}
          large={true}
          fill={true}
          text='Login'
          onClick={() => submitForm(username, password, setCookie)}
        />
      </Card>
    </Layout>
  )
}

export default LoginPage
