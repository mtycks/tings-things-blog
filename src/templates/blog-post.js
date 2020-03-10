import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from 'reactstrap'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
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
                <p>{post.frontmatter.intro}</p>

                <ul className="list-unstyled">
                    {post.frontmatter.products.map(product => (
                        <li key={product.name}>
                  
                          <div className="product-call-out">
                            <div className="product-img">
                              <Img alt={product.name} fluid={product.img.childImageSharp.fluid} />
                            </div>
                            <div className="product-details">
                                {product.name}
                            </div>
                          </div>

                          <p>{product.description}</p>
                  
                        </li>
                    ))}
                </ul>

                <MDXRenderer>{post.body}</MDXRenderer>
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
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        intro
        products{
          name
          link
          description
          img{
            childImageSharp{
              fluid(maxWidth:800, quality:100){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
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
