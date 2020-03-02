import React from 'react'

// styles
import './NavbarSearch.scss'

const ListUniversitySearch = [
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  },
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  },
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  },
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  },
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  },
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  },
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  },
  {
    pathImg: 'static/img/img-mosque.png',
    nameUniversity: 'Cửa hàng Dũng Béo',
    address: 'Địa chỉ: Số 3 Duy Tân, Đà Nẵng'
  }
]

const NavbarSearch = () => {
  return (
    <div className='wrapper-navbar-search'>
      <div className='wrapper-search-university'>
        <input className='navbar-search' placeholder="Tìm kiếm …" />
        <img className='icon-search' src='static/img/icon-search.svg' alt='icon-search'/>
      </div>

      {ListUniversitySearch.map((item, index) =>
        <div className='item-location' key={index}>
          <img className='img-university-location' src={item.pathImg} alt='img-university'/>
          <div className='wrapper-info-detail-location'>
            <h6>{item.nameUniversity}</h6>
            <p className='info-address-location'>{item.address}</p>
            <div className='rating-location'>
              <img src='/static/img/icon-rank-star.svg' alt='icon-star'/>
              <p className='point-rating-university'>4.5/5.0</p>
              <p className='amount-vote-university'>(500)</p>
            </div>
            <div className='acronym-university'>
              <img className='img-ava-university' src='static/img/icon-hat-university.svg' alt='icon-hat'/>
              <p className='represent-name-university'>NUCE, FTU</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavbarSearch
