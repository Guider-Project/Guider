export default function NewsContent() {
  const news = [
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

  return (
    <>
      <div className="w-full p-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {news.map((item) => (
            <article
              key={item.id}
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
                  {item.category}
                </span>
                <span className="text-sm">{item.date}</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{item.title}</a>
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green avatar"
                  />
                  <span className="font-medium dark:text-white">{item.author}</span>
                </div>
                <a
                  href={`/news/${item.id}`}
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
