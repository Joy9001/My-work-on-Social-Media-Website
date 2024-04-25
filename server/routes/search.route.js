const express = require("express");
const router = express.Router();
const { searchController } = require("../controllers/search.controller.js");

router.post("/search-people", searchController);

module.exports = router;
