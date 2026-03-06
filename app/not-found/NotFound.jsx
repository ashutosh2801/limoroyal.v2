import React from 'react'

const NotFound = () => {
  return (
    <main>
        <div>
            <div className='relative'>
                <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-50 lg:pt-80 pb-30'>
                    <div className='container mx-auto px-2'>
                    <div>
                        <ul className='breadcrumb uppercase webColor text-sm flex'>
                        <li><a href='/'>Home</a></li>
                        <li>Not Found</li>
                        </ul>
                    </div>
                    <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Not Found</h2>
                    </div>
                </div>
            </div>
        </div>

        <div className='relative mt-10 mb-20'>
            <div className='text-white text-center text-2xl'>
                <h1>404 - Page Not Found</h1>
            </div>
        </div>
        
    </main>
  )
}

export default NotFound