import { motion, useScroll, useTransform } from 'framer-motion';

function WorkflowSection() {
    const { scrollY } = useScroll();
    const rotateX = useTransform(scrollY, [500, 1000], [0, 20]);

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-darkGradient to-darkBg">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 px-4">
                {/* Left Side */}
                <motion.div
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ rotateX, perspective: 1000 }}
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-neonGreen">
                        New AI Workflows Equal <span className="text-neonBlue">New Threats</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md">
                        Progress comes with text on Compromising AI Ops Chains. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </motion.div>

                {/* Right Side */}
                <motion.div
                    className="md:w-1/2 p-6 md:p-8 bg-white/10 rounded-xl backdrop-blur-sm shadow-lg"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -10, rotateX: 10, rotateY: 10 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ perspective: 1000 }}
                >
                    <h3 className="text-lg md:text-xl font-semibold mb-6 text-neonPurple">The Problem</h3>
                    <ul className="space-y-4">
                        {[
                            "Inserting Backdoors in AI Models",
                            "Extraction of AI Models and Data",
                            "Model Drift Attacks",
                            "FireOps Attacks",
                            "Data Poisoning",
                            "Model Inversion",
                            "Prompt Injection",
                            "Social Engineering",
                            "Model Evasion",
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                className="flex items-center space-x-3 text-gray-300"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ x: 10, rotateY: 10, z: 10 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                viewport={{ once: true }}
                                style={{ perspective: 1000 }}
                            >
                                <motion.span
                                    className="text-neonGreen text-lg"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    →
                                </motion.span>
                                <span className="text-xs md:text-sm">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                    <motion.a
                        href="#"
                        className="text-neonBlue mt-6 inline-block text-sm font-medium"
                        whileHover={{ x: 5, rotateY: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        View Solutions →
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

export default WorkflowSection;