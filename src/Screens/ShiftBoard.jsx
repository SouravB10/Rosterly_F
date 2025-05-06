import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialData = {
    Monday: [{ id: "shift-1", time: "9:00 AM - 5:00 PM" }],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
};

const ShiftBoard = () => {
    const [shifts, setShifts] = useState(initialData);
    const [copiedShift, setCopiedShift] = useState(null); // stores the copied shift

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceDay = source.droppableId;
        const destDay = destination.droppableId;

        if (sourceDay !== destDay) {
            const sourceShifts = Array.from(shifts[sourceDay]);
            const destShifts = Array.from(shifts[destDay]);
            const [moved] = sourceShifts.splice(source.index, 1);
            const newShift = { ...moved, id: `${destDay}-${Date.now()}` };
            destShifts.splice(destination.index, 0, newShift);

            setShifts((prev) => ({
                ...prev,
                [sourceDay]: sourceShifts,
                [destDay]: destShifts,
            }));
        }
    };

    const handleCopy = (shift) => {
        setCopiedShift(shift);
    };

    const handlePaste = (day) => {
        if (!copiedShift) return;
        const newShift = { ...copiedShift, id: `${day}-${Date.now()}` };
        setShifts((prev) => ({
            ...prev,
            [day]: [...prev[day], newShift],
        }));
        setCopiedShift(null); // clear clipboard after pasting
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
                {Object.entries(shifts).map(([day, shiftList]) => (
                    <Droppable key={day} droppableId={day}>
                        {(provided) => (
                            <div
                                className="bg-gray-100 p-4 rounded shadow min-h-[150px] relative"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-semibold">{day}</h2>
                                    {copiedShift && (
                                        <button
                                            className={`text-xs px-2 py-1 rounded ${copiedShift ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
                                                }`}
                                            onClick={() => handlePaste(day)}
                                            disabled={!copiedShift}
                                        >
                                            Paste
                                        </button>
                                    )}
                                </div>
                                {shiftList.map((shift, index) => (
                                    <Draggable
                                        key={shift.id}
                                        draggableId={shift.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                className="bgSucces text-white p-2 paragraph rounded cursor-move relative flex justify-between"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="">
                                                    {shift.time}
                                                    {console.log("Rendering Copy for", shift.id)}
                                                </div>
                                                <div>

                                                    <button
                                                        onClick={() => handleCopy(shift)}
                                                        className="text-lg rounded cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default ShiftBoard;
