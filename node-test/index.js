// const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const mount = require('koa-mount');

const hash = 'a-hash-string';


const server = new Koa();

server.use(
  (ctx, next) => {
    ctx.status = 200;
    ctx.set('ETag', hash);

    if (ctx.fresh) {
      ctx.status = 304;

      return;
    }

    next();
  },
);

server.use(
  mount('/favicon.ico', (ctx) => {
    ctx.status = 200;
  }),
);

server.use(
  mount('/test.html', (ctx) => {
    const html = fs.readFileSync('test.html', 'utf8');

    ctx.body = html;

    ctx.status = 200;
  }),
);

server.use(
  mount('/test.js', (ctx) => {
    ctx.cookies.set('jk', 'jk', {
      // httpOnly: false,
      httpOnly: true,
      // sameSite: 'strict',
      sameSite: 'lax',
      // sameSite: 'none',
      // secure: true,
    });

    ctx.set({
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=5', // 浏览器缓存时间
    });

    const js = fs.readFileSync('test.js', 'utf8');

    ctx.body = js;

    ctx.status = 200;
  }),
);


server.listen(3000);

console.log('listen: 3000');
