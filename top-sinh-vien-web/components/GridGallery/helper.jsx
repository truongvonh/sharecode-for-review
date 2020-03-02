import React from 'react';
import Layouts from './layouts.js';

const Helper = {

  getOneImageLayout(images, style, onImageSelect) {
    return (
      <div className="one-image-layout" style={Object.assign({}, style.root, { height: 'auto' })}>
        <img onClick={(e) => onImageSelect && onImageSelect(e, images[0].src, 0)} src={images[0].src} style={Object.assign({}, style.img,  { width: '100%' })} />
      </div>
    );
  },

  getTwoImageLayout(images, style, onImageSelect) {
    const score1 = Layouts['_l2_1'].getScore(images);
    const score2 = Layouts['_l2_2'].getScore(images);

    const img1Style = { ...style.img, paddingTop: '50%', backgroundImage: `url(${images[0].src})` };
    const img2Style = { ...style.img, paddingTop: '50%', backgroundImage: `url(${images[1].src})` };

    if (score1 < score2) {
      const params = Layouts['_l2_1'].getParams();
      img1Style.width = params[0].width + '%';
      img2Style.width = params[1].width + '%';
    } else {
      const params = Layouts['_l2_2'].getParams();
      img1Style.width = params[0].width + '%';
      img2Style.width = params[1].width + '%';
    }

    return (
      <div className="two-image-layout"  style={{ ...style.root, height: 'auto', overflow: 'hidden' }}>
        <div onClick={(e) => onImageSelect && onImageSelect(e, images[0].src, 0)} key={1} style={img1Style} />
        <div onClick={(e) => onImageSelect && onImageSelect(e, images[1].src, 1)} key={2} style={img2Style} />
      </div>
    );
  },

  getThreeImageLayout(images, style, onImageSelect) {
    let best = {
      score: 999999,
      layout: 1,
      pos: [0, 1, 2],
    };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = j % 3;
        const y = (j + 1) % 3;
        const z = (j + 2) % 3;

        const score = Layouts[`_l3_${i + 1}`].getScore([images[x], images[y], images[z]]);
        if (score < best.score) best = { score: score, layout: i + 1, pos: [x, y, z] };
      }
    }
    const params = Layouts[`_l3_${best.layout}`].getParams();

    const preparedImages = [0,1,2].map((index) => {
      const width = `${params[index].width}%`;
      const height = `${params[index].height}%`;
      const backgroundImage = `url(${images[best.pos[index]].src})`;
      const styl = Object.assign({}, style.img, { width, height, backgroundImage });
      return <div onClick={(e) => onImageSelect && onImageSelect(e, images[best.pos[index]].src, best.pos[index])} key={index} style={styl}></div>;
    });
    return <div className="three-image-layout" style={style.root}>{preparedImages}</div>;
  },

  getFourImageLayout(images, style, remainingImages, onImageSelect) {
    let best = { layout: 1, pos: [0,1,2,3] };
    best.score = Layouts['_l4_1'].getScore(images);
    for (let i = 2; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const w = j % 4;
        const x = (j + 1) % 4;
        const y = (j + 2) % 4;
        const z = (j + 3) % 4;

        const score = Layouts[`_l4_${i}`].getScore([images[w], images[x], images[y], images[z]]);
        if (score < best.score) best = { score: score, layout: i, pos: [w, x, y, z] };
      }
    }

    const params = Layouts[`_l4_${best.layout}`].getParams();
    const preparedImages = [0,1,2,3].map((index) => {
      const width = `${params[index].width}%`;
      const height = `${params[index].height}%`;
      const backgroundImage = `url(${images[best.pos[index]].src})`;
      const styl = Object.assign({}, style.img, { width, height, backgroundImage });
      const showMore = index == 3 && remainingImages && remainingImages.length;

      return <div key={index} onClick={(e) => onImageSelect && onImageSelect(e, images[best.pos[index]].src, best.pos[index])} style={styl}>{showMore ? <div style={style.more}>+ {remainingImages.length}</div> : null}</div>;
    });
    return <div className='four-image-layout' style={style.root}>{preparedImages}</div>;
  },

  getFiveImageLayout(images) {
    return <p>5 images not suported yet</p>;
  },
};

export default Helper;
