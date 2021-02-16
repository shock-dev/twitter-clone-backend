import express from 'express';

const app = express();
const port = 3000;

app.use(express.json())

app.listen(port, (): void => {
    console.log(`Server has been started at ${port} port`);
});
