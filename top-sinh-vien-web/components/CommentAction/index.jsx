import React from 'react';
import './style.scss';
import i18n from 'locales/i18n';
import { Button } from 'reactstrap';
import SvgIcons from 'components/SvgIcons';
import { array, bool, func, number, object, string } from 'prop-types';
import { Link } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';
import ImageWithFallback from 'components/ImageWithFallback';
import { compressImageBeforeUpload, getBase64, getNestedObjectSafe } from 'utils/helper';
import TextareaAutosize from 'react-autosize-textarea';
import IonicIcons from 'components/IonicIcons';
import dynamic from 'next/dynamic';
import useModal from 'hooks/useModal';
import { Animated } from 'react-animated-css';
import { Tooltip, Spinner } from 'reactstrap';
import { UPLOAD_IMAGE_ENDPOINT } from 'constants/endpoints';
import { ALL_UPLOAD_TYPE } from 'constants/common';
import { useActions } from 'hooks/useActions';
import { openLoading } from 'redux/common/actions';
import { toast } from 'react-toastify';

const PickEmoji = dynamic(
  () => import('components/PickEmoji'),
  {
    ssr: false,
    loading: () => null
  }
);

const PreviewImagePicker = ({
                              photos = [],
                              loading = false,
                              onRemoveImage = () => null,
                              ...props }) => {

  return photos.length ? (
    <div className="preview-image-picker" { ...props }>
      { photos.map((photo, index) => (
        <div className="preview-item position-relative border border-light rounded p-2 overflow-hidden" key={index}>
          <img src={photo.url} alt="" />
          { loading ?
            <div className="loading-upload">
              <Spinner color="primary" size="xl" className="icon-loading" />
            </div> :
            <IonicIcons name="ion-md-close cursor-pointer text-white fz-50 remove-icon"
                        onClick={() => onRemoveImage(index)} />
          }
        </div>
      )) }
    </div>
  ) : null;
};

PreviewImagePicker.propTypes = {
  photos: array,
  loading: bool,
  onRemoveImage: func
};

