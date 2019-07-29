import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview'
import withSpinner from '../../components/with-spinner'
import CollectionPage from '../collectionpage'

import { updateCollections } from '../../redux/shop/shop-actions'

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../utils/firebase'

import './shop-page.scss'

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionPageWithSpinner = withSpinner(CollectionPage)

class ShopPage extends React.Component {
  state = {
    loading: true,
  }

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections')

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      this.setState({ loading: false })
    })
  }

  render() {
    const { match } = this.props
    const { loading } = this.state

    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collections => dispatch(updateCollections(collections)),
})

export default connect(
  null,
  mapDispatchToProps,
)(ShopPage)
