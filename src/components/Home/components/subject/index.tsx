import Image from "next/image"

export default function Subject({subject} : {subject: Subject}) {

  return (
    <>  
        <div className="relative rounded-lg w-full h-[292px] overflow-hidden">
            <Image src={subject?.icon} alt="" fill={true} sizes="100%" className="object-cover" priority/>
            <div className='absolute top-[60%] left-[50%] translate-x-[-50%] bg-[#1100FF66] bg-opacity-70 w-4/5 mx-auto p-5 text-center backdrop-blur rounded-lg'>
                <h3 className="text-white font-medium">{subject?.name}</h3>
            </div>
        </div>
    </>
  )

}

