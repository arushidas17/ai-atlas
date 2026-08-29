const express = require('express');
const cors = require('cors');
require('dotenv').config();

const toolsRouter = require('./routes/tools');
const categoriesRouter = require('./routes/categories');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/tools', toolsRouter);
app.use('/api/categories', categoriesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));