import { LogOut, LogIn } from 'lucide-react';

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gradient-to-r from-emerald-600 to-teal-800 rounded-full flex items-center justify-center">
                    <div className="h-4 w-4 bg-white rounded-full" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
                    PayTM
                    </span>
                </div>
                {/* Auth Button */}
                <button
                    onClick={user ? onSignout : onSignin}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-800 text-white hover:opacity-90 transition-opacity"
                >
                    {user ? (
                    <>
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </>
                    ) : (
                    <>
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                    </>
                    )}
                </button>
                </div>
            </div>
        </div>
    )
}