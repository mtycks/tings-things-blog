import React, { useState } from "react"
import '../styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Layout = ({ children, isBlog }) => {

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      main_logo: file(absolutePath: { regex: "/tt-nav-logo.png/" }) {
        childImageSharp {
          fluid(maxWidth: 75, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      main_logo_white: file(absolutePath: { regex: "/tt-nav-logo-white.png/" }) {
        childImageSharp {
          fluid(maxWidth: 75, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  const navbarLogo = (isBlog) ? data.main_logo_white.childImageSharp.fluid : data.main_logo.childImageSharp.fluid
  const navbarClass = (isBlog) ? 'navbar-blog' : 'navbar-contained'
  const navbarBG = (isBlog) ? 'transparent' : '#F7F7F7'
  const navbarLight = (isBlog) ? false : true
  const navbarDark = (isBlog) ? true : false
  
  return (

    <>
    
      <div className={navbarClass}>
        <Navbar color={navbarBG} light={navbarLight} dark={navbarDark} expand="xl">
          <Link to="/" className="navbar-brand"><Image fluid={navbarLogo} imgStyle={{objectFit: "contain",objectPosition: "50% 50%",}} style={{width: "40px", marginRight: "10px", display: "inline-block"}} /> Ting's Things</Link>
          <NavbarToggler onClick={toggle} color="white" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/tags/">Tags</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
