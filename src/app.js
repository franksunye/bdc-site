// src/app.js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const serve = require('koa-static');

const standardsRouter = require('./routes/api/standards');
const membersRouter = require('./routes/api/members');
const messagesRouter = require('./routes/api/messages');

const pagesRouter = require('./routes/pages/pages');

const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const app = new Koa();

app.use(serve(path.join(__dirname, '..', 'public')));

app.use(views(path.join(__dirname, '..', 'views'), {
  extension: 'ejs'
 }));

app.use(bodyParser());

app.use(standardsRouter.routes()).use(standardsRouter.allowedMethods());
app.use(membersRouter.routes()).use(membersRouter.allowedMethods());
app.use(messagesRouter.routes()).use(messagesRouter.allowedMethods());

app.use(pagesRouter.routes()).use(pagesRouter.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
