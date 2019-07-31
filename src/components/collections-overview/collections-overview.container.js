import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import CollectionsOverview from './index'
import withSpinner from '../with-spinner'

import { selectIsCollectionsFetching } from '../../redux/shop/shop-selectors'

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
})

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner,
)(CollectionsOverview)

export default CollectionsOverviewContainer
