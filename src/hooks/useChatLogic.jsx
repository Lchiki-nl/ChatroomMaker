import { useState, useCallback } from 'react';
import { availableIcons } from '../utils/constants';

export const useChatLogic = () => {
    const [myUser, setMyUser] = useState({ id: 'my', name: '自分', icon: '😀' });
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [currentSenderType, setCurrentSenderType] = useState('my');
    const [otherUsers, setOtherUsers] = useState([
        { id: 'other1', name: '相手A', icon: '🤖' },
    ]);
    const [selectedOtherUserId, setSelectedOtherUserId] = useState(otherUsers[0]?.id || null);
    const [newUserName, setNewUserName] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUserName, setEditingUserName] = useState('');
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState(null);
    const [showIconPickerModal, setShowIconPickerModal] = useState(false);
    const [iconTargetUserId, setIconTargetUserId] = useState(null);
    const [displayOnlyMode, setDisplayOnlyMode] = useState(false);

    const [chatSettings, setChatSettings] = useState({
        chatRoomName: 'チャットルーム',
        myBubbleColor: '#06c755',
        otherBubbleColor: '#EDF1EE',
        chatBackgroundColor: '#7494C0',
        myTextColor: '#000000',
        otherTextColor: '#000000',
        headerBackgroundColor: '#273246',
        headerTextColor: '#ffffff',
        autoReadMode: false,
    });

    // Helper to check if a string is a base64 image data URL
    const isBase64Image = (str) => typeof str === 'string' && str.startsWith('data:image/');

    // 新しいメッセージを追加するハンドラー
    const handleAddMessage = useCallback((text, isMy, senderId, senderName, senderIcon) => {
        if (!text.trim()) return;

        const now = new Date();
        let calculatedReadCount = 0;
        if (chatSettings.autoReadMode) {
            const currentOtherUsersCount = otherUsers.length;
            if (currentOtherUsersCount === 1) {
                calculatedReadCount = 1;
            } else if (currentOtherUsersCount >= 2) {
                calculatedReadCount = currentOtherUsersCount;
            }
        }

        const newMessage = {
            id: Date.now() + Math.random(),
            text: text,
            isMyMessage: isMy,
            senderId: isMy ? myUser.id : senderId,
            senderName: isMy ? myUser.name : (isBase64Image(senderName) ? '相手' : senderName), // ★変更点: senderNameが画像URLなら「相手」にする
            senderIcon: isMy ? myUser.icon : senderIcon,
            readCount: calculatedReadCount,
            timestamp: now.toISOString(),
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInput('');
    }, [chatSettings.autoReadMode, myUser, otherUsers]);

    // メッセージを編集するハンドラー
    const handleEditMessage = (id, newText, newReadCount, newTimestamp) => {
        setMessages(prevMessages => prevMessages.map(msg =>
            msg.id === id ? { ...msg, text: newText, readCount: newReadCount, timestamp: newTimestamp } : msg
        ));
    };

    // メッセージを削除するハンドラー
    const handleDeleteMessage = (id) => {
        setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
    };

    // 新しい相手ユーザーを追加するハンドラー
    const handleAddNewUser = useCallback(() => {
        if (newUserName.trim() === '') return;
        const newUser = {
            id: `other${Date.now()}`,
            name: newUserName.trim(), // ここでnewUserNameが画像Data URLにならないように注意
            icon: availableIcons[Math.floor(Math.random() * availableIcons.length)],
        };
        setOtherUsers(prevUsers => [...prevUsers, newUser]);
        setNewUserName('');
        if (!selectedOtherUserId || otherUsers.length === 0) {
            setSelectedOtherUserId(newUser.id);
        }
    }, [newUserName, otherUsers, selectedOtherUserId]);

    // ユーザー編集を保存するハンドラー
    const handleEditUserSave = useCallback((userId, updatedName) => {
        if (updatedName.trim() === '') return;
        setOtherUsers(prevUsers => prevUsers.map(user =>
            user.id === userId ? { ...user, name: updatedName.trim() } : user
        ));
        setMessages(prevMessages => prevMessages.map(msg =>
            // メッセージのsenderNameを更新する際に、更新後の名前が画像Data URLの場合は調整
            msg.senderId === userId ? { ...msg, senderName: (isBase64Image(updatedName) ? '相手' : updatedName.trim()) } : msg
        ));
        setEditingUserId(null);
        setEditingUserName('');
    }, []);

    // ユーザー削除確認を開始するハンドラー
    const handleDeleteUserConfirm = useCallback((userId) => {
        setUserToDeleteId(userId);
        setShowConfirmDeleteModal(true);
    }, []);

    // ユーザーを削除するハンドラー
    const handleDeleteUser = useCallback(() => {
        if (userToDeleteId) {
            setOtherUsers(prevUsers => prevUsers.filter(user => user.id !== userToDeleteId));
            if (selectedOtherUserId === userToDeleteId) {
                setSelectedOtherUserId(otherUsers.filter(user => user.id !== userToDeleteId)[0]?.id || null);
            }
            setMessages(prevMessages => prevMessages.map(msg =>
                // 削除されたユーザーのメッセージの送信者名を更新（完全に削除するのではなく）
                msg.senderId === userToDeleteId ? { ...msg, senderName: `${msg.senderName} (削除済み)`, senderIcon: '🗑️'} : msg
            ));
        }
        setShowConfirmDeleteModal(false);
        setUserToDeleteId(null);
    }, [userToDeleteId, otherUsers, selectedOtherUserId]);

    // アイコンピッカーを開くハンドラー
    const handleOpenIconPicker = useCallback((userId) => {
        setIconTargetUserId(userId);
        setShowIconPickerModal(true);
    }, []);

    // アイコンを選択するハンドラー
    const handleSelectIcon = useCallback((icon) => {
        if (iconTargetUserId === 'my') {
            setMyUser(prev => ({ ...prev, icon: icon }));
            setMessages(prevMessages => prevMessages.map(msg =>
                msg.senderId === 'my' ? { ...msg, senderIcon: icon } : msg
            ));
        } else {
            setOtherUsers(prevUsers => prevUsers.map(user =>
                user.id === iconTargetUserId ? { ...user, icon: icon } : user
            ));
            setMessages(prevMessages => prevMessages.map(msg =>
                msg.senderId === iconTargetUserId ? { ...msg, senderIcon: icon } : msg
            ));
        }
        setShowIconPickerModal(false);
        setIconTargetUserId(null);
    }, [iconTargetUserId]);

    // チャット設定を保存するハンドラー
    const handleSaveChatSettings = useCallback((newSettings) => {
        setChatSettings(newSettings);
    }, []);

    return {
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
        handleAddNewUser, handleEditUserSave, handleDeleteUserConfirm, handleDeleteUser,
        handleOpenIconPicker, handleSelectIcon, handleSaveChatSettings
    };
};