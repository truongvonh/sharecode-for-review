import React, { memo } from 'react'
import PropTypes from 'prop-types'

// styles
import './styles.scss'

const CardUserFollow = ({
  pathAvatarUser,
  username,
  universityName
}) => {
  return (
    <div className='wrapper-card-user-follow profile-pic'>
      <div className='item-card-follow'>
        <div className='wrapper-image-user'>
          <img src={pathAvatarUser} alt='avatar-user'/>
        </div>
        <div className='wrapper-info-user'>
          <h6 className='username-info'>{username} <img src='/static/img/icon-friends.svg' alt='icon'/></h6>
          <p className='name-university'>{universityName}</p>
          <button className='follow-btn'>Đang theo dõi</button>
        </div>
      </div>
    </div>
  )
}

CardUserFollow.propTypes = {
  pathAvatarUser: PropTypes.string,
  username: PropTypes.string,
  universityName: PropTypes.string,
}

CardUserFollow.defaultProps = {
  pathAvatarUser: '',
  username: '',
  universityName: ''
}

export default CardUserFollow
