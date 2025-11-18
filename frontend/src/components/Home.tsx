import { motion } from "framer-motion"
import Header from "./shared/Header"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <Header/>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-center py-6 mb-6 bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        Manage Your Students Data Smartly
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center max-w-xl text-lg text-gray-300 mb-10"
      >
        Add, update, delete, and visualize your students' records in one beautiful dashboard.
      </motion.p>

      <motion.a
        href="/login"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="px-6 py-3 rounded-xl text-lg font-semibold bg-linear-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-pink-500/50 transition-all"
      >
        Get Started
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="w-full max-w-4xl mt-14"
      >
        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-800">
          {/* <div className="h-64 bg-linear-to-r from-purple-900/40 to-pink-900/40 rounded-2xl" /> */}
          <img 
            src="/students_banner.svg" alt="students_banner"
            className="hover:scale-110 duration-300 ease-out transition-all"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Home
