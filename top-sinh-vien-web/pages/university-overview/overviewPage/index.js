import React from 'react';

// album-detail
import ProfileUniversity from './ProfileUniversity';
import CardUniversity from './CardUniversity';
import CardReview from './CardReview';
import CardImage from './CardImage';

// styles
import './UniversityOverview.scss';

const dataIntroduceUniversity = [
  {
    title: 'Giới thiệu',
    contentIntro: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  {
    title: 'Đào tạo - Tuyển sinh',
    contentIntro: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  }
];

const UniversityOverview = () => {
  return (
    <>
      <div className='wrapper-profile-university'>
        <div className='profile-university-left'>
          {dataIntroduceUniversity.map((item, index) =>
            <ProfileUniversity
              dataProfileUniversity={item}
              key={index}
            />
          )}
        </div>
        <div className='profile-university-center'>
          <CardUniversity/>
        </div>
        <div className='profile-university-right'>
          <CardReview/>
          <CardImage/>
        </div>
      </div>
    </>
  );
};

export default UniversityOverview;
