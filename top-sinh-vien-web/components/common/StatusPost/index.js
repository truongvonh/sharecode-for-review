import React from 'react'

import './styles.scss'

const StatusPost = () => {
  return (
    <div className='wrapper-status-post'>
      <div className='item-status'>
        <img src='/static/img/icon-heart.svg' alt='icon-heart'/> 20 <p>Luot thich</p>
      </div>
      <div className='item-status'>
        <img src='/static/img/icon-comment.svg' alt='icon-commnet'/> 17 <p>Binh Luan</p>
      </div>
      <div className='item-status'>
        <img src='/static/img/icon-share.svg' alt='icon-share'/> 20 <p>Chia se</p>
      </div>
    </div>
  )
}

export default StatusPost
