import React, { useState } from 'react';
import { Collapse, Container, Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import './style.scss';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import Head from 'components/common/head';
import ImageWithFallback from 'components/ImageWithFallback';
import SvgIcons from 'components/SvgIcons';
import IonicIcons from 'components/IonicIcons';

const ALL_TEXT_LINKS = ['Giới thiệu', 'Đại sứ TOP sinh viên', 'Tính năng nổi bật', 'Cộng đồng'];
const ALL_ANCHOR = ['#top', '#introduce', '#all-feature', '#footer'];

const ALL_SOCIAL_LINK = ['https://www.facebook.com/TOPSinhvien/', 'https://www.instagram.com/topsinhvien/', 'https://www.youtube.com/watch?v=IuvRzwxd9UI'];
const ALL_SOCIAL_ICONS = ['ion-logo-facebook', 'ion-logo-instagram', 'ion-logo-youtube'];

const Header = ({ isTop }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar color="faded"
            className={`${isTop ? 'bg-transparent' : 'bg-main'}  position-fixed w-100 py-0`}
            light expand="lg"
            id="header-landing-page">
      <Container>
        <NavbarBrand className="mr-auto">
          <Link>
            <a href="#to-top">
              <SvgIcons fileName="main_logo"
                        width={50}
                        height={50}/>
            </a>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="w-100 d-flex align-items-md-center justify-content-md-end">
            {ALL_TEXT_LINKS.map((item, index) => (
              <NavItem key={index}>
                <NavLink href={ALL_ANCHOR[index]}
                         className="text-light px-3 font-weight-bold">
                  {item}
                </NavLink>
              </NavItem>
            ))}
            <Button className="border-0 bg-organe shake-anim font-weight-bold text-light mb-3 mb-md-0">
              <a href="https://www.facebook.com/TOPSinhvien/photos/a.664560160605512/926337897761069/?type=3&theater"
                 className="text-white"
                 target="_blank">
                Event HOT
              </a>
            </Button>
            <ul className="pl-2 border-left social-link border-white ml-2 d-flex">
              {ALL_SOCIAL_LINK.map((item, index) => (
                <li key={index}>
                  <a href={item} className="px-2" target="_blank">
                    <IonicIcons name={`icon ${ALL_SOCIAL_ICONS[index]} fz-20 text-white`}/>
                  </a>
                </li>
              ))}
            </ul>
          </Nav>
        </Collapse>

      </Container>
    </Navbar>
  );
};

const MainContent = () => {
  return (
    <>
      <ScrollableAnchor id="to-top">
        <section id="main">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-5 text-center">
                <h2 className="text-white font-weight-bold fz-30">TOP SINH VIÊN</h2>
                <p className="font-weight-bold text-light fz-20">BRING YOUR UNIVERSITY TO THE TOP</p>

                <p className="pt-0 fz-14 text-white text-justify">
                  - Nền tảng dành cho sinh viên viết đánh giá về trường Đại học, Cao đẳng và các địa điểm xung quanh
                  trường. <br/>
                  - Công cụ bình chọn, thi đấu xếp hạng các trường Đại học, Cao đẳng. <br/>
                  - Tính năng kết nối cộng đồng sinh viên Việt Nam: Giao lưu, giải trí, học tập.
                </p>
              </div>
              <div className="col-12 col-lg-7">
                <ImageWithFallback src="static/img/img_laptop.png" alt="TOP SINH VIÊN"/>
              </div>
            </div>
          </div>
        </section>

      </ScrollableAnchor>
    </>
  );
};

const Introduce = () => {

  const allImages = ['img_thumb_01', 'img_thumb_02', 'img_thumb_03', 'img_thumb_04'];
  const renderAllImages = () => allImages.map((item, index) => (
    <div className={`${index === 1 && 'mt-4'} col-6 px-2 pb-3`}
           key={index}>
      <ImageWithFallback src={`static/img/${item}.png`}
                           alt={`image thumb number ${index}`}/>
    </div>
    )
  );

  return (
    <ScrollableAnchor id="introduce">
      <div id="introduce-content" className="container">
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="thumb-wrapper row">
              {/*{ renderAllImages() }*/}
              <ImageWithFallback src="/static/img/img_cover.png" alt="Đại sứ TOP Sinh viên"/>
            </div>
          </div>
          <div className="col-12 col-lg-7 text-center align-items-center d-flex flex-column">
            <div className="introduce-image d-flex w-50 justify-content-center">
              <SvgIcons fileName="main_logo"
                        width={255}
                        height={255}/>
            </div>
            <h2 className="color-main font-weight-bold text-uppercase">
              “Đại sứ TOP Sinh viên”
            </h2>
            <p className="text-secondary fz-16">
              Là một chương trình đặc biệt dành cho sinh viên toàn quốc do TOP Sinh viên tổ chức. Chương trình hướng tới
              các bạn sinh viên yêu thích công nghệ, thích trải nghiệm, muốn tìm hiểu về môi trường Startup, đồng thời,
              các bạn cũng là những sinh viên có hoạt động xã hội tích cực tại chính trường học.
              <br/>
              <br/>
              Để biết thêm chi tiết về chương trình, hãy kết nối với chúng mình qua:
              <br/>
              Hotline: 0981610010
              <br/>
              <a className="color-link mt-1 fz-16 font-weight-bold" href="https://www.facebook.com/TOPSinhvien/"
                 target="_blank">
                Fanpage: TOP Sinh viên
              </a>
            </p>
          </div>
        </div>
      </div>
    </ScrollableAnchor>
  );
};

