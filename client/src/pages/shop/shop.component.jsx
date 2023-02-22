import React, {  useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { setCategories } from '../../store/categories/category.action'
import { getCategoriesAndDocuments } from '../../utils/firebase.utils'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import "./shop.styles.scss"

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
        const categoryArray = await getCategoriesAndDocuments('categories');
        dispatch(setCategories(categoryArray))
    }
    getCategoriesMap()
}, [])

  return (
      <Routes>
        <Route index element={ <CategoriesPreview />} />
        <Route path=":category" element={ <Category />} />
    </Routes>
    
  )
}

export default Shop