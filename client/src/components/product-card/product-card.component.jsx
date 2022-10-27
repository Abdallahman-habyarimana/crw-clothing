
import React from 'react'
import Button from '../botton/button.component'
import "./product-card.styles.scss"

const ProductCard = ({ product }) => {
    const { name, price, imageUrl} = product
  return (
    <div className="product-card-container">
        <img src={imageUrl} />
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType="inverted">Add to card</Button>
    </div>
  )
}

export default ProductCard