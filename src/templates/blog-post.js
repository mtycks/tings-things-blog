import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from 'reactstrap'
import StarRating from '../components/star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmazon } from '@fortawesome/free-brands-svg-icons'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
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
        
        <Container>
          <Row>
            <Col className="blog-post-content" lg={{size:8, offset:2}} md={{size:10, offset:1}}>

              <section className="blog-section">
                <p className="date">
                  {post.frontmatter.date}
                </p>

                <h1>
                  {post.frontmatter.title}
                </h1>

                {post.frontmatter.intro && 
                  <p className="blog-intro">{post.frontmatter.intro}</p>
                }

                {post.frontmatter.products && 
                <ul className="product-list list-unstyled">
                    {post.frontmatter.products.map((product,index) => (
                        <li key={index}>
                  
                          <div className={ `product-call-out product-${index+1}` }>
                            <div className="pco-label">{index===0 ? 'Ting\'s Pick' : `No. ${index+1}`}</div>
                            
                            <div className="product-img">
                              <a href={product.link}>
                                <Img alt={product.name} fluid={product.img.childImageSharp.fluid} />
                              </a>
                            </div>
                            <div className="product-details">
                                <h5>{product.name}</h5>
                                <StarRating count={product.starsCount} stars={product.stars} />
                                <a href={product.link} className="btn btn-success btn-block"><FontAwesomeIcon icon={faAmazon} size="lg" /> View on Amazon</a>
                            </div>
                          </div>

                          {product.descriptions.map((description,index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html:description }} />
                          ))}
                  
                        </li>
                    ))}
                </ul>
                }

                <MDXRenderer>{post.body}</MDXRenderer>
              </section>

            </Col>
          </Row>
        </Container>

      </article>

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
          descriptions
          stars
          starsCount
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
