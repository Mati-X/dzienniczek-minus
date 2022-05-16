
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

const { Keystore, AccountTools, VulcanHebe } = require('vulcan-api-js');

app.get('/', (req, res) => {

    const keystore = new Keystore();

keystore.loadFromJsonFile("keystore.json");

const client = new VulcanHebe(keystore, AccountTools.loadFromJsonFile("account.json"));

var gradesList = {}
        client.selectStudent().then(() => {
            client.getGrades().then(grades => {
                let a = 0;
                grades.forEach(grade => {
                        console.log(grade)
                        if(gradesList[grade.column.subject.name] == undefined)
                            gradesList[grade.column.subject.name] = []
                        gradesList[grade.column.subject.name].push([grade.content])
                    })
                    console.log(gradesList)
                res.render('index', {gradesList: gradesList})

            })
            
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
