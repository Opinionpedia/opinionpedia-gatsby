import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {Navbar, Button, Alignment} from "@blueprintjs/core"
import "@blueprintjs/core/lib/css/blueprint.css";



const Header = ({ siteTitle }) =>  (
  <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
        <Navbar.Divider />
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Button className="bp3-minimal" icon="home" text={siteTitle} />
        </Link>
        <Button className="bp3-minimal" icon="document" text="Files" />
    </Navbar.Group>
  </Navbar>
)


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header