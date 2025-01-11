

export default function QuizInstructions({handleStart}: {handleStart: () => void}) {
  return (
<>
    <p className="text-lg font-medium mb-4">Instructions</p>
    <ul className="mb-5">
        <li>
            Lorem ipsum dolor sit amet consectetur.
        </li>
        <li>
            Lorem ipsum dolor sit amet consectetur.
        </li>
        <li>
            Lorem ipsum dolor sit amet consectetur.
        </li>
        <li>
            Lorem ipsum dolor sit amet consectetur.
        </li>
    </ul>
    <button onClick={handleStart} 
    className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
        Start
    </button>
</>
  )
}
