import { Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Footer() {
    return (
        <div className="bg-[#132639] text-white">
            <div className="max-w-7xl mx-auto px-6">
                <footer className="w-full border-t border-gray-700 py-10">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
                        {/* Logo */}
                        <div>
                            <h2 className="text-lg font-bold text-yellow-500">Library</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Library management site
                            </p>
                        </div>

                        {/* Importants */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3">
                                Important
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link to="#" className="hover:underline">My Account</Link></li>
                                <li><Link to="#" className="hover:underline">Help</Link></li>
                                <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3">
                                Resources
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link to="#" className="hover:underline">Search Category</Link></li>
                                <li><Link to="#" className="hover:underline">Library Rules</Link></li>
                                <li><Link to="#" className="hover:underline">Read Books Online</Link></li>
                            </ul>
                        </div>

                        {/* Contact details */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3">
                                Contact
                            </h3>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> habib.library@gmail.com
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> +880 1717562427
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <Button variant="ghost" size="icon" aria-label="Facebook">
                                        <Facebook className="h-4 w-4 text-gray-300 hover:text-black" />
                                    </Button>
                                    <Button variant="ghost" size="icon" aria-label="Twitter">
                                        <Twitter className="h-4 w-4 text-gray-300 hover:text-black" />
                                    </Button>
                                    <Button variant="ghost" size="icon" aria-label="LinkedIn">
                                        <Linkedin className="h-4 w-4 text-gray-300 hover:text-black" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reserve section */}
                    <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Library Management Site by Habib.
                        <div className="mt-2 space-x-4">
                            <span> All rights reserved.</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
