import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Stage, Layer, Rect, Circle, Line, Text as KonvaText } from 'react-konva';
import Sidebar from '../components/Sidebar';
import { FaSquare, FaCircle, FaPen, FaStickyNote, FaUndo, FaRedo, FaTrash, FaFont } from 'react-icons/fa';

function CollaborativeBoard() {
    const [tool, setTool] = useState('pen'); // Current drawing tool
    const [lines, setLines] = useState([]); // Store drawn lines
    const [shapes, setShapes] = useState([]); // Store shapes (rect, circle)
    const [notes, setNotes] = useState([
        { id: 1, text: "Optimize processes", x: 50, y: 50, color: "stickyYellow" },
        { id: 2, text: "Enhance productivity", x: 200, y: 50, color: "stickyYellow" },
        { id: 3, text: "Boost efficiency", x: 50, y: 200, color: "stickyOrange" },
        { id: 4, text: "Elevate skillset", x: 200, y: 200, color: "stickyOrange" },
        { id: 5, text: "Streamline operations", x: 400, y: 50, color: "stickyYellow" },
        { id: 6, text: "Accelerate growth", x: 550, y: 50, color: "stickyOrange" },
        { id: 7, text: "Refine strategies", x: 550, y: 200, color: "stickyOrange" },
    ]); // Store sticky notes
    const [texts, setTexts] = useState([]); // Store text elements
    const [history, setHistory] = useState([]); // History for undo/redo
    const [historyIndex, setHistoryIndex] = useState(-1); // Track current history index
    const isDrawing = useRef(false);

    // Save state to history for undo/redo
    const saveToHistory = (newLines, newShapes, newNotes, newTexts) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ lines: newLines, shapes: newShapes, notes: newNotes, texts: newTexts });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    // Handle mouse down event for drawing
    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        if (tool === 'pen') {
            const newLines = [...lines, { points: [pos.x, pos.y] }];
            setLines(newLines);
            saveToHistory(newLines, shapes, notes, texts);
        } else if (tool === 'rect' || tool === 'circle') {
            const newShapes = [...shapes, { type: tool, x: pos.x, y: pos.y, width: 0, height: 0 }];
            setShapes(newShapes);
            saveToHistory(lines, newShapes, notes, texts);
        } else if (tool === 'text') {
            const newTexts = [...texts, { id: Date.now(), text: "Edit me", x: pos.x, y: pos.y }];
            setTexts(newTexts);
            saveToHistory(lines, shapes, notes, newTexts);
        }
    };

    // Handle mouse move event for drawing
    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        if (tool === 'pen') {
            let lastLine = lines[lines.length - 1];
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            setLines([...lines.slice(0, -1), lastLine]);
        } else if (tool === 'rect' || tool === 'circle') {
            let lastShape = shapes[shapes.length - 1];
            lastShape.width = point.x - lastShape.x;
            lastShape.height = point.y - lastShape.y;
            setShapes([...shapes.slice(0, -1), lastShape]);
        }
    };

    // Handle mouse up event to stop drawing
    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    // Undo action
    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1];
            setLines(prevState.lines);
            setShapes(prevState.shapes);
            setNotes(prevState.notes);
            setTexts(prevState.texts);
            setHistoryIndex(historyIndex - 1);
        }
    };

    // Redo action
    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1];
            setLines(nextState.lines);
            setShapes(nextState.shapes);
            setNotes(nextState.notes);
            setTexts(nextState.texts);
            setHistoryIndex(historyIndex + 1);
        }
    };

    // Delete the last added element
    const handleDelete = () => {
        if (texts.length > 0) {
            const newTexts = texts.slice(0, -1);
            setTexts(newTexts);
            saveToHistory(lines, shapes, notes, newTexts);
        } else if (notes.length > 0) {
            const newNotes = notes.slice(0, -1);
            setNotes(newNotes);
            saveToHistory(lines, shapes, newNotes, texts);
        } else if (shapes.length > 0) {
            const newShapes = shapes.slice(0, -1);
            setShapes(newShapes);
            saveToHistory(lines, newShapes, notes, texts);
        } else if (lines.length > 0) {
            const newLines = lines.slice(0, -1);
            setLines(newLines);
            saveToHistory(newLines, shapes, notes, texts);
        }
    };

    // Add a new sticky note
    const addStickyNote = () => {
        const newNotes = [...notes, { id: Date.now(), text: "New note", x: 50, y: 50, color: "stickyYellow" }];
        setNotes(newNotes);
        saveToHistory(lines, shapes, newNotes, texts);
    };

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
                        <span className="text-gray-600">Team meeting</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-neonPurple text-white px-4 py-2 rounded-lg text-sm hover:bg-neonBlue transition-colors">
                            + Invite members
                        </button>
                    </div>
                </div>

                {/* Drawing Board */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Ways to improve performance</h2>
                    <div className="flex space-x-4 mb-4">
                        {/* Undo */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={handleUndo}
                            disabled={historyIndex <= 0}
                            className={`p-2 rounded-lg ${historyIndex <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200'}`}
                        >
                            <FaUndo />
                        </motion.button>
                        {/* Redo */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={handleRedo}
                            disabled={historyIndex >= history.length - 1}
                            className={`p-2 rounded-lg ${historyIndex >= history.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200'}`}
                        >
                            <FaRedo />
                        </motion.button>
                        {/* Delete */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={handleDelete}
                            disabled={lines.length === 0 && shapes.length === 0 && notes.length === 0 && texts.length === 0}
                            className={`p-2 rounded-lg ${lines.length === 0 && shapes.length === 0 && notes.length === 0 && texts.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200'}`}
                        >
                            <FaTrash />
                        </motion.button>
                        {/* Pen */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={() => setTool('pen')}
                            className={`p-2 rounded-lg ${tool === 'pen' ? 'bg-neonBlue text-white' : 'bg-gray-200'}`}
                        >
                            <FaPen />
                        </motion.button>
                        {/* Rectangle */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={() => setTool('rect')}
                            className={`p-2 rounded-lg ${tool === 'rect' ? 'bg-neonBlue text-white' : 'bg-gray-200'}`}
                        >
                            <FaSquare />
                        </motion.button>
                        {/* Circle */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={() => setTool('circle')}
                            className={`p-2 rounded-lg ${tool === 'circle' ? 'bg-neonBlue text-white' : 'bg-gray-200'}`}
                        >
                            <FaCircle />
                        </motion.button>
                        {/* Text */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={() => setTool('text')}
                            className={`p-2 rounded-lg ${tool === 'text' ? 'bg-neonBlue text-white' : 'bg-gray-200'}`}
                        >
                            <FaFont />
                        </motion.button>
                        {/* Sticky Note */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotateX: 10 }}
                            onClick={addStickyNote}
                            className="p-2 rounded-lg bg-gray-200"
                        >
                            <FaStickyNote />
                        </motion.button>
                    </div>
                    <Stage
                        width={window.innerWidth - 100}
                        height={500}
                        onMouseDown={handleMouseDown}
                        onMousemove={handleMouseMove}
                        onMouseup={handleMouseUp}
                    >
                        <Layer>
                            {/* Sticky Notes */}
                            {notes.map((note) => (
                                <motion.group
                                    key={note.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Rect
                                        x={note.x}
                                        y={note.y}
                                        width={100}
                                        height={100}
                                        fill={note.color}
                                        shadowBlur={5}
                                        draggable
                                        onDragEnd={(e) => {
                                            const newNotes = notes.map((n) =>
                                                n.id === note.id ? { ...n, x: e.target.x(), y: e.target.y() } : n
                                            );
                                            setNotes(newNotes);
                                            saveToHistory(lines, shapes, newNotes, texts);
                                        }}
                                    />
                                    <KonvaText
                                        x={note.x + 10}
                                        y={note.y + 10}
                                        text={note.text}
                                        fontSize={12}
                                        fill="black"
                                        width={80}
                                        wrap="word"
                                    />
                                </motion.group>
                            ))}
                            {/* Drawn Lines */}
                            {lines.map((line, i) => (
                                <Line
                                    key={i}
                                    points={line.points}
                                    stroke="black"
                                    strokeWidth={2}
                                    tension={0.5}
                                    lineCap="round"
                                />
                            ))}
                            {/* Shapes */}
                            {shapes.map((shape, i) => (
                                shape.type === 'rect' ? (
                                    <Rect
                                        key={i}
                                        x={shape.x}
                                        y={shape.y}
                                        width={shape.width}
                                        height={shape.height}
                                        stroke="black"
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <Circle
                                        key={i}
                                        x={shape.x + shape.width / 2}
                                        y={shape.y + shape.height / 2}
                                        radius={Math.abs(shape.width / 2)}
                                        stroke="black"
                                        strokeWidth={2}
                                    />
                                )
                            ))}
                            {/* Text Elements */}
                            {texts.map((text) => (
                                <KonvaText
                                    key={text.id}
                                    x={text.x}
                                    y={text.y}
                                    text={text.text}
                                    fontSize={16}
                                    fill="black"
                                    draggable
                                    onDblClick={(e) => {
                                        const newText = prompt("Enter new text:", text.text);
                                        if (newText) {
                                            const newTexts = texts.map((t) =>
                                                t.id === text.id ? { ...t, text: newText } : t
                                            );
                                            setTexts(newTexts);
                                            saveToHistory(lines, shapes, notes, newTexts);
                                        }
                                    }}
                                    onDragEnd={(e) => {
                                        const newTexts = texts.map((t) =>
                                            t.id === text.id ? { ...t, x: e.target.x(), y: e.target.y() } : t
                                        );
                                        setTexts(newTexts);
                                        saveToHistory(lines, shapes, notes, newTexts);
                                    }}
                                />
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    );
}

export default CollaborativeBoard;