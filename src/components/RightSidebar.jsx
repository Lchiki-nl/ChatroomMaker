import React, { useState } from 'react';
import { availableIcons } from '../utils/constants';
import { FaUserPlus, FaUserEdit } from 'react-icons/fa';

const RightSidebar = ({
    myUser, setMyUser,
    otherUsers, setOtherUsers,
    chatSettings, setChatSettings, // ★追加: chatSettings と setChatSettings
    handleAddNewUser,
    handleEditUserSave,
    handleDeleteUserConfirm,
    handleOpenIconPicker,
    newUserName, setNewUserName,
    editingUserId, setEditingUserId,
    editingUserName, setEditingUserName,
    setShowAddUserModal,
}) => {
    // Helper to check if a string is a base64 image data URL
    const isBase64Image = (str) => typeof str === 'string' && str.startsWith('data:image/');

    const handleEditUserStartInSidebar = (user) => {
        setEditingUserId(user.id);
        setEditingUserName(user.name);
    };

    const handleEditUserSaveInSidebar = (userId) => {
        if (editingUserName.trim() === '') return;
        handleEditUserSave(userId, editingUserName.trim());
        setEditingUserId(null);
        setEditingUserName('');
    };

    const handleKeyPress = (e, userId) => {
        if (e.key === 'Enter') {
            handleEditUserSaveInSidebar(userId);
        }
    };

    return (
        <div className="w-full h-full bg-white rounded-lg p-4 shadow-md overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">設定・管理</h2> {/* ここは共通ヘッダー */}

            {/* ★ここから追加: 自動既読モード（元LeftSidebarから移動） */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">その他設定</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="autoReadMode" className="block text-sm font-medium text-gray-700 mb-1">
                            自動既読モード
                        </label>
                        <input
                            id="autoReadMode"
                            type="checkbox"
                            checked={chatSettings.autoReadMode}
                            onChange={(e) => setChatSettings(prev => ({ ...prev, autoReadMode: e.target.checked }))}
                            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            ONにすると、相手の数に応じて既読が自動設定されます。
                        </span>
                    </div>
                </div>
            </div>
            {/* ★ここまで追加: 自動既読モード */}

            {/* ユーザー管理セクション */}
            <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-t pt-4">ユーザー管理</h3>
                <div className="mb-4">
                    <label htmlFor="newUserName" className="block text-sm font-medium text-gray-700 mb-1">
                        新しい人物を追加
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="newUserName"
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="人物名を入力"
                            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddNewUser()}
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex-shrink-0 flex items-center"
                            onClick={() => {handleAddNewUser(); setShowAddUserModal(false);}}
                        >
                            <FaUserPlus size={16} className="mr-1" />
                            <span>追加</span>
                        </button>
                    </div>
                </div>

                {otherUsers.length === 0 && (
                    <p className="text-gray-600 text-center mb-4">登録されている相手ユーザーはいません。</p>
                )}
                <ul className="space-y-3 mb-6">
                    {/* 自分のユーザー情報 */}
                    <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm">
                        <div className="flex items-center gap-2">
                            <button
                                className="text-2xl p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                onClick={() => handleOpenIconPicker(myUser.id)}
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
                                    onClick={() => handleOpenIconPicker(user.id)}
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
                                        onBlur={() => handleEditUserSaveInSidebar(user.id)}
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
                                        onClick={() => handleEditUserSaveInSidebar(user.id)}
                                        title="保存"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                            <path d="M20 6L9 17L4 12"/>
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        className="p-2 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                        onClick={() => handleEditUserStartInSidebar(user)}
                                        title="編集"
                                    >
                                        <FaUserEdit size={18} />
                                    </button>
                                )}
                                <button
                                    className="p-2 text-red-500 rounded-full hover:bg-red-100 transition-colors duration-200"
                                    onClick={() => handleDeleteUserConfirm(user.id)}
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
            </div>
        </div>
    );
};

export default RightSidebar;