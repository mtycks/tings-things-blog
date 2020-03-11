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

    <Container>
      <Row>
        <Col lg={{size:8, offset:2}} md={{size:10, offset:1}}>

        <Layout location={location} title={siteTitle}>
            <SEO title="Welcome to Ting's Things!" />
            <div className="homepage-cards">
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <article key={node.fields.slug} className="blog-card">
                    <Link to={node.fields.slug}>
                      <Img alt={node.frontmatter.title} fluid={node.frontmatter.full_img.childImageSharp.fluid} />
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
          </Layout>

        </Col>
      </Row>
    </Container>



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
