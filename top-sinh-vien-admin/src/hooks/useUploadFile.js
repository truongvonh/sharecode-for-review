import { useState } from 'react';
import { COMMON_ENDPOINT } from './../api/constant';

const useUploadFile = (initState = [], key, multi = false) => {
  console.log('initState', initState);
  const [files, setFiles] = useState(initState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onUploadFile = async files => {
    setLoading(true);
    if (!files.length) {
      setFiles([]);
      setLoading(false);
    } else {
      try {
        const data = await COMMON_ENDPOINT.UPLOAD_PHOTOS(Object.values(files), key);
        if (data.length) setFiles(prev => (multi ? [...prev, ...data] : data));
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const onClearFiles = () => {
    console.log('remove');
    setFiles([]);
  };

  return [files, onUploadFile, loading, onClearFiles];
};

export default useUploadFile;
