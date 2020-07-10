/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "@blueprintjs/core/lib/css/blueprint.css";
import { Icon, Link } from "@blueprintjs/core";

const Layout = ({ children }) => {

  return (
    <>
      <Header/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 560,
          padding: `2rem 1.0875rem 1.45rem`,

        }}
      >
        <br/>
        <br/>
        <br/>
        <br/>
        
        <main>{children}</main>
        <br/>
        <br/>
        <footer>
          Opinionpedia © {new Date().getFullYear()}, <a href='https://github.com/opinionpedia/'> edit this on github <Icon icon={'git-repo'}/>
          </a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
