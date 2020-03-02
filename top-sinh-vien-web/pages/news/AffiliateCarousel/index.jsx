import React from 'react';
import { chunkArray, getNestedObjectSafe } from 'utils/helper';
import { Carousel, CarouselControl, CarouselItem } from 'reactstrap';
import { Link } from 'routes/routesConfig';
import ImageWithFallback from 'components/ImageWithFallback';
import { array } from 'prop-types';
import SvgIcons from 'components/SvgIcons';

const AffiliateCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const itemsChunk = React.useMemo(() => {
    const addHotNews = [{
      url: 'fire',
      name: 'Có gì hot'
    },  ...items ];
    return chunkArray(addHotNews, 4);
  }, [items]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemsChunk.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemsChunk.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const renderSlides = (items, key) => items.length > 0 &&
    <CarouselItem onExiting={() => setAnimating(true)}
                  onExited={() => setAnimating(false)}
                  key={key} >
      <div className="row">
        { items.length > 0 ? items.map((item, index) => (
          <div className="col-3 d-flex flex-column" key={index}>
            <div className="affiliate-wrapper rounded-circle cursor-pointer overflow-hidden flex-shrink-0"
                  style={{
                    minHeight: 'calc(100% - 25px)',
                    background: !index ? '#fff' : '#eee',
                    width: !index ? '100%' : 'auto'
                  }}>
              { !index ? (
                <SvgIcons fileName={item.url} width={100} height={100} />
              ) : (
                <Link route={getNestedObjectSafe(item, ['link'])}>
                  <a target="_blank" className="d-block rounded-circle overflow-hidden">
                    <ImageWithFallback alt={getNestedObjectSafe(item, ['name'])}
                                       className="carousel-img"
                                       src={getNestedObjectSafe(item, ['photos', 0, 'origin'])} />

                  </a>
                </Link>
              )}
            </div>
            <p className="mb-0 mt-2 fz-12 text-nowrap font-weight-bold color-main text-center mt-auto">{ getNestedObjectSafe(item, ['name']) }</p>
          </div>
        )) : '' }
      </div>
    </CarouselItem>;

  return (
    <div className="p-0 p-lg-2 mb-4">
      { itemsChunk.length > 0 ? (
        <Carousel activeIndex={activeIndex}
                  next={next}
                  ride={true}
                  previous={previous} >
          { itemsChunk.length > 0 ? itemsChunk.map((chunkEl,index) => renderSlides(chunkEl, index)) : '' }
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      ) : null }
    </div>
  );
};

AffiliateCarousel.propTypes = {
  items: array
};

export default React.memo(AffiliateCarousel);
