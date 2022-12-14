import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

const Product = props => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const [relatedProduct, setRelatedProduct] = useState([])
  const { productId } = useParams()

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)
        //fetch related products
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            setRelatedProduct(data)
          }
        })
      }
    })
  }

  useEffect(() => {
    loadSingleProduct(productId)
  }, [productId])

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className='container-fluid'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
            {' '}
            {product && product.description && (
              <Card product={product} showViewProductButton={false} />
            )}
          </div>

          <div className='col-4'>
            <h4>Related Products</h4>
            {relatedProduct.map((p, i) => (
              <div className='mb-3'>
                <Card key={i} product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Product
