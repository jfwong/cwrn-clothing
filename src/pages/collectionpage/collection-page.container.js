import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import withSpinner from '../../components/with-spinner'
import CollectionPage from './index'

import { selectIsCollectionsLoaded } from '../../redux/shop/shop-selectors'

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state),
})

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  withSpinner,
)(CollectionPage)

export default CollectionPageContainer
