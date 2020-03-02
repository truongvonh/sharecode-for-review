import React from 'react'

// styles
import './styles.scss'

const pointEvaluation = [
  {
    title: 'Học phí',
    totalPoint: 5
  },
  {
    title: 'Cơ sở vật chất',
    totalPoint: 5
  },
  {
    title: 'Hoạt động ngoại khoá',
    totalPoint: 5
  },
  {
    title: 'Môi trường học tập',
    totalPoint: 5
  }
]

const CardReview = () => {
  return (
    <div className='wrapper-card-review'>
      <div className='heading-card-review'>
        <p>Điểm review</p>
        <p className='total-evaluation'>5.0/5.0 <span className='total-user-evaluation'>(500)</span></p>
      </div>

      <div className='content-card-review'>
        {pointEvaluation.map((item, index) =>
          <div className='wrapper-evaluation' key={index}>
            <h6 className='title-point-review'>{item.title}</h6>
            <div className='point-review'>
              <img className='icon-star' src='/static/img/icon-rank-star.svg' alt='icon-star'/>
              <img className='icon-star' src='/static/img/icon-rank-star.svg' alt='icon-star'/>
              <img className='icon-star' src='/static/img/icon-rank-star.svg' alt='icon-star'/>
              <img className='icon-star' src='/static/img/icon-rank-star.svg' alt='icon-star'/>
              <img className='icon-star' src='/static/img/icon-rank-star.svg' alt='icon-star'/>

              <span className='total-point'>{item.totalPoint}.0</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardReview
