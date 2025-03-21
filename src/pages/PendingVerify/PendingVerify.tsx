export default function PendingVerify() {
  return (
    <div>
      <div className='bg-black flex items-center justify-center min-h-screen'>
        <div className='p-8 border border-blue-950 rounded-lg shadow-md text-center max-w-md w-full'>
          <img alt='Aiiloo logo' className='mx-auto mb-4' src='https://placehold.co/100x50?text=Aiiloo+Logo' />
          <h1 className='text-2xl font-semibold mb-2'>Verify your email address</h1>
          <p className='text-white mb-6'>
            Please confirm that you want to use this as your Aiiloo account email address. Once confirmed, your account
            will be ready to use!
          </p>
          <a
            href='https://mail.google.com/mail'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-blue-500 text-white py-2 px-4 rounded-full text-lg mb-4'
          >
            Verify my email
          </a>

          <div className='flex justify-center space-x-4 mb-6'>
            <a className='text-white' href='#'>
              <i className='fab fa-twitter' />
            </a>
            <a className='text-white' href='#'>
              <i className='fab fa-facebook' />
            </a>
            <a className='text-white' href='#'>
              <i className='fab fa-google-plus' />
            </a>
          </div>
          <footer className='text-white text-sm'>
            <p>Aiiloo, 123 Nguyen Trai Street, District 1, Ho Chi Minh City, Vietnam</p>
            <img alt='Aiiloo icon' className='mx-auto mt-2' src='https://placehold.co/20x20?text=S' />
          </footer>
        </div>
      </div>
    </div>
  )
}
