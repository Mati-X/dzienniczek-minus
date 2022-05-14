
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

const { Keystore, AccountTools, VulcanHebe } = require('vulcan-api-js');

app.get('/', (req, res) => {

    const keystore = new Keystore();

keystore.loadFromJsonFile("keystore.json");

const client = new VulcanHebe(keystore, AccountTools.loadFromJsonFile("account.json"));
let gradesList = []
        client.selectStudent().then(() => {
            client.getGrades().then(grades => {
                res.render('index', {grades: grades})
                console.log(grades)
            })
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
