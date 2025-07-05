
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
        <div className='bg-[#132639] text-white'>
            <header className="max-w-7xl sticky top-0 z-50 mx-auto">
                <div className="flex px-6 md:px-0 items-center justify-between py-4">
                    {/* Logo Design */}
                    <Link to="/" className="text-xl font-bold text-yellow-500">
                        Library
                    </Link>

                    {/* Nav for MD or Xl device */}
                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium hover:text-white transition ${isActive ? 'text-yellow-500' : 'text-gray-300'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Sm device Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
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
