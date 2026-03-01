import React from 'react';

const LeftSidebar = ({
    chatSettings, setChatSettings,
}) => {
    return (
        <div className="w-full h-full bg-white rounded-lg p-4 shadow-md overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">チャットルーム設定</h2>

            {/* チャットルーム名、色の設定のみを保持 */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="chatRoomName" className="block text-sm font-medium text-gray-700 mb-1">
                        チャットルームの名前
                    </label>
                    <input
                        id="chatRoomName"
                        type="text"
                        value={chatSettings.chatRoomName}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, chatRoomName: e.target.value }))}
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
                        value={chatSettings.myBubbleColor}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, myBubbleColor: e.target.value }))}
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
                        value={chatSettings.myTextColor}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, myTextColor: e.target.value }))}
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
                        value={chatSettings.otherBubbleColor}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, otherBubbleColor: e.target.value }))}
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
                        value={chatSettings.otherTextColor}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, otherTextColor: e.target.value }))}
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
                        value={chatSettings.chatBackgroundColor}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, chatBackgroundColor: e.target.value }))}
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
                        value={chatSettings.headerBackgroundColor}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, headerBackgroundColor: e.target.value }))}
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
                        value={chatSettings.headerTextColor}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, headerTextColor: e.target.value }))}
                        className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                    />
                </div>
                {/* 自動既読モードはここから削除されました */}
            </div>
        </div>
    );
};

export default LeftSidebar;