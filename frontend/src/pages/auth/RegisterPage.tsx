
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import RegistrationForm from "@/components/RegistrationForm"

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-8">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  )
}

export default RegisterPage
