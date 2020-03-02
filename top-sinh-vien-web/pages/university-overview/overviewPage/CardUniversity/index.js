import React from 'react'

// album-detail
import StatusPost from 'components/common/StatusPost'
import InfoUser from 'components/common/InfoUser'

// styles
import './styles.scss'

const CardUniversity = () => {
  return (
    <div className='wrapper-card-university'>
      <h5 className='heading-card'>Review trường học (300)</h5>
      <div className='content-card'>
        <InfoUser/>
        <div className='poster-content'>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s</p>
          <img src='/static/img/img-post.png' alt='img-university'/>
        </div>

        <StatusPost/>
      </div>
    </div>
  )
}

export default CardUniversity
