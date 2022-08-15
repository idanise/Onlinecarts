import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories } from '../components/admin/apiAdmin'
import { getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrice'

const Shop = props => {
  const [myFilters, setMyfilters] = useState({
    filters: { category: [], price: [] }
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState([])
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error)
        console.log('ERROR AddProduct.js init: ', error)
      } else {
        setCategories(data)
      }
    })
  }

  const handlePrice = id => {
    const data = prices
    let array = []

    for (let index in data) {
      if (data[index]._id === parseInt(id)) {
        array = data[index].array
      }
    }

    return array
  }

  // filters/filterBy can be either category or price
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    } else {
      newFilters.filters[filterBy] = filters
    }
    loadFilteredResults(myFilters.filters)
    setMyfilters(newFilters)
  }

  const loadFilteredResults = newFilters => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMore = () => {
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults([...filteredResults, ...data.data])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-warning mb-5'>
          Load More
        </button>
      )
    )
  }

  useEffect(() => {
    init()
    loadFilteredResults(myFilters.filters)
  }, [])

  return (
    <Layout
      className='container-fluid'
      title='Home Page'
      description='Node React E-commerce App'
    >
      <div className='row'>
        <div className='col-4'>
          <h4>Filter by Categeory</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={handleFilters} />
          </ul>
          <h4>Filter by Price</h4>
          <div>
            <RadioBox prices={prices} handleFilters={handleFilters} />
          </div>
        </div>

        <div className='col-8'>
          <h2 className='mb-4'>Search Results</h2>
          <div className='row'>
            {filteredResults.map((product, i) => (
              <div key={i} className='col-4 mb-3'>

              <Card  product={product} />
                       </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  )
}
export default Shop
