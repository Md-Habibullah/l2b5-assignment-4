
import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export default function Navbar() {
    const navItems = [
        { name: 'All Books', path: '/books' },
        { name: 'Add Book', path: '/create-book' },
        { name: 'Borrow Summary', path: '/borrow-summary' },
    ];

    return (
        <div className='bg-[#132639] shadow-sm text-white'>
            <header className="max-w-7xl sticky top-0 z-50 mx-auto">
                <div className="container flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-indigo-600">
                        Library
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium hover:text-indigo-600 transition ${isActive ? 'text-indigo-600' : 'text-gray-300'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    {/* Simple three-line hamburger icon using Tailwind */}
                                    <div className="space-y-[4px]">
                                        <span className="block h-[2px] w-5 bg-gray-700" />
                                        <span className="block h-[2px] w-5 bg-gray-700" />
                                        <span className="block h-[2px] w-5 bg-gray-700" />
                                    </div>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                                <div className="flex flex-col gap-4 mt-8">
                                    {navItems.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `text-base font-medium ${isActive ? 'text-indigo-600' : 'text-gray-800'
                                                }`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </div>
    );
}
