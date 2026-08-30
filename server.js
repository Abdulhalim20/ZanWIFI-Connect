const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Hifadhi ya muda ya wateja (Badaye utahamishia kwenye Database)
let usersDatabase = [];

// API ya Kujisajili (Sign Up)
app.post('/api/signup', (req, res) => {
    const { phone, password } = req.body;
    
    if (!phone || !password) {
        return res.status(400).json({ success: false, message: 'Tafadhali jaza namba ya simu na nenosiri.' });
    }

    const existingUser = usersDatabase.find(u => u.phone === phone);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Namba hii ya simu imeshasajiliwa tayari.' });
    }

    usersDatabase.push({ phone, password });
    console.log(`[Sign Up] Mteja mpya amejisajili: ${phone}`);
    res.json({ success: true, message: 'Umefanikiwa kujisajili! Sasa unaweza kuingia.' });
});

// API ya Kuingia (Sign In)
app.post('/api/signin', (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ success: false, message: 'Weka namba ya simu na nenosiri.' });
    }

    const user = usersDatabase.find(u => u.phone === phone && u.password === password);
    if (!user) {
        return res.status(400).json({ success: false, message: 'Namba ya simu au nenosiri si sahihi.' });
    }

    console.log(`[Sign In] Mteja ameingia mtandaoni: ${phone}`);
    res.json({ success: true, message: 'Umeingia na kuunganishwa na intaneti mafanikio!' });
});

app.listen(PORT, () => {
    console.log(`Server ya Zanwifi inafanya kazi kwenye port ${PORT}`);
});