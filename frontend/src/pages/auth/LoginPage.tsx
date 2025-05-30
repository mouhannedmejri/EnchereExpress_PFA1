
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LoginForm from "@/components/LoginForm"

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-8">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

export default LoginPage