const AllFeature = () => {
  const allContent = [
    'Bình chọn, thi đấu xếp hạng các trường Đại học, Cao đẳng',
    'Đánh giá, chia sẻ trải nghiệm về các địa điểm xung quanh trường',
    'Đánh giá các trường đại học cao đẳng',
    'Góc giải trí'
  ];

  const renderAllFeatureItem = () => {
    return (
      [5, 6, 7, 8].map((item, index) => (
        <div className="col-12 col-md-6 col-lg-3 px-lg-2 mb-3 align-items-stretch" key={item}>
          <div className="feature-item shadow rounded overflow-hidden h-100 position-relative">
            <div className="thumb p-5 text-center overflow-hidden">
              <ImageWithFallback src={`static/img/img_thumb_0${item}.png`}
                                 alt={allContent[index]}/>
            </div>
            <div
              className="content p-3 text-center bg-white position-absolute w-100 d-flex align-items-center justify-content-center">
              <p className="text-secondary fz-16 mb-0 font-weight-bold">
                {allContent[index]}
              </p>
            </div>
          </div>
        </div>
      ))
    );
  };

  return (
    <ScrollableAnchor id="all-feature">

      <div id="all-feature-content" className="py-5 mt-5 bg-light">
        <h2 className="text-center text-uppercase color-main fz-30 font-weight-bold">
          TÍNH NĂNG NỔI BẬT
        </h2>
        <div className="container">
          <div className="row pt-5">
            {renderAllFeatureItem()}
          </div>
        </div>
      </div>
    </ScrollableAnchor>
  );
};

const Footer = () => {

  const allContact = [
    'Địa chỉ: 47 Lê Văn Thiêm, Sơn Trà, Đà Nẵng',
    'Hotline: 0981610010',
    'Email: marketing@topsinhvien.com'
  ];

  return (
    <ScrollableAnchor id="footer">
      <div id="footer-main" className="position-relative">
        <div className="container position-relative">
          <div className="row">
            <div className="col-12 col-lg-7">
              <h2 className="text-center text-white font-weight-bold text-uppercase">
                TẢI NGAY APP TOPSV <br/>
                để trải nghiệm toàn bộ tính năng hấp dẫn
              </h2>
              <div className="row d-flex">
                <div className="col-8 col-md-6 mx-auto mx-md-0">
                  <h3 className="text-center font-weight-bold text-white my-3 fz-16">Liên hệ</h3>
                  <ul className="pl-0 mb-0">
                    {allContact.map((item, index) => (

                      <li key={index} className="text-white font-weight-bold py-2 fz-14">
                        <a className="text-white" href="mailto:marketing@topsinhvien.com">
                          {item}
                        </a>
                      </li>

                    ))}
                  </ul>
                </div>
                <div className="col-8 col-md-6 mx-auto mx-md-0">
                  <h3 className="text-center font-weight-bold text-white my-3 fz-16">Tải app ở đây</h3>
                  <div className="d-flex justify-content-between flex-column align-items-center">
                    <a href="https://apps.apple.com/us/app/top-sv-student-life/id1487756807?ls=1"
                       target="_blank"
                       className="ic-app-store">
                      <ImageWithFallback src="static/img/ic_apple.png" alt="download apple for this app"/>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.topsinhvien" target="_blank">
                      <ImageWithFallback src="static/img/ic_android.png" alt="download android for this app"/>
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sub text-center py-3 bg-main position-absolute w-100">
          <small className="fz-14 text-white">TOPSV - Cộng đồng sôi động dành cho sinh viên © 2019</small>
        </div>
      </div>
    </ScrollableAnchor>
  );
};

const LandingPage = () => {

  const [isTop, setTop] = React.useState(true);

  React.useEffect(() => {
    const isBrowser = typeof window !== 'undefined';

    function handleScroll() {
      if (window.scrollY > 0) setTop(false);
      else setTop(true);
    }

    if (isBrowser) {
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('load', handleScroll, true);
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('load', handleScroll);
      }
    };
  }, []);

  React.useEffect(() => {
    configureAnchors({
      offset: -100,
      scrollDuration: 400
    });
  }, []);

  return (
    <div className="check-scroll">
      <Header isTop={isTop}/>
      <Head ogImage={'static/img/img_logo.png'}
            description={'Cộng đồng TopSV Việt Nam'}
            title="Giới thiệu cộng đồng TopSV Việt Nam"/>
      <MainContent/>

      <NavLink href="#to-top" className={`${isTop && 'is-top'} scroll-top-btn  position-fixed`}>
        <ImageWithFallback src="static/img/ic_top.png"/>
      </NavLink>
      <Introduce/>
      <AllFeature/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
