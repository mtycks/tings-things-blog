/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

const AmazonFeature = (props) => {

  console.log(props)

  return (
    <div className="product-call-out">
      <div className="product-img">
        something
      </div>
      <div className="product-details">
        title
      </div>
    </div>
  )
}

export default AmazonFeature
