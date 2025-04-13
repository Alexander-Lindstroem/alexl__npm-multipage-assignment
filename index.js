import express from "express"
import * as path from "path";
import * as dotenv from "dotenv";
import articleRouter from "./routes/articleRouter.js";
import fetch from "node-fetch"

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("pages/index", {
        headTitle: "Homepage",
        pageTitle: "Welcome",
        currentPage: "home",
    })
})

app.get("/articles", (req, res) => {
    res.render("pages/articles.ejs", {
        headTitle: "Articles",
        pageTitle: "Articles",
        currentPage: "articles",
        currentArticle: "articlesExplanation",
    })
})

app.get("/contact", (req, res) => {
    res.render("pages/contact.ejs", {
        headTitle: "Contact",
        pageTitle: "Contact Me",
        currentPage: "contact",
    })
})

app.get("/words", (req, res) => {
    const API_ENDPOINT = "https://jlpt-vocab-api.vercel.app/api/words"
    const wordQuery = req.query.search

    const fetchWord = async (userSearch) => {
        try {
            let response
            let data
            let retrievedWord
            if (wordQuery === "random" || !wordQuery) {
                response = await fetch(`${API_ENDPOINT}/random`)
                data = await response.json()
                retrievedWord = data
            } else {
                response = await fetch(`${API_ENDPOINT}?word=${userSearch}`)
                data = await response.json()
                retrievedWord = data.words[0]
            }

            if (wordQuery === "random" || wordQuery === "") {
            }
            
            if (retrievedWord) {
                res.render("pages/words.ejs", {
                    headTitle: "Words",
                    pageTitle: "Look up Kanji vocabulary",
                    currentPage: "words",
                    ...retrievedWord
                })
            } else {
                res.render("pages/words.ejs", {
                    headTitle: "Words",
                    pageTitle: "Look up Kanji vocabulary",
                    currentPage: "words",
                    error: "No word found"
                })
            }
        } catch(error) {
            res.render("pages/words.ejs", {
                headTitle: "Words",
                pageTitle: "Look up Kanji vocabulary",
                currentPage: "words",
                error: error
            })
        }
    }
    fetchWord(wordQuery)
})

app.use("/articles", articleRouter)


app.listen(PORT, () => console.log(`✅ listening on port ${PORT} ➡️ http://localhost:${PORT}`))