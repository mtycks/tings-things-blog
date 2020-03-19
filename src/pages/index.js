import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from 'reactstrap'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (

        <Layout location={location} title={siteTitle}>
            <SEO title="Welcome to Ting's Things!" />

            <div className="main-header">
              <Img alt="Header background" fluid={data.header_bg.childImageSharp.fluid} />
              <div className="main-logo">
                <Img fluid={data.main_logo_white.childImageSharp.fluid} imgStyle={{objectFit: "contain",objectPosition: "50% 50%",}} style={{width: "40px", display: "inline-block"}} />
                </div>
              <div className="main-header-inner">
                <div className="main-header-text">
                <h2>&ldquo;Let me be every TING you need.&rdquo;</h2>
                </div>
              </div>
            </div>

            <Container className="hp-container">
              <Row>
                <Col className="hp-main-col" lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                  <div className="homepage-cards">
                    {posts.map(({ node }) => {
                      const title = node.frontmatter.title || node.fields.slug;
                      return (
                        <article key={node.fields.slug} className="blog-card">
                          <Link to={node.fields.slug}>
                            <Img
                              alt={node.frontmatter.title}
                              fluid={node.frontmatter.full_img.childImageSharp.fluid}
                            />
                          </Link>

                          <div className="blog-card-details">
                            <header>
                              <p className="date">{node.frontmatter.date}</p>
                              <h3>{title}</h3>
                            </header>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </Col>
              </Row>
            </Container>

          </Layout>





  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    header_bg: file(absolutePath: { regex: "/header-bg.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
            full_img{
              childImageSharp{
                fluid(maxWidth:1000, quality:75){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
