import UserImage from '@/../public/assets/images/UserInfoImage.png'
import  Image  from 'next/image';

export default function UserInfoContainer() {
  return (
    <>
      <div className='bg-white my-8 rounded-xl'>
        <div className="px-4 py-8 flex flex-col gap-14 md:flex-row ">
          <Image src={UserImage} alt="User Image"/>

          <div className='flex flex-col justify-between w-[55%]'>
            <div>
              <h2 className='text-[32px] text-main font-bold'>Ahmed Mohamed</h2>
              <p className='text-[20px] text-sub-color font-light mt-3'>Voluptatem aut</p>
            </div>

            <div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '80%'}} />
              </div>

              <ul className='flex gap-10 mt-5'>

                <li className='flex gap-4'>
                  <span className='flex justify-center items-center bg-white w-16 h-16 rounded-md shadow-userCard'>
                    <i className="fa-solid fa-flag text-main text-2xl"></i>
                  </span>
                  <div className='flex flex-col justify-between'>
                    <h3 className='text-sub-color text-3xl font-bold'>27</h3>
                    <p className='text-sub-color text-md'>Quiz Passed</p>
                  </div>
                </li>

                <li className='flex gap-4'>
                  <span className='flex justify-center items-center bg-white w-16 h-16 rounded-md shadow-userCard'>
                    <i className="fa-solid fa-flag text-main text-2xl"></i>
                  </span>
                  <div className='flex flex-col justify-between'>
                    <h3 className='text-sub-color text-3xl font-bold'>13 min</h3>
                    <p className='text-sub-color text-md'>Fastest Time</p>
                  </div>
                </li>

                <li className='flex gap-4'>
                  <span className='flex justify-center items-center bg-white w-16 h-16 rounded-md shadow-userCard'>
                    <i className="fa-solid fa-flag text-main text-2xl"></i>
                  </span>
                  <div className='flex flex-col justify-between'>
                    <h3 className='text-sub-color text-3xl font-bold'>27 min</h3>
                    <p className='text-sub-color text-md'>Correct Answers</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
