import { useNavigate  } from 'react-router-dom'
import React from 'react'
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles'

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(category.route)
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage
            style={{ 
            backgroundImage: `url(${category.imageUrl})`
        }} />
        
        <Body>
            <h2>{category.title}</h2>
            <p>Shop Now</p>
        </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem