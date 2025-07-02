import { Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export function Footer() {
    return (
        <div className="bg-[#132639]">


            <div className="max-w-7xl mx-auto ">
                <footer className="w-full border-t py-10 text-foreground ">
                    <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">

                        {/* About the Library */}
                        <div>
                            <h2 className="text-lg text-indigo-600 font-bold">Library</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Providing access to knowledge, research, and community since 1950.
                            </p>
                        </div>

                        <div className="text-gray-400">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2 ">
                                Quick Links
                            </h3>
                            <ul className="space-y-1 text-sm">
                                <li>
                                    <Link to="#" className="hover:underline">Search Catalog</Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">My Account</Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">Help / FAQ</Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">Contact Us</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="text-gray-400">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                Resources
                            </h3>
                            <ul className="space-y-1 text-sm">
                                <li>
                                    <Link to="#" className="hover:underline">Library Policies</Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">eBooks</Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">Online Journals</Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">Staff Directory</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Social */}
                        <div className="text-gray-400">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                Contact
                            </h3>
                            <div className="text-sm text-muted-foreground space-y-2">
                                <p className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> library@.edu
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> +1 (555) 123-4567
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <Button variant="ghost" size="icon" aria-label="Facebook">
                                        <Facebook className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" aria-label="Twitter">
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" aria-label="LinkedIn">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Library. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    )
}
