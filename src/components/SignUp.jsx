import { useSignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const SignUp = () => {
    const { isLoaded, signIn } = useSignIn();
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate('/get-plan');
        }
    }, [isLoaded, isSignedIn, navigate]);

    const signUpWithGoogle = async () => {
        if (!isLoaded || isLoading) return;

        setIsLoading(true);
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/get-plan',
            });
        } catch (err) {
            if (err.errors?.[0]?.code === 'session_exists' || err.message?.includes('already signed in')) {
                navigate('/get-plan');
            } else {
                console.error('Error signing in with Google:', err);
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#fdf8f3] items-center justify-center p-4">
            <div className="flex w-full max-w-5xl bg-[#fdf8f3] rounded-3xl overflow-hidden shadow-none">
                {/* Left Side - Image */}
                <div className="hidden md:flex w-1/2 p-4 items-center justify-center">
                    <div className="relative w-full h-[600px] rounded-[40px] overflow-hidden bg-[#ff6d38] border-2 border-black">
                        <img
                            src="/assets/login_illustration.png"
                            alt="Sign Up"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/20 pointer-events-none"></div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 text-center md:text-left">
                    <div className="mb-10">
                        <h1 className="text-6xl font-black text-black leading-[0.9] tracking-tighter mb-4">
                            Sign Up to<br />Zyvox AI
                        </h1>
                        <p className="text-lg font-bold text-gray-500">
                            Join the community of explorers.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button
                            onClick={signUpWithGoogle}
                            disabled={isLoading}
                            className={`w-full bg-white text-black font-bold text-lg py-4 rounded-full border-2 border-gray-200 flex items-center justify-center gap-3 active:scale-95 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                                }`}
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                            {isLoading ? 'Connecting...' : 'Continue with Google'}
                        </button>
                    </div>

                    <p className="text-[10px] text-gray-500 mt-10 text-center font-medium leading-relaxed">
                        By connecting to Zyvox AI you agree to our <span className="text-black font-bold">Terms of use</span> and <span className="text-black font-bold">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
