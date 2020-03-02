import React from 'react'

// styles
import './styles.scss'

const ProfileUniversity = ({ dataProfileUniversity }) => {
  return (
    <div className='wrapper-introduce-university'>
      <div className='title-intro'>
        <h5>{dataProfileUniversity.title}</h5>
        <p>Xem tất cả</p>
      </div>
      <p className='content-intro'>
        {dataProfileUniversity.contentIntro}
      </p>
    </div>
  )
}

export default ProfileUniversity
