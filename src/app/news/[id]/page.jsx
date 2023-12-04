"use client";

import { useState, useEffect } from "react";

import NavBar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import Footer from "@/components/common/footer";

export default function NewsPage({ params }) {
  const NEWS = [
    {
      id: 1,
      title: "Highway Bus Services Resume After Temporary Suspension",
      date: "2 days ago",
      category: "News",
      author: "Admin",
      description:
        "Highway bus services have resumed after a temporary suspension due to a recent natural disaster. Authorities have worked diligently to restore services, providing vital transportation connections once again.",
    },
    {
      id: 2,
      title: "Road Safety Awareness Campaign for Highway Travelers",
      date: "5 days ago",
      category: "News",
      author: "Admin",
      description:
        "In response to recent accidents on Sri Lankan highways, authorities have initiated a road safety awareness campaign. This campaign emphasizes safe driving practices and passenger safety, working to reduce accidents on the road.",
    },
    {
      id: 3,
      title: "Accident on Southern Expressway: Private Bus and Car Collision Injures 11",
      date: "14 days ago",
      category: "News",
      author: "Admin",
      description:
        "A private bus crashed into a Car parked on the side of the Southern Expressway, injuring 11 people. The bus was on an excursion with a group travelling from Colombo, Ambalangoda.",
    },
  ];

  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const news = NEWS.find((item) => item.id === parseInt(params.id));
    if (news) setSelectedNews(news);
  }, [params]);

  return (
    <>
      <NavBar activeTab="news" />

      <Hero background={"bg-newsBus"} title={"News"} />

      <div className="w-full p-24">
        {selectedNews ? (
          <article
            key={selectedNews.id}
            className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                <svg
                  className="mr-1 w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                </svg>
                {selectedNews.category}
              </span>
              <span className="text-sm">{selectedNews.date}</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {selectedNews.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-5">{selectedNews.description}</p>
            <div className="flex items-center">
              <img
                src="https://i.pravatar.cc/100"
                alt="avatar"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="text-sm">
                <p className="text-gray-900 dark:text-gray-200 font-bold">{selectedNews.author}</p>
                <p className="text-gray-700 dark:text-gray-400">{selectedNews.date}</p>
              </div>
            </div>
          </article>
        ) : (
          <h1 className="text-2xl font-semibold text-gray-700">No news found.</h1>
        )}
      </div>

      <Footer />
    </>
  );
}
