import React, { useState } from 'react';
import { availableIcons } from '../../utils/constants';
import { FaRegEdit, FaUserEdit } from 'react-icons/fa'; // ★変更: FaUserEdit を追加

// ユーザー管理モーダルコンポーネント
const UserManagementModal = ({ otherUsers, myUser, onEditMyUserIcon, onUpdateOtherUser, onDeleteOtherUser, onClose, onOpenIconPicker }) => {
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUserName, setEditingUserName] = useState('');

    const handleEditUserStart = (user) => {
        setEditingUserId(user.id);
        setEditingUserName(user.name);
    };

    const handleEditUserSave = (userId) => {
        if (editingUserName.trim() === '') return;
        onUpdateOtherUser(userId, editingUserName.trim());
        setEditingUserId(null);
        setEditingUserName('');
    };

    const handleKeyPress = (e, userId) => {
        if (e.key === 'Enter') {
            handleEditUserSave(userId);
        }
    };

    // Helper to check if a string is a base64 image data URL
    const isBase64Image = (str) => typeof str === 'string' && str.startsWith('data:image/');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">ユーザー管理</h3>
                {otherUsers.length === 0 && (
                    <p className="text-gray-600 text-center mb-4">登録されている相手ユーザーはいません。</p>
                )}
                <ul className="space-y-3 mb-6">
                    {/* 自分のユーザー情報 */}
                    <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm">
                        <div className="flex items-center gap-2">
                            <button
                                className="text-2xl p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                onClick={() => onOpenIconPicker(myUser.id)}
                                title="アイコンを編集"
                            >
                                {myUser.icon && isBase64Image(myUser.icon) ? (
                                    <img src={myUser.icon} alt="My Icon" className="w-8 h-8 rounded-full object-cover" />
                                ) : (
                                    <span className="text-2xl">{myUser.icon}</span>
                                )}
                            </button>
                            <span className="text-gray-800 font-medium">{myUser.name}</span>
                        </div>
                    </li>
                    {/* 相手ユーザー情報 */}
                    {otherUsers.map(user => (
                        <li key={user.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm">
                            <div className="flex items-center gap-2">
                                <button
                                    className="text-2xl p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => onOpenIconPicker(user.id)}
                                    title="アイコンを編集"
                                >
                                    {user.icon && isBase64Image(user.icon) ? (
                                        <img src={user.icon} alt="User Icon" className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <span className="text-2xl">{user.icon}</span>
                                    )}
                                </button>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        value={editingUserName}
                                        onChange={(e) => setEditingUserName(e.target.value)}
                                        onBlur={() => handleEditUserSave(user.id)}
                                        onKeyPress={(e) => handleKeyPress(e, user.id)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-700"
                                    />
                                ) : (
                                    <span className="text-gray-800 font-medium">
                                        {isBase64Image(user.name) ? "(画像アイコン)" : user.name}
                                    </span>
                                )}
                            </div>
                            <div className="flex space-x-2 ml-4">
                                {editingUserId === user.id ? (
                                    <button
                                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                                        onClick={() => handleEditUserSave(user.id)}
                                        title="保存"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                            <path d="M20 6L9 17L4 12"/>
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        className="p-2 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                        onClick={() => handleEditUserStart(user)}
                                        title="編集"
                                    >
                                        {/* ★変更: FaUserEdit コンポーネントを使用 */}
                                        <FaUserEdit size={18} />
                                    </button>
                                )}
                                <button
                                    className="p-2 text-red-500 rounded-full hover:bg-red-100 transition-colors duration-200"
                                    onClick={() => onDeleteOtherUser(user.id)}
                                    title="削除"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                        onClick={onClose}
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagementModal;