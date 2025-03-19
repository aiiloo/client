import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginForm(props: Props) {
  const { setShowModal } = props
  return (
    <div>
      <AnimatePresence>
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='bg-white text-black p-6 rounded-2xl shadow-2xl max-w-md w-full transform'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h2 className='text-2xl font-bold text-center'>Sign In to AiiLoo</h2>
            {/* <p className='text-gray-600 mt-2 text-center'>Sign up with your details below.</p> */}

            <div className='mt-4 space-y-3'>
              <input
                type='email'
                placeholder='Email'
                className='w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
              />
              <input
                type='password'
                placeholder='Password'
                className='w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
              />
            </div>

            <button className='w-full bg-blue-500 text-white py-3 px-4 mt-5 rounded-full shadow-md hover:bg-blue-600 transition'>
              Sign Up
            </button>
            <button
              onClick={() => setShowModal(false)}
              className='w-full bg-gray-300 text-black py-3 px-4 mt-3 rounded-full hover:bg-gray-400 transition'
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
