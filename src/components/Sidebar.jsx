import { motion } from 'framer-motion';
import { FaHome, FaStar, FaTools, FaPen, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Sidebar() {
    return (
        <motion.div
            className="w-16 bg-sidebarBg text-white flex flex-col items-center py-4"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="mb-6">
                <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">A</span>
            </div>
            <div className="space-y-6">
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                    <FaHome className="text-xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                    <FaStar className="text-xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                    <FaTools className="text-xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                    <FaPen className="text-xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                    <FaArrowLeft className="text-xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                    <FaArrowRight className="text-xl" />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Sidebar;