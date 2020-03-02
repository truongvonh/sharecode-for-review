import React, { memo } from 'react'
import PropTypes from 'prop-types'

// styles
import './styles.scss'

const SearchArrange = ({ placeholder }) => {
  return (
    <div className='wrapper-head-university'>
      <div className='wrapper-input-search-uni'>
        <input className='search-uni' placeholder={placeholder} />
        <img className='icon-search' src='/static/img/icon-search.svg' alt='icon-search'/>
      </div>
      <div className='wrapper-select-rank'>
        Sắp xếp theo
        <select className='select-rank-university'>
          <option>Từ A - Z</option>
          <option>Số lượng sinh viên theo dõi</option>
          <option>Điểm đánh giá</option>
        </select>
      </div>
    </div>
  )
}

SearchArrange.propTypes = {
  placeholder: PropTypes.string,
  listArrange: PropTypes.array
}

SearchArrange.defaultProps = {
  placeholder: '',
  listArrange: []
}

export default memo(SearchArrange)
