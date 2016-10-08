import React from 'react'
import {connect } from 'react-redux'
import {increaseAction, decreaseAction} from '../../Action'
import {Link} from 'react-router'
import img from '../../../images/1.png'
require('./styles.css')
let Counter = React.createClass({

  render(){
    const { value, onIncreaseClick, onDecreaseClick } = this.props
    return <div>
        <span className="value">{value}</span>
        <button className="button" onClick={onIncreaseClick}>Increase</button>
        <button onClick={onDecreaseClick}>Decrease</button>
        <Link to='/hello'>
        <span>click me!</span>
        </Link>
        <section>
          <h2>Heading</h2>
          <img src={img} alt="bird"/>
        </section>
      </div>
    }
  })
  function mapStateToProps(state) {
    return {
      value: state.count
    }
  }

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
