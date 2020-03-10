/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
const AmazonFeature = ({ title, children }) => (
  <div className="product-call-out">{children} {title}</div>
)
export default AmazonFeature
