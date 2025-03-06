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

    <div className="min-h-screen flex justify-center items-start md:items-center p-8 bg-[#e8eaf9]">
      <header className="absolute top-0 left-0 p-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <img src="/stacclogoliten.png" alt="stacc" className="w-10 h-auto" />
          <span className="text-black-600 text-[25px] font-[600] font-mono">stacc</span>
          <div className="w-px h-10 bg-gray-400"></div>
          <span className="text-black-600 text-[20px] font-[600]">Informasjonsportal</span>
        </div>
      </header>
      
      {/* Content Area (Left and Right Sides) */}
      <div className="flex space-x-4 mt-16 rounded-xl w-[900px] h-[400px] md:items-center bg-[#f4f6fa]">
          
          {/* Left Side: Empty for content or image */}
          <div className="w-1/2 rounded-xl border-2 h-full w-full bg-[#6e8bfe] flex">
            <img src="/login_pic.png" alt="stacc"  />
          </div>

          {/* Right Side: Login */}
          <div className="w-1/2 w-full h-full rounded-lg flex md:items-center">
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