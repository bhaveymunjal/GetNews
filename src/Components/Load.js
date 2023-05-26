import React, { Component } from 'react'
import loading from './loading.gif'
export default class Load extends Component {
  static propTypes = {}

  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}

