import express from "express";
import { Product } from "../models/Product.js";
import Fuse from "fuse.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.search;

  let products = await Product.findAll();

  if (search) {
    // Split search string into terms (split on space or '+')
    const searchTerms = search.split(/\s|\+/).filter(Boolean);
    // Set up Fuse.js options for fuzzy search on name and keywords
    const fuse = new Fuse(products, {
      keys: ["name", "keywords"],
      threshold: 0.3,
      includeScore: true,
    });
    // Search for the full query first (joined by space)
    const fullQuery = searchTerms.join(" ");
    const fullQueryResults = fuse.search(fullQuery);
    // Then search for each individual term
    let individualResults = [];
    for (const term of searchTerms) {
      individualResults = individualResults.concat(fuse.search(term));
    }
    // Combine results, prioritizing full query matches
    const productMap = new Map();
    // Add full query matches first
    for (const result of fullQueryResults) {
      productMap.set(result.item.id, {
        item: result.item,
        score: result.score,
      });
    }
    // Add/merge individual term matches
    for (const result of individualResults) {
      if (productMap.has(result.item.id)) {
        // If already present, keep the lower (better) score
        productMap.set(result.item.id, {
          item: result.item,
          score: Math.min(productMap.get(result.item.id).score, result.score),
        });
      } else {
        productMap.set(result.item.id, {
          item: result.item,
          score: result.score,
        });
      }
    }
    // Sort by score (lower is more relevant)
    products = Array.from(productMap.values())
      .sort((a, b) => a.score - b.score)
      .map((entry) => entry.item);
  }

  res.json(products);
});

export default router;
