import React from 'react'

// styles
import './styles.scss'

const itemImage = [
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  },
  {
    pathImg: '/static/img/image-card-university.png'
  }
]

const CardImage = () => {
  return (
    <div className='wrapper-card-image'>
      <div className='heading-card-image'>
        <p className='total-image'>Hình ảnh (250)</p>
        <p className='detail-image'>Xem tất cả</p>
      </div>

      <div className='content-card-image'>
        {itemImage.map((item, index) =>
          <img className='item-card-image' src={item.pathImg} key={index} alt='image'/>
        )}
      </div>
    </div>
  )
}

export default CardImage
