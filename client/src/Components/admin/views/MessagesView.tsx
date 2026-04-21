import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../../store/api/portfolioContext';

const formatTimestamp = (value) => {
  if (!value) return 'Unknown';

  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const MessagesView = () => {
  const { messages, loading, error, refreshMessages, markMessageRead, deleteMessage } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('all');

  const handleMarkRead = (id) => markMessageRead(id);
  const handleDelete = (id) => deleteMessage(id);

  const filteredMessages = messages?.filter((message) => {
    if (activeFilter === 'unread') return !message.read;
    if (activeFilter === 'read') return Boolean(message.read);
    return true;
  }) || [];
  const unreadCount = messages?.filter((message) => !message.read).length || 0;

  return (
    <div className="subview active" id="sv-messages">
      <div className="sec-head anim">
        <div className="sec-title">
          Inbox <span>({messages.length})</span>
        </div>
        <button className="sec-action" onClick={refreshMessages}>
          Refresh
        </button>
      </div>
      <div className="msg-filters anim">
        <button
          className={`msg-filter ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All ({messages.length})
        </button>
        <button
          className={`msg-filter ${activeFilter === 'unread' ? 'active' : ''}`}
          onClick={() => setActiveFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`msg-filter ${activeFilter === 'read' ? 'active' : ''}`}
          onClick={() => setActiveFilter('read')}
        >
          Read ({messages.length - unreadCount})
        </button>
      </div>
      {error ? (
        <div className="anim" style={{ color: '#ff6b6b', marginBottom: '16px' }}>
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="anim" style={{ color: 'var(--muted)' }}>
          Loading messages...
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="anim" style={{ color: 'var(--muted)' }}>
          No messages found for this filter.
        </div>
      ) : (
        filteredMessages.map((message, index) => (
          <div key={message._id} className={`msg-card ${message.read ? '' : 'unread'} anim ${index ? 'anim-d1' : ''}`}>
            <div className="msg-header">
              <div>
                <div className="msg-from">
                  {message.name}
                  {!message.read ? (
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-m)',
                        padding: '2px 8px',
                        background: 'rgba(100,255,218,.08)',
                        color: 'var(--accent)',
                        marginLeft: '8px',
                      }}
                    >
                      NEW
                    </span>
                  ) : null}
                </div>
                <div className="msg-email">{message.email}</div>
              </div>
              <div className="msg-time">{formatTimestamp(message.createdAt)}</div>
            </div>
            <div className="msg-subject">{message.subject}</div>
            <div className="msg-body">{message.message}</div>
            <div className="msg-actions">
              {!message.read ? (
                <button className="act-btn edit" onClick={() => handleMarkRead(message._id)}>
                  Mark read
                </button>
              ) : null}
              <button className="act-btn del" onClick={() => handleDelete(message._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
