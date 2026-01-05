import React from 'react'

const Login = () => {
  return (
    <main>
        <div className='relative'>
            <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
            <div className='relative z-10 pt-50 lg:pt-80 pb-30'>
                <div className='container mx-auto px-2'>
                    <div>
                        <ul className='breadcrumb uppercase webColor text-sm flex'>
                        <li><a href='/'>Home</a></li>
                        <li>Login</li>
                        </ul>
                    </div>
                    <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Login</h2>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='pt-20 lg:pt-0 pb-10 mt-10' data-aos="fade-up">
                    <iframe src="https://book.mylimobiz.com/v4/limoroyaleca/widget/login" className='w-full h-100'></iframe>
                    <a href="" data-ores-widget="login" data-ores-alias="limoroyaleca" data-redirect-url="{redirect_url}">Login</a>
                    <script type="text/javascript" src="https://book.mylimobiz.com/v4/widgets/widget-loader.js"></script>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Login