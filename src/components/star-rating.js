/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasStar, faStarHalfAlt as fasStarHalf } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'


library.add(fasStar, farStar, fasStarHalf)

const StarRating = ({stars, count}) => {
  
  const generateStars = () => {

    let generatedStars = []

    //Loop through
    for( let i = 1; i <= stars; i++ ){

      //If i is less than or equal to total stars, let's give it a solid icon
      if( i <= stars ){
        generatedStars.push(<FontAwesomeIcon icon={fasStar} />) 
      }

    }

    //If we have a ".5" in our stars, let's add a half-star here
    if( stars % 1 === .5 ){
      generatedStars.push(<FontAwesomeIcon icon={fasStarHalf} />) 
    }

    //If stars is less than four, we need to add a blank star
    if( stars < 5 ){

      let emptyStars = 5 - stars

      for( let i = 1; i <= emptyStars; i++ ){
        generatedStars.push(<FontAwesomeIcon icon={farStar} />) 
      }
      
    }

    return generatedStars

  }



  return(

    <div className="star-ratings">
      {generateStars()} ({count} ratings)
    </div>

  )

}
export default StarRating
