import { useState } from "react";
import Question from "./Question";

const Topic = () => {
  const [topic, setTopic] = useState<string>("");
  const [topicExtract, setTopicExtract] = useState<string>("");

  //function to search about the topic using wikipedia API
  //stores information in the setTopicExtract useState => then use topicExtract to display information
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`);
        const data = await res.json();
        setTopicExtract(data.extract);
    }catch(error){
        console.log(error)
    }
  };
  return (
    <div className="items-center justify-center h-screen">
    <form onSubmit={handleSearch}>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Enter A Topic"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form> 
      {topicExtract && <div className="p-2 m-2 text-white bg-gray-500 border border-gray-100 rounded-lg">{topicExtract}</div>}
    <Question topic={topic} />
    </div>
  );
};

export default Topic;
