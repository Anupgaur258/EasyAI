import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaTools, FaCode, FaVideo } from 'react-icons/fa'; // Icons for features

function Hero() {
    const { scrollY } = useScroll();
    const rotateX = useTransform(scrollY, [0, 500], [0, 20]);
    const rotateY = useTransform(scrollY, [0, 500], [0, 20]);

    const features = [
        { name: "Meeting", icon: <FaUsers />, path: "/meeting" },
        { name: "Collaborative Tool", icon: <FaTools />, path: "/collaborative-tool" },
        { name: "AI Code Reviewer", icon: <FaCode />, path: "/ai-code-reviewer" },
        { name: "AI Short Video Generator", icon: <FaVideo />, path: "/ai-short-video-generator" },
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-darkBg to-darkGradient relative overflow-hidden"
        >
            {/* 3D Background */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ perspective: 1000 }}
            >
                <div className="w-full h-full bg-gradient-to-r from-neonGreen/20 to-neonBlue/20 opacity-30" />
            </motion.div>

            {/* Logo */}
            <motion.img
                src="https://via.placeholder.com/100" // Replace with EasyAI logo
                alt="EasyAI Logo"
                className="mb-6 w-16 h-16 md:w-20 md:h-20"
                animate={{ y: [0, -20, 0], rotateX: [0, 15, 0], rotateY: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ rotateX, rotateY, perspective: 1000 }}
            />
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-neonGreen"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Verify to Trust AI
            </motion.h1>
            <motion.p
                className="text-base md:text-xl text-gray-300 mb-8 max-w-xl px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Introducing Verifiable Compute, Ready for the Agentic AI Era.
            </motion.p>
            <motion.button
                whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-neonPurple text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:bg-neonBlue transition-colors duration-300"
                style={{ perspective: 1000 }}
            >
                Schedule Demo
            </motion.button>

            {/* Feature Cards */}
            <div className="absolute bottom-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 px-4">
                {features.map((feature, index) => (
                    <Link to={feature.path} key={index}>
                        <motion.div
                            className="bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm shadow-md flex items-center space-x-2"
                            initial={{ y: 50, opacity: 0, rotateX: -90 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            whileHover={{ rotateX: 15, rotateY: 15, z: 20, backgroundColor: "rgba(0, 221, 235, 0.3)" }}
                            transition={{ delay: index * 0.3, duration: 0.6 }}
                            style={{ perspective: 1000 }}
                        >
                            <motion.div
                                className="text-neonGreen text-lg"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            >
                                {feature.icon}
                            </motion.div>
                            <p className="text-xs font-medium text-gray-300">{feature.name}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.section>
    );
}

export default Hero;