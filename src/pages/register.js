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
					password,
					description: null,
					body: null
				})
    }
		
    const response = await fetch('https://opinionpedia.net/api/profile', requestOptions)
		const data = await response.json()
		
		setCookie('jwt', data.token)
		setCookie('profileId', data.profile_id)
		window.location = '/';
}

const handleIntent = (username, password, confirmPassword) => {
		if(!username && !confirmPassword && !password)
			return null
		
		let confirmPasswordIntent = Intent.DANGER
		let usernameIntent = Intent.DANGER
		let passwordIntent = Intent.DANGER
		
		//TODO: add real validation rules
		if(password === confirmPassword && password)
			confirmPasswordIntent = Intent.SUCCESS
		
		if(username.length > 0) 
			usernameIntent = Intent.SUCCESS
			
		if(password.length > 0)
			passwordIntent = Intent.SUCCESS
		
	return {
			usernameIntent,
			passwordIntent,
			confirmPasswordIntent
	}
}

const intentSuccess = intent => {
	return Object.values(intent).reduce( (total, current) => {
		return !total ? false : current === Intent.SUCCESS ? true : false
	}, true)
}

const RegisterPage = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['account']);
	console.log(cookies)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [intent, setIntent] = useState({
    usernameIntent: INTENT_DEFAULT,
    passwordIntent: INTENT_DEFAULT,
    confirmPasswordIntent: INTENT_DEFAULT,
  })

  useEffect(() => {
		const _intent = handleIntent(username, password, confirmPassword)
		
		if(_intent)
			setIntent(_intent)
		
  }, [username, password, confirmPassword])

  return (
    <Layout>
      <SEO title='Home' />
      <Card interactive={false} elevation={Elevation.TWO}>
        <Register />
        <h2>Register</h2>
        <p>Please fill out below in order to create an account</p>
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
        <FormGroup
          label='Confirm password'
          labelFor='text-input'
          labelInfo='(required)'
        >
          <InputGroup
            intent={intent.confirmPasswordIntent}
            onChange={(e) => setconfirmPassword(e.target.value)}
            id='Confirm password'
            placeholder=''
          />
        </FormGroup>
        <Button
					intent={Intent.SUCCESS}
					disabled={ intentSuccess(intent) ? false : true}
          style={{ margin: `1.45rem 0rem` }}
          large={true}
          fill={true}
          text='Create an Account'
          onClick={() => submitForm(username, password, setCookie)}
        />
      </Card>
    </Layout>
  )
}

export default RegisterPage
