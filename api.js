const bodyParser = require('body-parser');
const express = require('express');
const { exchanges } = require('./db/user');
const app = express()
const PORT = process.env.PORT || 3002;

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.end("Hello world")
})

// TODO ENDPOINTS
/*app.post('/createtodo', async (req, res) => {
    const todoBody = req.body;

    const todo = await todos.create({
        title: todoBody.title,        
        
    });

   todo ? res.status(201).json({msg: "success", data:todo}):res.status(500).json({msg: "Error",data:todo})
})

app.get('/tododata', async (req, res) => {
        const todoData = await todos.find({});
        
            res.json(todoData);
       

});*/

app.get('/exchange-rates', async (req, res) => {
    try {
        const exchangeRates = await exchanges.find();
        res.json(exchangeRates);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new currency exchange rate
app.post('/exchange-rates', async (req, res) => {
    try {
        const { currency, rate } = req.body;
        const newExchangeRate = new exchanges({ currency, rate });
        await newExchangeRate.save();
        res.status(201).json(newExchangeRate);
    } catch (error) {
        console.error('Error adding exchange rate:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`))