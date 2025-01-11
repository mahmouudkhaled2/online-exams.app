'use client'

export default function SubmitButton({title, isLoading}: SubmitButtonProps) {
  return (
      <button
      type="submit"
      disabled={isLoading}
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-2xl text-[15px] px-5 py-3 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900">
        {isLoading ? <div className="spinner"></div> : title}
    </button>
  )
}
