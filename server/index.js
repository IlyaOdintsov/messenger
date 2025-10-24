require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const redisClient = require('./service/redis');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(fileUpload());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		await redisClient.connect();

		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
