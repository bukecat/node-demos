// const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const mount = require('koa-mount');

const server = new Koa();

server.use(
  mount('/test4000img.js', (ctx) => {
    console.log('cookie-jk: ', ctx.cookies.get('jk'));

    const img = fs.readFileSync('test4000img.js');

    ctx.body = img;

    ctx.status = 200;
  }),
);


server.listen(4000);

console.log('listen: 4000');
