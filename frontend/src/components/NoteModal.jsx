import React, { useState } from "react";

function NoteModal(props) {
    const { id, title, content, onClose, onUpdate } = props;
    const [note, setNote] = useState({
        updatedTitle: title,
        updatedContent: content,
    });

    function handleUpdate() {
        onUpdate(id, note.updatedTitle, note.updatedContent);
        onClose();
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    }

    return (
        <div
            className="fixed inset-0 bg-[rgba(145,140,140,0.6)] flex justify-center items-center z-50"
            onClick={onClose}
        >
            <form className="relative w-[480px] bg-white mx-auto my-8 p-4 rounded-lg shadow-md"
                onClick={(e) => e.stopPropagation()}>
                <input
                    className="w-full text-[20px] border-none p-1 text-lg outline-none resize-none"
                    type="text"
                    name="updatedTitle"
                    value={note.updatedTitle}
                    maxLength="20"
                    onChange={handleChange}
                    placeholder="Title"
                />
                <textarea
                    className="w-full border-none p-1 text-[16px] outline-none resize-none min-h-[150px]"
                    value={note.updatedContent}
                    name="updatedContent"
                    onChange={handleChange}
                    maxLength="100"
                    placeholder="Take a note..."
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-1 rounded-md mr-2 text-[15px]">
                        Close
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-[#f5ba13] text-white px-4 py-1 rounded-md text-[15px]">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}


export default NoteModal;
