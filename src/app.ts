import express, { json, urlencoded } from 'express';

import TasksRoutes from './routes/tasks';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/task', TasksRoutes);
app.use('/health', (_, res) => res.status(200).json({ message: 'OK' }));

export default app;
