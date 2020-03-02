import React, { memo, useState } from 'react';
import { Container, Row, Col, Carousel, CarouselItem, CarouselControl, UncontrolledAlert } from 'reactstrap';
import './style.scss';

const items = [
  {
    id: 1,
    url: 'https://dummyimage.com/600x400/000/fff'
  },
  {
    id: 2,
    url: 'https://dummyimage.com/600x400/000/fff'
  },
  {
    id: 3,
    url: 'https://dummyimage.com/600x400/000/fff'
  }
];

const ReviewCarousel = () => {
  const [state, setState] = useState({
    activeIndex: 0,
    animating: false
  });
  const { activeIndex, animating } = state;

  const onExiting = () => setState({ ...state, animating: true });
  const onExited = () => setState({ ...state, animating: false });

  const slides = items => {
    return items.map(item => (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={onExiting}
        onExited={onExited}
        slide={true}
      >
        <Row>
          <Col sm="4">
            <img className="w-100 mb-2" src={item.url} alt="" />
            <img className="w-100 mb-2" src={item.url} alt="" />
          </Col>
          <Col sm="8">
            <UncontrolledAlert color="info" fade={false}>
              <span className="alert-inner--icon">
                <i className="ni ni-like-2" />
              </span>{' '}
              <span className="alert-inner--text">
                <strong>Info!</strong> This is a info alert—check it out!
              </span>
            </UncontrolledAlert>
            <UncontrolledAlert color="success" fade={false}>
              <span className="alert-inner--icon">
                <i className="ni ni-like-2" />
              </span>{' '}
              <span className="alert-inner--text">
                <strong>Success!</strong> This is a success alert—check it out!
              </span>
            </UncontrolledAlert>
            <UncontrolledAlert color="danger" fade={false}>
              <span className="alert-inner--icon">
                <i className="ni ni-like-2" />
              </span>{' '}
              <span className="alert-inner--text">
                <strong>Danger!</strong> This is a danger alert—check it out!
              </span>
            </UncontrolledAlert>
            <UncontrolledAlert color="warning" fade={false}>
              <span className="alert-inner--icon">
                <i className="ni ni-like-2" />
              </span>{' '}
              <span className="alert-inner--text">
                <strong>Warning!</strong> This is a warning alert—check it out!
              </span>
            </UncontrolledAlert>
          </Col>
        </Row>
      </CarouselItem>
    ));
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setState({ ...state, activeIndex: nextIndex });
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setState({ ...state, activeIndex: nextIndex });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>asdfasdfsaf</h2>
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            {slides(items)}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(ReviewCarousel);
