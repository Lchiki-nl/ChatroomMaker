import React, { useState } from 'react';
import { availableIcons } from '../../utils/constants';

// アイコン選択モーダルコンポーネント
const IconPickerModal = ({ onSelectIcon, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageSelect = () => {
        if (selectedImage) {
            onSelectIcon(selectedImage);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">アイコンを選択</h3>

                {/* 絵文字アイコン選択エリア */}
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3 max-h-60 overflow-y-auto custom-scrollbar mb-6 border-b pb-4">
                    {availableIcons.map((icon, index) => (
                        <button
                            key={index}
                            className="text-4xl p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                            onClick={() => {
                                onSelectIcon(icon);
                                onClose();
                            }}
                        >
                            {icon}
                        </button>
                    ))}
                </div>

                {/* 画像アップロードエリア */}
                <div className="mt-4">
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                        または画像をアップロード:
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        // ★ここを修正しました: classNameの文字列を1行にまとめる
                        className="w-full text-gray-700 text-sm mb-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    {selectedImage && (
                        <div className="mt-4 flex items-center space-x-4">
                            <img src={selectedImage} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-gray-300" />
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                                onClick={handleImageSelect}
                            >
                                この画像をアイコンに設定
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
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

export default IconPickerModal;