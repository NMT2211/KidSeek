import React, { useState, useEffect, useRef } from 'react';

const formatMessageText = (text) => {
  if (!text) return '';
  let formattedText = text;
  formattedText = formattedText.replace(/\n/g, '<br>');
  formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  formattedText = formattedText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return formattedText;
};

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      content: 'Xin chào! Thầy Seek đây. Hôm nay em muốn hỏi gì về bài học của mình?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }

    e.target.value = '';
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    const newMessage = {
      id: Date.now().toString(),
      content: input || '(Tệp đính kèm)',
      sender: 'user',
      timestamp: new Date(),
      attachments: selectedFile
        ? [{ type: selectedFile.type.startsWith('image/') ? 'image' : 'pdf', url: filePreview }]
        : []
    };

    setMessages(prev => [...prev, newMessage, {
      id: 'bot-' + Date.now(),
      content: 'Cảm ơn em, thầy sẽ xem nhé!',
      sender: 'bot',
      timestamp: new Date()
    }]);

    setInput('');
    setSelectedFile(null);
    setFilePreview(null);
  };

  return (
    <div className="chat-page ">
      <div className="chat-header">
        <div className="chat-title">
          <img src="/teacher-seek.svg" alt="Thầy Seek" className="teacher-avatar" />
          <div className="chat-info">
            <h2>Thầy Seek</h2>
            <p>Trợ lý học tập cá nhân</p>
          </div>
        </div>
      </div>

      <div className="chat-messages" >
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            {message.sender === 'bot' && (
              <div className="avatar">
                <img src="/teacher-seek.svg" alt="Thầy Seek" />
              </div>
            )}

            <div className="message-content">
              {message.attachments && message.attachments.map((att, idx) => (
                <div key={idx} className="attachment">
                  {att.type === 'image' ? (
                    <img src={att.url} alt="Preview" className="attachment-image" />
                  ) : (
                    <div className="pdf-attachment">
                      <i className="bi bi-file-earmark-text"></i>
                      <span>PDF</span>
                    </div>
                  )}
                </div>
              ))}

              <div className="message-text" dangerouslySetInnerHTML={{ __html: formatMessageText(message.content) }} />
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.sender === 'user' && (
              <div className="avatar user-avatar">
                <i className="bi bi-person-fill"></i>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container">
        {selectedFile && (
          <div className="file-preview">
            {filePreview ? (
              <img src={filePreview} alt="Preview" className="image-preview" />
            ) : (
              <div className="pdf-preview">
                <i className="bi bi-file-earmark-text"></i>
                <span>{selectedFile.name}</span>
              </div>
            )}
            <button type="button" className="remove-file-btn" onClick={removeSelectedFile}>
              <i className="bi bi-x"></i>
            </button>
          </div>
        )}

        <div className="chat-controls">
          <label className="upload-btn">
            <i className="bi bi-paperclip"></i>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </label>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              textareaRef.current.style.height = 'auto';
              textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }}
            placeholder="Nhập câu hỏi..."
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            style={{ resize: 'none', overflow: 'hidden', maxHeight: '200px' }}
          />
          <button type="submit" className="send-btn">
            <i className="bi bi-send"></i>
          </button>
        </div>
      </form>
    </div>
  );
};


