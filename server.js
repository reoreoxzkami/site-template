import express from "express";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const GITHUB_TOKEN = "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"; // ←あなたのトークン

app.post("/deploy", async (req, res) => {
  const { name } = req.body;

  try {
    const response = await fetch(
      "https://api.github.com/repos/YOUR_USERNAME/site-template/generate",
      {
        method: "POST",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json"
        },
        body: JSON.stringify({
          owner: "reoreoxzkami",
          name: name,
          private: false
        })
      }
    );

    const data = await response.json();

    res.json({
      message: "Repo created!",
      repo: data.html_url
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
