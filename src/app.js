// src/app.js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');

const standardsRouter = require('./routes/api/standards');
const membersRouter = require('./routes/api/members');
const messagesRouter = require('./routes/api/messages');

const homePageRouter = require('./routes/pages/home');
const standardsPageRouter = require('./routes/pages/standards');
const memberApplyPageRouter = require('./routes/pages/memberApply');
const memberQueryPageRouter = require('./routes/pages/memberQuery');
const messagePageRouter = require('./routes/pages/message');

const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const app = new Koa();

app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
 }));

app.use(bodyParser());
app.use(standardsRouter.routes()).use(standardsRouter.allowedMethods());
app.use(membersRouter.routes()).use(membersRouter.allowedMethods());
app.use(messagesRouter.routes()).use(messagesRouter.allowedMethods());

app.use(homePageRouter.routes()).use(homePageRouter.allowedMethods());
app.use(standardsPageRouter.routes()).use(standardsPageRouter.allowedMethods());
app.use(memberApplyPageRouter.routes()).use(memberApplyPageRouter.allowedMethods());
app.use(memberQueryPageRouter.routes()).use(memberQueryPageRouter.allowedMethods());
app.use(messagePageRouter.routes()).use(messagePageRouter.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
