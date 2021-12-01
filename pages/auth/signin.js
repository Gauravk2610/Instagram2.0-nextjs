import { getProviders, signIn as SignInProvider } from "next-auth/react"
import Header from "../../components/Header"

export default function signIn({ providers }) {
  return (
    <>
    <Header />

    <div className=' flex flex-col items-center min-h-screen justify-center -mt-52 px-14 text-center'> 

        <img className='w-80' src="https://links.papareact.com/ocw" alt="" />
        <p className="font-xs italic">This is not a REAL app, it is built for educational only</p>
        <div className="mt-40">
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                <button 
                    className='p-3 bg-blue-500 rounded-lg text-white'
                    onClick={() => SignInProvider(provider.id, { callbackUrl: '/' })}>
                    Sign in with {provider.name}
                </button>
                </div>
            ))}
        </div>
    </div>

    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}