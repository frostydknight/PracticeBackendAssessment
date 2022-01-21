const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const recipesList = require("./data.json")

app.get('/', (_, res) => {
    res.send('Your Express App')
})

app.get('/recipes', (_, res) => {
    const recipeNames = recipesList.recipes.map( el => el.name)
    res.json({recipeNames})
})

app.get('/recipe/:name', (req, res) => {
    const { name } = req.params
    const allDetails = recipesList.recipes.filter( recipe => recipe.name === name)[0]
    if (!allDetails){
        res.json({})
    } else {
        const details = { ingredients: allDetails.ingredients, numSteps: allDetails.instructions.length}
        res.json({details}) 
    }    
})

app.post('/recipes', (req, res) => {
    const { name, ingredients, instructions } = req.body
    if( name, ingredients, instructions) {
        const checkRecipe = recipesList.recipes.filter( recipe => recipe.name === name)[0]
        if(checkRecipe) {
            res.status = 400
            res.json({error: "Recipe already exists"})
        } else {
            recipesList.recipes.push({ name, ingredients, instructions})
            res.status(201)
            res.end()
        }
    } else {
        res.status = 400
        res.json({error: "Missing details"})
    }
})

app.put('/recipes', (req, res) => {
    const { name, ingredients, instructions} = req.body
    if ( name, ingredients, instructions) {
        const checkRecipe = recipesList.recipes.filter( recipe => recipe.name === name)[0]
        if (checkRecipe) {
            recipesList.recipes.splice(recipesList.recipes.indexOf(name), 1)
            recipesList.recipes.push({ name, ingredients, instructions})
            res.status(204)
            res.end()
        } else {
            res.status(404)
            res.json({ error: "Recipe does not exist"})
        }
    }
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})