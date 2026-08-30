const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// API Kuu ya kusajili au kuruhusu namba ya simu kuingia mtandaoni moja kwa moja
app.post('/api/connect-user', (req, res) => {
    const { phone } = req.body;
    
    if (!phone) {
        return res.status(400).json({ success: false, message: 'Weka namba ya simu sahihi.' });
    }

    // Hapa ndipo unaweza kuongeza kitendo cha kuhifadhi kwenye database yako ya mbali baadaye
    console.log(`[Zanwifi] Mteja mwenye namba ${phone} ameunganishwa mafanikio!`);

    res.json({ 
        success: true, 
        message: 'Umeunganishwa na mtandao wa Zanwifi kikamilifu!',
        phone: phone 
    });
});

app.listen(PORT, () => {
    console.log(`Server ya Zanwifi inafanya kazi kwenye port ${PORT}`);
});