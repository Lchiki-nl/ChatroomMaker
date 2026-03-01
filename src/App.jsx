import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChatLogic } from './hooks/useChatLogic';
import Message from './components/Message';
import IconPickerModal from './components/Modals/IconPickerModal';
import ChatSettingsModal from './components/Modals/ChatSettingsModal';
import UserManagementModal from './components/Modals/UserManagementModal';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaRegEdit, FaUserPlus, FaUserCog, FaUserEdit } from 'react-icons/fa';
// ★追加: Vercel Analytics をインポート
import { Analytics } from "@vercel/analytics/react"; // Next.jsプロジェクトではないため @vercel/analytics/react を使用します


const App = () => {
    const {
        myUser, setMyUser,
        messages, setMessages,
        input, setInput,
        currentSenderType, setCurrentSenderType,
        otherUsers, setOtherUsers,
        selectedOtherUserId, setSelectedOtherUserId,
        newUserName, setNewUserName,
        editingUserId, setEditingUserId,
        editingUserName, setEditingUserName,
        showConfirmDeleteModal, setShowConfirmDeleteModal,
        userToDeleteId, setUserToDeleteId,
        showIconPickerModal, setShowIconPickerModal,
        iconTargetUserId, setIconTargetUserId,
        displayOnlyMode, setDisplayOnlyMode,
        chatSettings, setChatSettings,
        handleAddMessage, handleEditMessage, handleDeleteMessage,
        handleAddNewUser, handleEditUserStart, handleEditUserSave, handleDeleteUserConfirm, handleDeleteUser,
        handleOpenIconPicker, handleSelectIcon, handleSaveChatSettings
    } = useChatLogic();

    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showManageUsersModal, setShowManageUsersModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);


    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (currentSenderType === 'other' && otherUsers.length > 0 && !selectedOtherUserId) {
            setSelectedOtherUserId(otherUsers[0]?.id || null);
        } else if (currentSenderType === 'other' && otherUsers.length === 0) {
            setSelectedOtherUserId(null);
        }
    }, [otherUsers, currentSenderType, selectedOtherUserId]);


    const currentPlaceholder = currentSenderType === 'my'
        ? `メッセージを入力 (${myUser.name})...`
        : selectedOtherUserId
            ? `メッセージを入力 (${otherUsers.find(u => u.id === selectedOtherUserId)?.name})...`
            : 'メッセージを入力 (ユーザーを選択してください)...';

    const isBase64Image = (str) => {
        return typeof str === 'string' && str.startsWith('data:image/');
    };

    return (
        // ★変更: Analytics コンポーネントを最上位の div の直下に配置
        <div className="min-h-screen bg-gray-50 flex justify-center p-4 font-inter">
            <Analytics /> {/* ★追加: Vercel Analytics コンポーネント */}

            {/* 左サイドバー (PC版のみ表示) */}
            <div className="hidden lg:block w-80 mr-4 flex-shrink-0">
                <LeftSidebar
                    chatSettings={chatSettings}
                    setChatSettings={setChatSettings}
                />
            </div>

            {/* メインのチャットコンテンツエリア */}
            <div className="w-full max-w-xl lg:max-w-md rounded-lg shadow-lg flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] flex-grow-0" style={{ backgroundColor: chatSettings.chatBackgroundColor }}>
                {/* チャットヘッダー */}
                <div
                    className="p-4 border-b border-gray-200 flex justify-between items-center text-lg font-semibold rounded-t-lg"
                    style={{ backgroundColor: chatSettings.headerBackgroundColor, color: chatSettings.headerTextColor }}
                >
                    {/* 表示のみモード切り替えボタン */}
                    <button
                        className="p-2 rounded-full hover:bg-opacity-20 transition-colors duration-200 mr-2"
                        style={{ color: chatSettings.headerTextColor, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        onClick={() => setDisplayOnlyMode(!displayOnlyMode)}
                        title={displayOnlyMode ? "編集モードに戻る" : "表示のみモード"}
                    >
                        {displayOnlyMode ? (
                            <AiOutlineEyeInvisible size={28} />
                        ) : (
                            <AiOutlineEye size={28} />
                        )}
                    </button>
                    <h1 className="flex-grow text-center">{chatSettings.chatRoomName}</h1>
                    <div className="flex lg:hidden">
                        <button
                            className="p-2 rounded-full hover:bg-opacity-20 transition-colors duration-200"
                            style={{ color: chatSettings.headerTextColor, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            onClick={() => setShowSettingsModal(true)}
                            title="チャット設定"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.22a2 2 0 0 0 .73 2.73l.09.09a2 2 0 0 1 0 2.83l-.08.08a2 2 0 0 0-.73 2.73l.78 1.22a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0  0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.22a2 2 0 0 0-.73-2.73l-.09-.09a2 2 0 0 1 0-2.83l.08-.08a2 2 0 0 0 .73-2.73l-.78-1.22a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:block w-[52px]"></div>
                </div>

                {/* メッセージ表示エリア */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {messages.map((msg) => (
                        <Message
                            key={msg.id}
                            message={msg}
                            onEdit={handleEditMessage}
                            onDelete={handleDeleteMessage}
                            isMyMessage={msg.isMyMessage}
                            senderName={msg.senderName}
                            senderIcon={msg.senderIcon}
                            myBubbleColor={chatSettings.myBubbleColor}
                            otherBubbleColor={chatSettings.otherBubbleColor}
                            myTextColor={chatSettings.myTextColor}
                            otherTextColor={chatSettings.otherTextColor}
                            displayOnlyMode={displayOnlyMode}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* 入力とボタンのエリア - 表示のみモードでは非表示 */}
                {!displayOnlyMode && (
                    <div className="p-4 border-t border-gray-200 flex flex-col space-y-3 rounded-b-lg bg-gray-50">
                        <div className="flex justify-center items-center flex-wrap gap-2 mb-2">
                            {/* 相手のチャット選択ボタン */}
                            <button
                                className={`flex-1 flex items-center justify-center min-w-[120px] px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${currentSenderType === 'other' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                onClick={() => setCurrentSenderType('other')}
                            >
                                {/* 相手ユーザー選択ボタンのアイコン表示ロジック */}
                                {selectedOtherUserId && otherUsers.find(u => u.id === selectedOtherUserId)?.icon && (
                                    isBase64Image(otherUsers.find(u => u.id === selectedOtherUserId)?.icon) ? (
                                        <img src={otherUsers.find(u => u.id === selectedOtherUserId)?.icon} alt="Other Icon" className="w-6 h-6 rounded-full object-cover mr-2" />
                                    ) : (
                                        <span className="text-xl mr-2">{otherUsers.find(u => u.id === selectedOtherUserId)?.icon}</span>
                                    )
                                )}
                                相手のチャット
                            </button>
                            {/* 自分のチャット選択ボタンとアイコン編集 */}
                            <button
                                className={`flex-1 flex items-center justify-center min-w-[120px] px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${currentSenderType === 'my' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                onClick={() => setCurrentSenderType('my')}
                            >
                                {/* アイコン表示とアイコン編集トリガーを分離 */}
                                {myUser.icon && (
                                    isBase64Image(myUser.icon) ? (
                                        <img src={myUser.icon} alt="My Icon" className="w-6 h-6 rounded-full object-cover mr-2" />
                                    ) : (
                                        <span className="text-xl mr-2">{myUser.icon}</span>
                                    )
                                )}
                                <span className="flex-grow text-center">自分のチャット</span>
                                {/* アイコン編集用の透明なボタンを独立させて配置 */}
                                <button
                                    className="p-1 rounded-full hover:bg-gray-300 transition-colors duration-200 ml-1 opacity-75 hidden lg:block"
                                    onClick={(e) => { e.stopPropagation(); handleOpenIconPicker('my'); }}
                                    title="アイコンを編集"
                                >
                                    <FaUserEdit size={16} />
                                </button>
                            </button>
                        </div>

                        {/* 相手ユーザー選択エリア */}
                        {currentSenderType === 'other' && (
                            <div className="flex flex-wrap items-center gap-2 mb-3 justify-center">
                                {otherUsers.length === 0 ? (
                                    <span className="text-gray-500 text-sm">相手ユーザーを追加してください</span>
                                ) : (
                                    <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                                        {otherUsers.map(user => (
                                            <button
                                                key={user.id}
                                                className={`flex-shrink-0 flex items-center px-3 py-1.5 rounded-full text-xs font-medium mr-2 transition-colors duration-200 ${selectedOtherUserId === user.id ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                                onClick={() => setSelectedOtherUserId(user.id)}
                                            >
                                                {user.icon && (
                                                    isBase64Image(user.icon) ? (
                                                        <img src={user.icon} alt="User Icon" className="w-5 h-5 rounded-full object-cover mr-1" />
                                                    ) : (
                                                        <span className="text-lg mr-1">{user.icon}</span>
                                                    )
                                                )}
                                                {user.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <button
                                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500 text-white shadow-sm hover:bg-purple-600 transition-colors duration-200 flex items-center lg:hidden"
                                    onClick={() => setShowAddUserModal(true)}
                                >
                                    <FaUserPlus size={16} className="mr-1" />
                                    人物を追加
                                </button>
                                <button
                                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-600 text-white shadow-sm hover:bg-gray-700 transition-colors duration-200 flex items-center lg:hidden"
                                    onClick={() => setShowManageUsersModal(true)}
                                >
                                    <FaUserCog size={16} className="mr-1" />
                                    ユーザー管理
                                </button>
                            </div>
                        )}

                        <div className="flex items-center space-x-3">
                            {/* メッセージ入力フィールド */}
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddMessage(input, currentSenderType === 'my', selectedOtherUserId, otherUsers.find(u => u.id === selectedOtherUserId)?.name, otherUsers.find(u => u.id === selectedOtherUserId)?.icon)}
                                placeholder={currentPlaceholder}
                                className="flex-1 py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 shadow-sm"
                            />
                            {/* メッセージ追加ボタン */}
                            <button
                                onClick={() => handleAddMessage(input, currentSenderType === 'my', selectedOtherUserId, otherUsers.find(u => u.id === selectedOtherUserId)?.name, otherUsers.find(u => u.id === selectedOtherUserId)?.icon)}
                                className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 flex items-center justify-center"
                                title="メッセージを追加"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                                    <path d="M12 5L12 19"/><path d="M5 12L19 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ユーザー追加モーダル (引き続きApp.jsxで管理) */}
            {showAddUserModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">新しい人物を追加</h3>
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="人物名を入力"
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddNewUser();
                                    setShowAddUserModal(false);
                                }
                            }}
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                                onClick={() => {
                                    setShowAddUserModal(false);
                                    setNewUserName('');
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                                onClick={() => {
                                    handleAddNewUser();
                                    setShowAddUserModal(false);
                                }}
                            >
                                追加
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ユーザー管理モーダル (スマホ版で引き続き表示) */}
            {showManageUsersModal && (
                <UserManagementModal
                    otherUsers={otherUsers}
                    myUser={myUser}
                    onUpdateOtherUser={handleEditUserSave}
                    onDeleteOtherUser={handleDeleteUserConfirm}
                    onClose={() => {
                        setShowManageUsersModal(false);
                        setEditingUserId(null);
                        setEditingUserName('');
                    }}
                    onOpenIconPicker={handleOpenIconPicker}
                />
            )}

            {/* 削除確認モーダル (引き続きApp.jsxで管理) */}
            {showConfirmDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">ユーザーを削除しますか？</h3>
                        <p className="text-gray-600 mb-6">
                            「{otherUsers.find(user => user.id === userToDeleteId)?.name}」を削除してもよろしいですか？
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                                onClick={() => {
                                    setShowConfirmDeleteModal(false);
                                    setUserToDeleteId(null);
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                                onClick={handleDeleteUser}
                            >
                                削除
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* アイコン選択モーダル (引き続きApp.jsxで管理) */}
            {showIconPickerModal && (
                <IconPickerModal
                    onSelectIcon={handleSelectIcon}
                    onClose={() => setShowIconPickerModal(false)}
                />
            )}

            {/* チャット設定モーダル (スマホ版で引き続き表示) */}
            {showSettingsModal && (
                <ChatSettingsModal
                    settings={chatSettings}
                    onSave={handleSaveChatSettings}
                    onClose={() => setShowSettingsModal(false)}
                    setShowManageUsersModal={setShowManageUsersModal}
                />
            )}
            {/* 右サイドバー (PC版のみ表示) */}
            <div className="hidden lg:block w-80 ml-4 flex-shrink-0">
                <RightSidebar
                    myUser={myUser}
                    setMyUser={setMyUser}
                    otherUsers={otherUsers}
                    setOtherUsers={setOtherUsers}
                    chatSettings={chatSettings}
                    setChatSettings={setChatSettings}
                    handleAddNewUser={handleAddNewUser}
                    handleEditUserSave={handleEditUserSave}
                    handleDeleteUserConfirm={handleDeleteUserConfirm}
                    handleOpenIconPicker={handleOpenIconPicker}
                    newUserName={newUserName}
                    setNewUserName={setNewUserName}
                    editingUserId={editingUserId}
                    setEditingUserId={setEditingUserId}
                    editingUserName={editingUserName}
                    setEditingUserName={setEditingUserName}
                    setShowAddUserModal={setShowAddUserModal}
                />
            </div>
        </div>
    );
};

export default App;