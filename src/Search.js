import React from 'react'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.onSearchAddress = this.onSearchAddress.bind(this)
  }

  render () {
    return (
      <main>
        <p>{this.props.state.query}</p>
        <AddressForm onSearch={this.onSearchAddress} />
      </main>
    )
  }

  onSearchAddress (address) {
    this.props.emit('searchAddress', address)
  }

  shouldComponentUpdate (nextProps) {
    console.log(this.props.state.query !== nextProps.state.query)
    return this.props.state.query !== nextProps.state.query
  }
}

function AddressForm (props) {
  return (
    <div>
      <h2>Search by address</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='address'>Address</label>
        <input name='address' htmlFor='address' />
        <button type='submit'>Search</button>
      </form>
    </div>
  )

  function onSubmit (evt) {
    const addressValue = evt.target.address.value
    console.log('submitted', addressValue)
    evt.preventDefault()
    props.onSearch(addressValue)
    evt.preventDefault()
  }
}

export default Search
