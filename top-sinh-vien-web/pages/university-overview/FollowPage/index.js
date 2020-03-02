import React from 'react'

// album-detail
import CardUserFollow from './CardUserFollow'
import SearchArrange from 'components/common/SearchArrange'

// styles
import './styles.scss'

const listUserFollow = [
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  },
  {
    pathAvatarUser: '/static/img/avatar-user-2.png',
    username: 'Mai Hương',
    universityName: 'Đại Học Kinh Tế Đà Nẵng'
  }
]

const Follow = () => {
  return (
    <>
      <div className='wrapper-search'>
        <SearchArrange
          placeholder='Tìm kiếm sinh viên…'
        />
      </div>

      <div className='wrapper-list-user-follow'>
        {listUserFollow.map((item, index) =>
          <CardUserFollow
            key={index}
            pathAvatarUser={item.pathAvatarUser}
            username={item.username}
            universityName={item.universityName}
          />
        )}
      </div>
    </>
  )
}

export default Follow
