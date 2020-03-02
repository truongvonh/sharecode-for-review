import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';

// styles
import './styles.scss';
import ImageWithFallback from 'components/ImageWithFallback';

const PopupModalDownload = ({ className, toggle, isOpen, close, ...props }) => {
  const closeBtn = (
    <button className="close" onClick={close}>
      &times;
    </button>
  );

  return (
    <div>
      <Modal isOpen={isOpen} className={'custom-modal'} toggle={toggle}>
        <ModalHeader close={closeBtn}></ModalHeader>
        <div className=" bg-white rounded">
          <div className="p-3 text-center">
            <div className="p-3 pb-3">
              <ImageWithFallback src="/static/img/img_app.png" alt="img-popup" />
            </div>
            <p className="font-weight-bold fz-20">Bạn vui lòng tải App Top Sinh viên để thực hiện chức năng này</p>
            <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
              <a
                href="https://apps.apple.com/vn/app/top-sv-student-life/id1487756807?fbclid=IwAR2SCOmcDWwM0Q8UdeN5iC4b90q2DeJNdOe3hlrkTLtNE0bvsfgZzV23jvM"
                target="_blank"
              >
                <ImageWithFallback
                  src="/static/img/Button_app_store.png"
                  alt="icon-app-store"
                  className="btn-app-store p-2"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.topsinhvien" target="_blank">
                <ImageWithFallback
                  src="/static/img/Button_google_play.png"
                  alt="icon-google-play"
                  className="btn-google-play p-2"
                />
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupModalDownload;
