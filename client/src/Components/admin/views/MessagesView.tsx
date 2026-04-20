import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../../../lib/api';
import { useAppSelector } from '../../../store/hooks';

const formatTimestamp = (value) => {
  if (!value) return 'Unknown';

  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const MessagesView = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [messages, setMessages] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : undefined),
    [token]
  );

  const loadMessages = async () => {
    if (!headers) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.get('/contact/messages', { headers });
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (fetchError) {
      setError(
        fetchError?.response?.data?.message || 'Unable to load messages right now.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [token]);

  const handleMarkRead = async (id) => {
    if (!headers) return;

    try {
      const response = await api.patch(`/contact/messages/${id}/read`, {}, { headers });
      setMessages((current) =>
        current.map((message) => (message._id === id ? response.data : message))
      );
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message || 'Unable to mark this message as read.'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!headers) return;

    try {
      await api.delete(`/contact/messages/${id}`, { headers });
      setMessages((current) => current.filter((message) => message._id !== id));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message || 'Unable to delete this message.'
      );
    }
  };

  const filteredMessages = messages.filter((message) => {
    if (activeFilter === 'unread') return !message.read;
    if (activeFilter === 'read') return Boolean(message.read);
    return true;
  });

  const unreadCount = messages.filter((message) => !message.read).length;

  return (
    <div className="subview active" id="sv-messages">
      <div className="sec-head anim">
        <div className="sec-title">
          Inbox <span>({messages.length})</span>
        </div>
        <button className="sec-action" onClick={loadMessages}>
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
