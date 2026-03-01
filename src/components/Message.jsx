import React, { useState, useRef, useEffect, useCallback } from 'react';
import { formatTime } from '../utils/helpers';
import { FaRegEdit } from 'react-icons/fa';


// メッセージコンポーネント
// 個々のチャットメッセージを表示し、編集機能を提供します。
const Message = ({ message, onEdit, onDelete, isMyMessage, senderName, senderIcon, myBubbleColor, otherBubbleColor, myTextColor, otherTextColor, displayOnlyMode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(message.text);
    const [editedReadCount, setEditedReadCount] = useState(message.readCount || 0);
    const [editedTimestamp, setEditedTimestamp] = useState(message.timestamp ? formatTime(new Date(message.timestamp)) : formatTime(new Date()));
    const editContainerRef = useRef(null);

    const handleEditClick = () => {
        if (displayOnlyMode) return;
        setIsEditing(true);
    };

    const handleSaveClick = useCallback(() => {
        if (editedText.trim() === '') return;

        const [hours, minutes] = editedTimestamp.split(':').map(Number);
        const newDate = new Date();
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        onEdit(message.id, editedText, editedReadCount, newDate.toISOString());
        setIsEditing(false);
    }, [editedText, editedReadCount, editedTimestamp, message.id, onEdit]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveClick();
        }
    };

    useEffect(() => {
        if (isEditing) {
            const inputField = editContainerRef.current?.querySelector('input[type="text"]');
            if (inputField) {
                inputField.focus();
            }
        }
    }, [isEditing]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editContainerRef.current && !editContainerRef.current.contains(event.target)) {
                handleSaveClick();
            }
        };

        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing, handleSaveClick]);

    const bubbleStyle = {
        backgroundColor: isMyMessage ? myBubbleColor : otherBubbleColor,
        color: isMyMessage ? myTextColor : otherTextColor,
    };

    const getReadStatusText = (count) => {
        if (count === 0) return '';
        if (count === 1) return '既読';
        return `既読 ${count}`;
    };

    const isBase64Image = (str) => {
        return typeof str === 'string' && str.startsWith('data:image/');
    };

    const displayedMessageText = isBase64Image(message.text) ? (isMyMessage ? '画像が送信されました' : '画像') : message.text;


    return (
        <div className={`flex items-start mb-4 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col gap-1 max-w-xs sm:max-w-md ${isMyMessage ? 'items-end' : 'items-start'}`}>
                {/* ★変更: 相手の名前を表示する条件から !isBase64Image(senderIcon) を削除 */}
                {!isMyMessage && (
                    <span className="text-xs text-gray-500 mb-1 px-2 text-left">
                        {senderName}
                    </span>
                )}
                <div className={`flex items-center gap-2 ${isMyMessage ? 'flex-row-reverse' : ''}`}>
                    {/* 送信者アイコンの表示ロジック */}
                    {senderIcon && (
                        isBase64Image(senderIcon) ? (
                            <img src={senderIcon} alt="User Icon" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        ) : (
                            <span className="text-2xl flex-shrink-0">{senderIcon}</span>
                        )
                    )}
                    <div className="flex flex-col">
                        <div className={`flex items-center gap-2 ${isMyMessage ? 'flex-row-reverse' : ''}`}>
                            {/* 編集アイコン - 表示のみモードでは非表示 */}
                            {!displayOnlyMode && (
                                <span
                                    className="cursor-pointer text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                                    onClick={handleEditClick}
                                    title="編集"
                                >
                                    <FaRegEdit size={22} />
                                </span>
                            )}
                            {/* 削除アイコン - 表示のみモードでは非表示 */}
                            {!displayOnlyMode && (
                                <span
                                    className="cursor-pointer text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors duration-200 flex-shrink-0"
                                    onClick={() => onDelete(message.id)}
                                    title="削除"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                    </svg>
                                </span>
                            )}

                            {isEditing ? (
                                // 編集中の入力フィールドとオプション
                                <div ref={editContainerRef} className="flex flex-col space-y-2 w-full">
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${isMyMessage ? 'bg-yellow-100 text-gray-800 focus:ring-yellow-300' : 'bg-gray-200 text-gray-800 focus:ring-gray-300'}`}
                                    />
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <label className="flex items-center cursor-pointer">
                                            既読:
                                            <input
                                                type="number"
                                                min="0"
                                                value={editedReadCount}
                                                onChange={(e) => setEditedReadCount(Number(e.target.value))}
                                                className="w-16 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 ml-1"
                                            />
                                        </label>
                                        <input
                                            type="time"
                                            value={editedTimestamp}
                                            onChange={(e) => setEditedTimestamp(e.target.value)}
                                            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                        <button
                                            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                                            onClick={handleSaveClick}
                                            title="保存"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                                <path d="M20 6L9 17L4 12"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // 通常のメッセージ表示
                                <div className="flex items-end">
                                    {/* 自分のメッセージの場合は左側に、相手のメッセージの場合は右側に既読/時刻を表示 */}
                                    {isMyMessage && (
                                        <div className={`text-xs text-gray-500 mr-2 flex flex-col items-end`}>
                                            {getReadStatusText(message.readCount) && (
                                                <span>{getReadStatusText(message.readCount)}</span>
                                            )}
                                            <span>{message.timestamp ? formatTime(new Date(message.timestamp)) : ''}</span>
                                        </div>
                                    )}
                                    <div className={`p-3 rounded-lg shadow`} style={bubbleStyle}>
                                        {displayedMessageText}
                                    </div>
                                    {!isMyMessage && (
                                        <div className={`text-xs text-gray-500 ml-2 flex flex-col items-start`}>
                                            {getReadStatusText(message.readCount) && (
                                                <span>{getReadStatusText(message.readCount)}</span>
                                            )}
                                            <span>{message.timestamp ? formatTime(new Date(message.timestamp)) : ''}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;