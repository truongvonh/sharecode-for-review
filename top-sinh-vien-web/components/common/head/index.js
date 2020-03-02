import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultTitle = 'TOP_SINH_VIEN';
const defaultAppName = 'TOP_SINH_VIEN';
const defaultAndroidPackage = 'com.topsinhvien';
const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';
const defaultUrl = 'https://topsinhvien.com';

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || defaultTitle}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
      name="viewport"
    />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css" rel="stylesheet" />

    <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta property="og:description" content={props.description || defaultDescription} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta property="al:ios:url" content={props.app_ios_url} />
    <meta property="al:ios:app_store_id" content="12345" />
    <meta property="al:ios:app_name" content={props.app_name || defaultAppName} />
    <meta property="al:android:url" content={props.app_android_url} />
    <meta property="al:android:app_name" content={props.app_name || defaultAppName} />
    <meta property="al:android:package" content={props.app_android_package || defaultAndroidPackage } />
    <meta property="al:web:url" content={props.url || defaultUrl } />

    <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  app_android_url: string,
  app_name: string,
  app_ios_url: string,
  app_android_package: string,
  ogImage: string
};

export default Head;
