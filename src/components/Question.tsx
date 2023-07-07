import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Question = ({topic}:string | any) =>{
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<Array<[]> | any>([]);

  //OpenAI API Configurations
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API,
  })
  delete configuration.baseOptions.headers['User-Agent'];
  const openai = new OpenAIApi(configuration);
  
  //Creates the response from the question asked by the user on submit
  //docs used https://platform.openai.com/examples/default-chat
  const handleQuestion = async(e:React.FormEvent) =>{
    e.preventDefault();
    try{
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Q: ${question}\nA: ${topic}`,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      })
      const completion = res.data.choices[0].text;
      setAnswer([...answer, completion]);
      setQuestion("");
    }catch(error){
      console.log(error)
    }
  }
    return(
        <div>
        <form onSubmit={handleQuestion}>
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
          className="block w-full p-4 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Enter A Question About This Topic"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
    {answer.map((a:string, idx:any) =>(
      <p key={idx} className="p-2 m-2 text-white bg-gray-500 border border-gray-100 rounded-lg">{a}</p>
    ))}
        </div>
    )
}

export default Question;