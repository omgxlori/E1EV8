import express from 'express'; // Use import instead of require
import cors from 'cors'; // Use import instead of require
import quoteRoutes from './routes/quoteRoutes.js'; // Use import and add the .js extension

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
