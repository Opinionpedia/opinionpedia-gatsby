import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useCookies } from 'react-cookie';
import Logo from './logo'
import {Popover, Menu, Position, Navbar, Button, Alignment} from "@blueprintjs/core"
import "@blueprintjs/core/lib/css/blueprint.css";

const logout = removeCookie => {
	removeCookie('jwt')
	window.location = '/';
}

const HeaderMenu = () =>  {
	const [cookies, setCookie, removeCookie] = useCookies(['account']);
	const loggedIn = cookies['jwt'] ? true : false //TODO: check if valid
	
	return (
		<>
			<Navbar.Group className="wideNavMenu" align={Alignment.RIGHT}>
				{ 
				loggedIn ? 	
					<>	
						<Link
							to="/create"
							style={{
							color: `white`,
							textDecoration: `none`,
							}}
						>
							<Button className="bp3-minimal" icon="add-to-artifact" text="Create Question" />
						</Link>
						<Button className="bp3-minimal" icon="log-out" text="Logout" onClick={ () => logout(removeCookie) } />
					</>
				:
					<>
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
						</>
				}
				<Link
					to="/about-us"
					style={{
					color: `white`,
					textDecoration: `none`,
					}}
				>
					<Button className="bp3-minimal" icon="lightbulb" text="About Us" />
				</Link>
			</Navbar.Group>

			<Navbar.Group className="smallNavMenu" align={Alignment.RIGHT}>
				<Popover content={
					<Menu>
						{ 
						loggedIn ? 	
							<>	

								<Link
									to="/create"
									style={{
										color: `inherit`,
										textDecoration: `none`,
									}}
								>
									<Menu.Item icon="add-to-artifact" text="Create Question" href="/create" />
								</Link>
									<Menu.Item icon="log-out" text="Logout" onClick={ () => logout(removeCookie) } />
							</>
						:
							<>
								<Link
									to="/register"
									style={{
										color: `inherit`,
										textDecoration: `none`,
									}}
								>
									<Menu.Item icon="new-person" text="Register" />
								</Link>
								<Link
									to="/login"
									style={{
										color: `inherit`,
										textDecoration: `none`,
									}}
								>
									<Menu.Item icon="log-in" text="Sign In" />
								</Link>
							</>
						}
						<Menu.Divider />
						<Link
									to="/about-us"
									style={{
										color: `inherit`,
										textDecoration: `none`,
									}}
						>
							<Menu.Item icon="lightbulb" text="About Us"/>
						</Link>
					</Menu>
				} position={Position.RIGHT_TOP}>
					<Button className="bp3-minimal" icon="menu" text="Menu" />
				</Popover>
			</Navbar.Group>
		</>
	)
}

export default HeaderMenu