import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegisterForm({ setShowModal }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className='relative bg-gray-900 text-white p-6 rounded-2xl shadow-2xl max-w-md w-full transform'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Nút đóng */}
          <button
            onClick={() => setShowModal(false)}
            className='absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition'
          >
            <X className='w-5 h-5 text-gray-400' />
          </button>

          {/* Logo */}
          <div className='flex justify-center mb-4'>
            <div className='bg-blue-500 p-3 rounded-full'>
              <span className='text-white text-2xl font-bold'>X</span>
            </div>
          </div>

          {/* Tiêu đề */}
          <h2 className='text-2xl font-bold text-center'>Create Your Account</h2>

          <form className='mt-4'>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Name'
                className='w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              />
            </div>
            <div className='mb-4'>
              <input
                type='email'
                placeholder='Email'
                className='w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-1'>Date of Birth</label>
              <p className='text-xs text-gray-400 mb-3'>
                This won't be shown publicly. Confirm your own age, even if this account is for a business, a pet, or
                something else.
              </p>
              <div className='flex space-x-2'>
                <select className='w-1/3 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option>Month</option>
                </select>
                <select className='w-1/3 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option>Day</option>
                </select>
                <select className='w-1/3 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option>Year</option>
                </select>
              </div>
            </div>
            <button
              type='submit'
              className='w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition'
            >
              Next
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
