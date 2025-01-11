import Navbar from '../custom/navbar'
import Sidebar from '../custom/sidebar'
import SubjectsList from './components/subjects-list'
import UserInfoContainer from './components/user-info-container'


export default function HomePage() {
  return (
    <>
      <section className=" flex justify-between">
          <Sidebar />

          <div className="w-[85%] px-10 py-6">
            <Navbar/>
            <UserInfoContainer/>
            <SubjectsList />
          </div>
      </section> 
    </>
  )
}
