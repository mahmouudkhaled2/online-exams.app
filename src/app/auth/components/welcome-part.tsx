import Image from "next/image";
import welcomeImage from '@/../public/assets/images/welcome-img.png'

export default function Welcome() {
  return (
    <>
      <div className="bg-[#f0f4fc] p-10 rounded-tr-[80px] rounded-br-[80px] shadow-r col-span-5">
        <div className="mb-10">
            <h2 className="text-4xl font-bold mb-5">Welcome to</h2>
            <h2 className="text-5xl font-bold mb-5 text-blue-800">Elevate</h2>
            <p className="text-md">Quidem autem voluptatibus qui quaerat aspernatur
            architecto natus</p>
        </div>

        <Image src={welcomeImage} alt={"Welcome Image"} width={400} className="mx-auto"/>
      </div>
    </>
  )
}
