import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from 'reactstrap'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const isBlog = true

  return (
    <Layout location={location} title={siteTitle} isBlog={isBlog}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className="blog-post-header">
          <Img alt={post.frontmatter.title} fluid={post.frontmatter.full_img.childImageSharp.fluid} />
        </header>
        
        <Container className="blog-post-content">
          <Row>
            <Col lg={{size:8, offset:2}} md={{size:10, offset:1}}>

              <section className="blog-section">
                <p className="date">
                  {post.frontmatter.date}
                </p>
                <h1>
                  {post.frontmatter.title}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </section>

            </Col>
          </Row>
        </Container>

      </article>

      <nav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        full_img{
          publicURL
          childImageSharp{
            fluid(maxWidth:800, quality:100){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
