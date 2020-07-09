import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useCookies } from 'react-cookie';
import Logo from '../components/logo'
import HeaderMenu from '../components/headerMenu'
import {Popover, Menu, Position, Navbar, Button, Alignment} from "@blueprintjs/core"
import "@blueprintjs/core/lib/css/blueprint.css";


const Header = () =>  {
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
		</Navbar.Group>
		<HeaderMenu />
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