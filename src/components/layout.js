import React from "react"
import '../styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { Navbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'

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
  
  const navbarLogo = (isBlog) ? data.main_logo_white.childImageSharp.fluid : data.main_logo.childImageSharp.fluid
  const navbarClass = (isBlog) ? 'navbar-blog' : 'navbar-contained'
  const navbarBG = (isBlog) ? 'transparent' : '#F7F7F7'
  const navbarLight = (isBlog) ? false : true
  const navbarDark = (isBlog) ? true : false
  
  return (

    <>

      <div className="fixed-nav-holder">
        <nav id="fixed-nav">
          <ul className="list-unstyled">
            <li>
              <Link to="/" activeClassName="active">
                <FontAwesomeIcon icon={faHome} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/welcome-to-tings-things" activeClassName="active">
                <FontAwesomeIcon icon={faUserCircle} />
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {isBlog &&
      <div className={navbarClass}>
        <Navbar color={navbarBG} light={navbarLight} dark={navbarDark} expand="xl">
          <Link to="/" className="navbar-brand"><Image fluid={navbarLogo} imgStyle={{objectFit: "contain",objectPosition: "50% 50%",}} style={{width: "40px", marginRight: "10px", display: "inline-block"}} /> Ting's Things</Link>
        </Navbar>
      </div>
      }

      <main>{children}</main>

    </>
  )
}

export default Layout
