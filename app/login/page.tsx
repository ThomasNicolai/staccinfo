import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  return (

    <div className=" relative min-h-screen flex justify-center items-start md:items-center p-8 bg-[#e8eaf9] overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gradient-to-br from-[#7590fa] to-[#bfcafa] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-[20px] left-[-90px] w-[400px] h-[400px] border-[55px] border-600 border-[#627afa] rounded-full transform translate-x-1 translate-y-1/3 "></div>


      <header className="absolute top-0 left-0 p-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <img src="/stacclogoliten.png" alt="stacc" className="w-10 h-auto" />
          <span className="text-black-600 text-[25px] font-[600] font-mono">stacc</span>
          <div className="w-px h-10 bg-gray-400"></div>
          <span className="text-black-600 text-[20px] font-[600]">Informasjonsportal</span>
        </div>
      </header>
      
      {/* Content Area (Left and Right Sides) */}
      <div className="flex mt-16 rounded-xl w-[1000px] h-[500px] md:items-center bg-[#f4f6fa] overflow-hidden shadow-lg z-0">
          
          {/* Left Side: Empty for content or image */}
          <div className="w-1/2 h-full flex bg-[#6e8bfe]">
            <img src="/login.png" alt="login" className='object-contain'   />
          </div>

          {/* Right Side: Login */}
          <div className="w-1/2 h-full flex justify-center items-center bg-[#f4f6fa]">
            <div>
              <Card className='bg-white'>
                <CardHeader>
                  <CardTitle className="text-2xl">Logg inn</CardTitle>
                  <CardDescription>This demo uses GitHub for authentication.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <form
                    action={async () => {
                      'use server';
                      await signIn('github', {
                        redirectTo: '/'
                      });
                    }}
                    className="w-full"
                  >
                    <Button className="w-full">Sign in with GitHub</Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}