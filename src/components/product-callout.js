/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Img from 'gatsby-image'
import StarRating from '../components/star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmazon } from '@fortawesome/free-brands-svg-icons'

const ProductCallout = ({ product, index }) => {
  return(
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
  )
}
export default ProductCallout
