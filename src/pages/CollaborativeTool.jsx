import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import Sidebar from '../components/Sidebar';

function CollaborativeTool() {
    // Play sound on page load
    const [play] = useSound('/welcome.mp3');

    useEffect(() => {
        play();
    }, [play]);

    const boards = [
        { name: "Layering", img: "https://via.placeholder.com/150", time: "about 1 hour ago" },
        { name: "Drawing board", img: "https://via.placeholder.com/150" },
        { name: "Wireframe", img: "https://via.placeholder.com/150" },
        { name: "Team meeting", img: "https://via.placeholder.com/150" },
    ];

    return (
        <div className="flex min-h-screen bg-boardBg">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-800">Board</h1>
                        <div className="flex items-center space-x-2">
                            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">A</span>
                            <span className="text-gray-600">Acme Corp</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search boards"
                            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neonBlue"
                        />
                        <button className="bg-neonPurple text-white px-4 py-2 rounded-lg text-sm hover:bg-neonBlue transition-colors">
                            + Invite members
                        </button>
                    </div>
                </div>

                {/* Team Boards */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Team boards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* New Board Card */}
                    <Link to="/collaborative-tool/board">
                        <motion.div
                            className="bg-cardBlue rounded-lg p-6 flex items-center justify-center h-40"
                            whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
                            transition={{ duration: 0.3 }}
                            style={{ perspective: 1000 }}
                        >
                            <p className="text-white text-lg font-semibold">+ New board</p>
                        </motion.div>
                    </Link>

                    {/* Team Boards */}
                    {boards.map((board, index) => (
                        <Link to="/collaborative-tool/board" key={index}>
                            <motion.div
                                className="bg-white rounded-lg shadow-md overflow-hidden h-40"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                style={{ perspective: 1000 }}
                            >
                                <img src={board.img} alt={board.name} className="w-full h-24 object-cover" />
                                <div className="p-3">
                                    <p className="text-gray-800 font-medium">{board.name}</p>
                                    {board.time && <p className="text-gray-500 text-xs">{board.time}</p>}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CollaborativeTool;