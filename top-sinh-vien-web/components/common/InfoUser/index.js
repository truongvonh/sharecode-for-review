import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

// styles
import './styles.scss'

const InfoUser = ({ avatarUserUrl, fullName, schoolName, point, updatedAt }) => {
  const handleConvertTimeDate = (time) => {
    const timeConvert = Moment(time).fromNow('d')

    if (timeConvert.includes('minutes')) {
      return timeConvert.replace( /\D+/g, '') + ' phút trước';
    } else if (timeConvert.includes('hours')) {
      return timeConvert.replace( /\D+/g, '') + ' giờ trước';
    } else if (timeConvert.includes('days')) {
      return timeConvert.replace( /\D+/g, '') + ' ngày trước';
    }
  }

  return (
    <div className='wrapper-info-detail-user-post'>
      <div className='wrapper-img-user'>
        <img src={avatarUserUrl} alt='ava-user'/>
      </div>
      <div className='info-user-post'>
        <p>{fullName} <img className='icon-friends-post' src='/static/img/icon-friends.svg'/></p>
        <p>
          <span className='time-user-post'>{handleConvertTimeDate(updatedAt)}</span>
          <img className='icon-dot-post' src='/static/img/icon-dot.svg' alt='icon-dot'/>
          <span className='university-post'>{schoolName}</span>
        </p>
      </div>
      <div className='point-post'>{point.toFixed(1)} / 5.0</div>
    </div>
  );
}

InfoUser.propTypes = {
  avatarUserUrl: PropTypes.string,
  fullName: PropTypes.string,
  schoolName: PropTypes.string,
  point: PropTypes.number,
  updatedAt: PropTypes.string
}

export default InfoUser
