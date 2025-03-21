import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLanguage, FaImage, FaRobot, FaTools } from 'react-icons/fa';

function TrustSection() {
    const features = [
        { title: "Learn English Speak Practice with AI", desc: "Practice and improve your English with AI assistance", icon: <FaLanguage />, path: "/learn-english" },
        { title: "AI Image Creation", desc: "Generate stunning images using AI", icon: <FaImage />, path: "/ai-image-creation" },
        { title: "Automate Your Work", desc: "Streamline your tasks with AI automation", icon: <FaRobot />, path: "/automate-work" },
        { title: "Collaborative Tool", desc: "Work together seamlessly with AI tools", icon: <FaTools />, path: "/collaborative-tool" }, // Added one more feature to fill the space
    ];

    return (
        <section className="py-16 md:py-20 bg-white text-black">
            <div className="max-w-7xl mx-auto text-center px-4">
                <motion.h2
                    className="text-3xl md:text-5xl font-extrabold tracking-tight mb-12 text-neonBlue"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Evolving Trust for AI with <span className="text-neonPurple">Verifiable AI</span>
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {features.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <motion.div
                                className="p-6 rounded-xl bg-gray-100 shadow-lg flex flex-col items-center"
                                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                whileHover={{ y: -10, rotateX: 15, rotateY: 15, z: 30, backgroundColor: "rgba(0, 221, 235, 0.1)" }}
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                    hover: { duration: 0.3 },
                                    animate: { duration: 2, repeat: Infinity },
                                    viewport: { delay: index * 0.3, duration: 0.6 }
                                }}
                                viewport={{ once: true }}
                                style={{ perspective: 1000 }}
                            >
                                <motion.div
                                    className="text-neonGreen text-2xl mb-4"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                >
                                    {item.icon}
                                </motion.div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                                <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrustSection;