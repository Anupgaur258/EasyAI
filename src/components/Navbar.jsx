import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto"
        >
            <motion.h1
                className="text-2xl font-bold tracking-tight text-neonGreen"
                whileHover={{ rotateX: 10, rotateY: 10 }}
                transition={{ duration: 0.3 }}
            >
                EasyAI
            </motion.h1>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center mt-4 md:mt-0">
                {["Overview", "Technology", "Resources", "Contact"].map((item, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ y: -5, rotateX: 15, rotateY: 15 }}
                        transition={{ duration: 0.3 }}
                    >
                        <a href="#" className="text-gray-400 text-sm font-medium hover:text-neonBlue transition-colors duration-300">
                            {item}
                        </a>
                    </motion.li>
                ))}
                <motion.li
                    whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link
                        to="/login"
                        className="bg-neonPurple text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-neonBlue transition-colors duration-300"
                    >
                        Log In / Get Access
                    </Link>
                </motion.li>
            </ul>
        </motion.nav>
    );
}

export default Navbar;