const express = require('express');
const bookRouter = require('./src/book/routes/bookRouter');
const userRouter = require('./src/user/routes/userRouter');

const app = express();

app.use('/api', bookRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
