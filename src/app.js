const express = require('express');
const { loginRouter, userRouter, categoryRouter, postRouter } = require('./routers');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

// ...

module.exports = app;
