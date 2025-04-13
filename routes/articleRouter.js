import express from "express"

const articleRouter = express.Router()

articleRouter.get("/introduction", (req, res) => {
    res.render("pages/articles", {
        currentArticle: "introduction",
        currentPage: "articles",
        pageTitle: "Introduction to Kanji",
        headTitle: "Kanji",
    })
})

articleRouter.get("/gikun", (req, res) => {
    res.render("pages/articles", {
        currentArticle: "gikun",
        currentPage: "articles",
        pageTitle: "Introduction to Gikun",
        headTitle: "Gikun",
    })
})

articleRouter.get("/ateji", (req, res) => {
    res.render("pages/articles", {
        currentArticle: "ateji",
        currentPage: "articles",
        pageTitle: "Introduction to Ateji",
        headTitle: "Ateji",
    })
})

export default articleRouter