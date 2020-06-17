import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {Navbar, Button, Alignment} from "@blueprintjs/core"
import "@blueprintjs/core/lib/css/blueprint.css";



const Header = ({ siteTitle }) =>  (
  <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Link
        to="/"
        style={{
          color: `inherit`,
          textDecoration: `none`, 
        }}
      >
        <Button className="bp3-minimal"><img src="/opinionpedia.png" style={{marginBottom:-.4 + "rem", display: "inline", width:2.3 + "rem", height:2.3 + "rem"}}></img></Button>
      </Link>
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
      <Link
        to="/create"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <Button className="bp3-minimal" icon="add-to-artifact" text="Create Question" />
      </Link>
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