import { Button } from 'reactstrap';
import SvgIcons from 'components/SvgIcons';
import { FacebookShareButton, FacebookShareCount } from 'react-share';
import React from 'react';
import { string } from 'prop-types';
import { useRouter } from 'next/router';
import './style.scss';

const ShareButton = ({ shareUrl }) => {
  const router = useRouter();
  const url = shareUrl || `${process.env.DOMAIN_URL}${router.asPath}`;

  return (
    <FacebookShareButton url={url}>
      <Button className="share-btn bg-main text-white fz-14 font-weight-bold border-0 px-4 d-flex align-items-center">
        <SvgIcons fileName="ic_share" noHover />
        <FacebookShareCount url={url}>
          {count => (<span>{count}</span> || <span>0</span>)}
        </FacebookShareCount>
        <span className="ml-2">Chia sẻ</span>
      </Button>
    </FacebookShareButton>
  );
};

ShareButton.propTypes = {
  shareUrl: string
};

export default React.memo(ShareButton);
