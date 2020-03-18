import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from 'reactstrap'
import ProductCallout from '../components/product-callout'
import { FacebookProvider, Comments } from 'react-facebook';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const isBlog = true

  const image = (post.frontmatter.og_img) ? post.frontmatter.og_img.publicURL : post.frontmatter.full_img.publicURL

  return (
    <Layout location={location} title={siteTitle} isBlog={isBlog}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image}
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
                
                {post.frontmatter.disclaimer && 
                  <p><small><em>{post.frontmatter.disclaimer}</em></small></p>
                }

                {post.frontmatter.intro && 
                  <p className="blog-intro">{post.frontmatter.intro}</p>
                }

                {post.frontmatter.products && 
                <ul className="product-list list-unstyled">
                    {post.frontmatter.products.map((product,index) => (
                        <li key={index}>
                          
                          <Row>
                            <Col lg={{size:8, offset:2}}>
                              <ProductCallout product={product} index={index} />
                            </Col>
                          </Row>
                          

                          {product.descriptions && product.descriptions.map((description,index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html:description }} />
                          ))}

                          {product.video && 
                            <div className="embed-responsive embed-responsive-16by9">
                              <iframe title={product.name} className="embed-responsive-item" src={`${product.video}?rel=0`} allowfullscreen></iframe>
                            </div>
                          }
                  
                        </li>
                    ))}
                </ul>
                }

                <MDXRenderer>{post.body}</MDXRenderer>

                <FacebookProvider appId="458336934908569">
                  <Comments href={`https://tingsthings.com${post.fields.slug}`} />
                </FacebookProvider>

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
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        intro
        disclaimer
        products{
          name
          link
          descriptions
          stars
          starsCount
          featured
          video
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
        og_img{
          publicURL
        }
      }
    }
  }
`
