const express = require('express');
const { HowLongToBeatService } = require('howlongtobeat');
const cors = require('cors');

const app = express();
const hltbService = new HowLongToBeatService();

app.use(cors());
app.use(express.json());

// Головний маршрут для пошуку
app.get('/search', async (req, res) => {
    const gameName = req.query.q;
    if (!gameName) {
        return res.status(400).json({ error: 'Missing game name (q)' });
    }

    try {
        const results = await hltbService.search(gameName);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from HLTB' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
