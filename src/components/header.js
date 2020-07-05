import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useCookies } from 'react-cookie';
import Logo from '../components/logo'
import {Navbar, Button, Alignment} from "@blueprintjs/core"
import "@blueprintjs/core/lib/css/blueprint.css";

const logout = removeCookie => {
	removeCookie('jwt')
	window.location = '/';
}

const Header = ({ siteTitle }) =>  {
	const [cookies, setCookie, removeCookie] = useCookies(['account']);
	const loggedIn = cookies['jwt'] ? true : false //TODO: check if valid
	
	return (
	<Navbar>
		<Navbar.Group align={Alignment.LEFT}>
		<Link
			to="/"
			style={{
				width: `200px`
			}}
		>
			<Button className="bp3-minimal"><Logo /></Button>
		</Link>
		{ 
			loggedIn ? 
				<Link
					to="/create"
					style={{
					color: `white`,
					textDecoration: `none`,
					}}
				>
					<Button className="bp3-minimal" icon="add-to-artifact" text="Create Question" />
				</Link>
			:
			<></>
		}
		</Navbar.Group>
			{ 
			loggedIn ? 
				<Navbar.Group align={Alignment.RIGHT}>
						<Button className="bp3-minimal" icon="log-out" text="Logout" onClick={ () => logout(removeCookie) } />
		
				</Navbar.Group>
			:
				<Navbar.Group align={Alignment.RIGHT}>
					<Link
						to="/register"
						style={{
							color: `white`,
							textDecoration: `none`,
						}}
					>
						<Button className="bp3-minimal" icon="new-person" text="Register" />
					</Link>
					<Link
						to="/login"
						style={{
							color: `white`,
							textDecoration: `none`,
						}}
					>
						<Button className="bp3-minimal" icon="log-in" text="Sign In" />
					</Link>
				</Navbar.Group>
		}
  </Navbar>
	)
}


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header