import React, { useState, useEffect } from "react";
import axios from "axios";
import "./newsfeed.css";
import logo from "../assets/logo.png";

const Newsfeed = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let apiUrl = `https://linesnews.onrender.com/api/news-datas`;

    if (category !== "all") {
      apiUrl = `https://linesnews.onrender.com/api/news-datas?category=${category}`;
    }
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        setArticles(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  return (
    <>
      <header>
        <div className="app-logo">
          <img src={logo} alt="logo" />
        </div>{" "}
        <div>
          <h1 className="app-name">News Feed</h1>
        </div>
      </header>
      <div className="news-container">
        <select
          className="category-filter"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="SPORTS">Sports</option>
          <option value="POLITICS">Politics</option>
          <option value="WORLD">World</option>
          <option value="TECHNOLOGY">Health</option>
        </select>
        <input
          className="search-filter"
          type="text"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {articles
          .filter((article) =>
            article.attributes.headline.includes(searchQuery, category)
          )
          .map((article, index) => (
            <div key={index} className="news-article">
              <div className="article-img">
                <img
                  className="news-image"
                  src={article.attributes.newsIcon}
                  alt="News Icon"
                />
              </div>
              <div className="article-content">
                <h3 className="news-headline">{article.attributes.headline}</h3>
                <div className="news-info">
                  Source: {article.attributes.newsSource}
                </div>{" "}
                <br />
                <div className="news-info">
                  Hashtags: {article.attributes.hashtags}
                </div>
                <br />
                <div className="news-info">
                  Category: {article.attributes.category}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Newsfeed;
