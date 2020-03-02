import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
import i18nextMiddleware from 'i18next-express-middleware';
import Backend from 'i18next-node-fs-backend';
import i18n from '../i18n';
import routesConfig from './../routes/routesConfig';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const customReq = ({ req, res, route, query }) => {
  app.render(req, res, route.page, query);
};

const handle = routesConfig.getRequestHandler(app, customReq);

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      fallbackLng: 'vi',
      preload: ['vi'],
      ns: 'translations',
      backend: {
        loadPath: path.join(__dirname, '..', '/locales/{{lng}}/{{ns}}.json'),
        addPath: path.join(__dirname, '..', '/locales/{{lng}}/{{ns}}.missing.json')
      }
    },
    () => {
      app.prepare().then(() => {
        const server = express();

        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(cookieParser());
        server.use(compression());
        server.use(i18nextMiddleware.handle(i18n));
        server.use('/locales', express.static(path.join(__dirname, '..', '/locales')));

        server.use('/firebase-messaging-sw.js', (req, res, next) => {
          res.setHeader('content-type', 'text/javascript;charset=UTF-8');
          return res.end('');
        });

        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));

        server.get('/apple-app-site-association', (req, res) => {
          return res.json({
              'applinks': {
                'apps': [],
                'details': [
                  {
                    'appID': 'H6Y5HFN97G.com.topsv',
                    'paths': ['*']
                  },
                  {
                    'appID': '2D3H2X8TYX.com.topsv',
                    'paths': ['*']
                  }
                ]
              }
            }
          );
        });

        server.get('*', (req, res) => {
          return handle(req, res);
        });

        server.listen(port, err => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${port}`);
        });
      });
    }
  );
