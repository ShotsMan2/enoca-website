import Link from 'next/link';

// NestJS backend'imizden verileri çeken fonksiyon
async function getCategories() {
    const res = await fetch('http://localhost:3000/categories', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

export default async function Navbar() {
    const categories = await getCategories();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-3xl font-extrabold text-blue-900 tracking-wider">
                            ENOCA
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {categories.map((category: any) => (
                            <div key={category.id} className="group relative">
                                <button className="text-gray-700 font-semibold hover:text-blue-600 py-6 transition-colors">
                                    {category.name}
                                </button>

                                {category.links && category.links.length > 0 && (
                                    <div className="absolute left-0 top-16 w-56 bg-white border border-gray-100 shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:scale-100 scale-95">
                                        <div className="py-2">
                                            {category.links.map((link: any) => (
                                                <Link
                                                    key={link.id}
                                                    href={link.url}
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:pl-6 transition-all duration-200"
                                                >
                                                    {link.title}
                                                </Link>
                                            ))}
                                        </div>  
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </nav>
    );
}