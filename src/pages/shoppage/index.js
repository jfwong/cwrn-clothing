import React from 'react'

import CollectionPreview from '../../components/collection-preview'

import SHOP_DATA from './shop-data'

import './shop-page.scss'

class ShopPage extends React.Component {
  state = {
    collections: SHOP_DATA,
  }

  render() {
    const { collections } = this.state

    return (
      <div className="shop-page">
        {collections.map(({ id, ...others }) => (
          <CollectionPreview key={id} {...others} />
        ))}
      </div>
    )
  }
}

export default ShopPage