const CommentAction = ({
                         user = null,
                         onSubmit = () => null,
                         isReset = false,
                         focusInput = false,
                         upLoadType = ALL_UPLOAD_TYPE.COMMENT,
                         commentData = {},
                         id = 0,
                         ...props
                       }) => {

  const [isShowingEmoji, toggleEmojiPicker, closeEmoji] = useModal(false);
  const [toolTipEmoji, toggleToolTipEmoji] = useModal(false);
  const [tooltipSubmit, toggleTooltipSubmit] = useModal(false);
  const [content, setContent] = React.useState('');
  const [photos, setPhotos] = React.useState([]);
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const inputRef = React.useRef({});
  const fileRef = React.useRef(null);
  const [openLoadingAction] = useActions([
    openLoading
  ]);

  const renderUserAvatar = (user) => (
    <div className="avatar overflow-hidden rounded-circle flex-shrink-0 shadow-lg">
      <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(user._id)}>
        <a className="d-block">
          <ImageWithFallback src={getNestedObjectSafe(user, ['profile', 'avatar', 0, 'thumb'])}
                             alt={getNestedObjectSafe(user, ['profile', 'fullName'])}/>

        </a>
      </Link>
    </div>
  );

  const addEmoji = (emoji) => {
    setContent(`${content}${emoji.native}`);
  };

  const closeNotInteract = () => setTimeout(() => {
    if (isShowingEmoji) closeEmoji();
  }, 2000);

  React.useEffect(() => {
    if (isReset) {
      setContent('');
      closeEmoji();
      setPhotos({});
    }
  }, [isReset]);

  React.useEffect(() => {
    if (focusInput) inputRef.current.focus();
  }, [focusInput]);

  React.useEffect(() => {
    if (Object.values(commentData).length) {
      setContent(commentData.content);
      setPhotos([ { ...commentData.photos, url: getNestedObjectSafe(commentData, ['photos', 0, 'origin' ]) } ]);
      inputRef.current.focus();
    }
  }, [commentData]);

  const triggerClickFile = React.useCallback((e) => {
    e.persist();
    fileRef.current.click();
  }, []);

  const onSelectFile = React.useCallback((e) => {
    const file = e.target.files[0];
    const checkFile = file instanceof File;

    if(checkFile) {
      getBase64(file, dataURL => {
        Object.assign(file, { url: dataURL });
        setPhotos([file]);
      });
    }
  }, [photos.length]);

  const onPreSubmit = React.useCallback(async (e) => {
    if (content) {
      e.preventDefault();
      let fileUploaded = [];
      openLoadingAction();

      if (photos.length) {
        setUploadLoading(true);
        try {
          const compressFile = await compressImageBeforeUpload({ image: photos[0] });
          fileUploaded = await UPLOAD_IMAGE_ENDPOINT.UPLOAD_FILE({ files: [compressFile], type: upLoadType });
        } catch (errorMessage) {
          toast.error(i18n.t(`error.${errorMessage}`));
        } finally {
          setUploadLoading(false);
        }
      }
      onSubmit({ content, photos: fileUploaded });
    }
  }, [content, photos]);

  return (
    <>
      <form className="d-flex comment-action-wrapper">
        {user && renderUserAvatar(user)}
        <div className="input-comment w-100 mx-2 fz-14 position-relative">
          <TextareaAutosize placeholder={i18n.t('comment')}
                            value={content}
                            onFocus={closeEmoji}
                            ref={inputRef}
                            onChange={e => setContent(e.target.value)}
                            { ...props } />
          <div className="icon-upload position-absolute d-flex align-items-center px-2">
            <IonicIcons name="ion-md-happy fz-24 color-link cursor-pointer d-inline-block mr-2"
                        href="#"
                        id={`toolTipEmoji-${id}`}
                        onClick={toggleEmojiPicker}/>
            <Tooltip placement="bottom"
                     isOpen={toolTipEmoji}
                     target={`toolTipEmoji-${id}`}
                     toggle={toggleToolTipEmoji}>
              Thêm biểu tượng cảm xúc
            </Tooltip>
            <IonicIcons name="ion-md-images fz-24 color-link cursor-pointer d-inline-block"
                        onClick={triggerClickFile}/>
          </div>
          { isShowingEmoji &&
          <Animated animationIn="fadeIn"
                    animationOut="fadeOut"
                    animationInDuration={500}
                    isVisible={isShowingEmoji}>
            <div className="emoji-picker position-absolute"
                 onMouseLeave={closeNotInteract}>
              <PickEmoji addEmoji={addEmoji}
                         autoFocus={true}/>
            </div>
          </Animated>
          }
        </div>
        <Button className="btn-submit bg-main flex-shrink-0 border-0"
                id="toolTipSubmit"
                disabled={uploadLoading}
                onClick={onPreSubmit}>
          <SvgIcons fileName="ic_submit"/>
        </Button>
        <Tooltip placement="left"
                 isOpen={tooltipSubmit}
                 target="toolTipSubmit"
                 toggle={toggleTooltipSubmit}>
          {!content ?
            'Vui lòng nhập nội dung bình luận...' :
            'Gửi bình luận'
          }
        </Tooltip>
      </form>
      <div className="input-file-picker invisible overflow-hidden h-0"
           style={{ height: 0 }}>
        <input type="file"
               ref={fileRef}
               onChange={onSelectFile}
               accept="image/*"
               disabled={uploadLoading}
               multiple={false} />
      </div>
      <PreviewImagePicker photos={photos}
                          loading={uploadLoading}
                          onRemoveImage={(removeIndex) => setPhotos(photos.filter((_, index) => index !== removeIndex))}/>
    </>
  );
};

CommentAction.propTypes = {
  user: object,
  commentData: object,
  onSubmit: func,
  id: number,
  isReset: bool,
  focusInput: bool,
  processComment: bool,
  upLoadType: string
};

export default React.memo(React.forwardRef(CommentAction));
