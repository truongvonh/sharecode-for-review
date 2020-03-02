import React from 'react';

function useMediaQuery(queries = {}, debounce = 500) {
  const mediaQueries = Object.values(queries).map(query =>
    window.matchMedia(query)
  );
  const matchMediaQueries = () =>
    Object.keys(queries).reduce((obj, val, index) => {
      obj[val] = mediaQueries[index].matches;
      return obj;
    }, {});

  const [media, setMedia] = React.useState(matchMediaQueries());

  const resizeDebounce = React.useRef(debounce);
  React.useEffect(() => {
    const updateMedia = () => setMedia(matchMediaQueries());
    const resizeListener = debounce(updateMedia, resizeDebounce.current);

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const active = Object.keys(media)
    .reverse()
    .find(size => media[size]);
  return [active, media];
}

export default useMediaQuery;

// const [active] = useMediaQuery({
//   mobile: "(max-width: 767px)",
//   tablet: "(min-width: 768px)",
//   laptop: "(min-width: 992px)",
//   desktop: "(min-width: 1200px)"
// });
