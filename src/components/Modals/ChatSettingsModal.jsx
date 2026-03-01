import React, { useState } from 'react';

// チャット設定モーダルコンポーネント
const ChatSettingsModal = ({ settings, onSave, onClose, setShowManageUsersModal }) => { // ★追加: setShowManageUsersModal をプロップとして受け取る
    // 内部ステートはSidebarに移行したため不要だが、必要に応じて残す
    // このモーダルはスマホ版用なので、App.jsxからchatSettingsを直接受け取る
    const [currentName, setCurrentName] = useState(settings.chatRoomName);
    const [currentMyBubbleColor, setCurrentMyBubbleColor] = useState(settings.myBubbleColor);
    const [currentOtherBubbleColor, setCurrentOtherBubbleColor] = useState(settings.otherBubbleColor);
    const [currentChatBackgroundColor, setCurrentChatBackgroundColor] = useState(settings.chatBackgroundColor);
    const [currentMyTextColor, setCurrentMyTextColor] = useState(settings.myTextColor);
    const [currentOtherTextColor, setCurrentOtherTextColor] = useState(settings.otherTextColor);
    const [currentHeaderBackgroundColor, setCurrentHeaderBackgroundColor] = useState(settings.headerBackgroundColor);
    const [currentHeaderTextColor, setCurrentHeaderTextColor] = useState(settings.headerTextColor);
    const [currentAutoReadMode, setCurrentAutoReadMode] = useState(settings.autoReadMode);

    const handleSave = () => {
        onSave({
            chatRoomName: currentName,
            myBubbleColor: currentMyBubbleColor,
            otherBubbleColor: currentOtherBubbleColor,
            chatBackgroundColor: currentChatBackgroundColor,
            myTextColor: currentMyTextColor,
            otherTextColor: currentOtherTextColor,
            headerBackgroundColor: currentHeaderBackgroundColor,
            headerTextColor: currentHeaderTextColor,
            autoReadMode: currentAutoReadMode,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">チャット設定</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="chatRoomName" className="block text-sm font-medium text-gray-700 mb-1">
                            チャットルームの名前
                        </label>
                        <input
                            id="chatRoomName"
                            type="text"
                            value={currentName}
                            onChange={(e) => setCurrentName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="myBubbleColor" className="block text-sm font-medium text-gray-700 mb-1">
                            自分のチャットの吹き出しの色 (HEX)
                        </label>
                        <input
                            id="myBubbleColor"
                            type="color"
                            value={currentMyBubbleColor}
                            onChange={(e) => setCurrentMyBubbleColor(e.target.value)}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                     <div>
                        <label htmlFor="myTextColor" className="block text-sm font-medium text-gray-700 mb-1">
                            自分のチャットの文字色 (HEX)
                        </label>
                        <input
                            id="myTextColor"
                            type="color"
                            value={currentMyTextColor}
                            onChange={(e) => setCurrentMyTextColor(e.target.value)}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                    <div>
                        <label htmlFor="otherBubbleColor" className="block text-sm font-medium text-gray-700 mb-1">
                            相手のチャットの吹き出しの色 (HEX)
                        </label>
                        <input
                            id="otherBubbleColor"
                            type="color"
                            value={currentOtherBubbleColor}
                            onChange={(e) => setCurrentOtherBubbleColor(e.target.value)}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                    <div>
                        <label htmlFor="otherTextColor" className="block text-sm font-medium text-gray-700 mb-1">
                            相手のチャットの文字色 (HEX)
                        </label>
                        <input
                            id="otherTextColor"
                            type="color"
                            value={currentOtherTextColor}
                            onChange={(e) => setCurrentOtherTextColor(e.target.value)}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                    <div>
                        <label htmlFor="chatBackgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                            チャットルームの背景色 (HEX)
                        </label>
                        <input
                            id="chatBackgroundColor"
                            type="color"
                            value={currentChatBackgroundColor}
                            onChange={(e) => setCurrentChatBackgroundColor(e.target.value)}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                    <div>
                        <label htmlFor="headerBackgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                            ヘッダーの背景色 (HEX)
                        </label>
                        <input
                            id="headerBackgroundColor"
                            type="color"
                            value={currentHeaderBackgroundColor}
                            onChange={(e) => setCurrentHeaderBackgroundColor(e.target.value)}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                    <div>
                        <label htmlFor="headerTextColor" className="block text-sm font-medium text-gray-700 mb-1">
                            ヘッダーの文字色 (HEX)
                        </label>
                        <input
                            id="headerTextColor"
                            type="color"
                            value={currentHeaderTextColor}
                            onChange={(e) => setCurrentHeaderTextColor(e.target.value)}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                     <div>
                        <label htmlFor="autoReadMode" className="block text-sm font-medium text-gray-700 mb-1">
                            自動既読モード
                        </label>
                        <input
                            id="autoReadMode"
                            type="checkbox"
                            checked={currentAutoReadMode}
                            onChange={(e) => setCurrentAutoReadMode(e.target.checked)}
                            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            ONにすると、相手の数に応じて既読が自動設定されます。
                        </span>
                    </div>
                    {/* ★追加: ユーザー管理ボタン */}
                    <div className="border-t pt-4 mt-4">
                        <button
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                            onClick={() => {
                                setShowManageUsersModal(true); // ユーザー管理モーダルを開く
                                onClose(); // 現在の設定モーダルを閉じる
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round">
                                <path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="7" r="4"/><path d="M22 21a8 8 0 0 0-16 0"/><circle cx="16" cy="7" r="4"/>
                            </svg>
                            <span>ユーザー管理</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                        onClick={onClose}
                    >
                        キャンセル
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        onClick={handleSave}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSettingsModal;