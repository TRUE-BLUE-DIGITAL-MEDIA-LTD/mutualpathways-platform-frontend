import { describe, it, expect } from 'vitest';
import {
  addOptimistic,
  applyAck,
  applyIncoming,
  applyRead,
  markFailed,
  mergeHistory,
  prependOlder,
} from './reconcile';
import { ChatMessage, ServerMessage } from './types';

const ME = 'me';
const OTHER = 'other';

function draft(tempId: string, content = 'hi') {
  return {
    clientTempId: tempId,
    senderId: ME,
    receiverId: OTHER,
    content,
    createdAt: '2024-01-01T00:00:10.000Z',
  };
}

function serverMsg(id: string, overrides: Partial<ServerMessage> = {}): ServerMessage {
  return {
    id,
    senderId: ME,
    receiverId: OTHER,
    content: 'hi',
    createdAt: '2024-01-01T00:00:10.000Z',
    deliveredAt: null,
    readAt: null,
    ...overrides,
  };
}

describe('addOptimistic', () => {
  it('adds a pending message keyed by clientTempId', () => {
    const result = addOptimistic([], draft('t1'));
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 't1',
      clientTempId: 't1',
      status: 'pending',
    });
  });
});

describe('applyAck', () => {
  it('reconciles the pending message into a sent one (ack before message:new)', () => {
    const pending = addOptimistic([], draft('t1'));
    const result = applyAck(pending, {
      id: 'real-1',
      createdAt: '2024-01-01T00:00:11.000Z',
      clientTempId: 't1',
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'real-1', status: 'sent' });
    expect(result[0].clientTempId).toBe('t1');
  });

  it('drops the pending temp when the real message already arrived (message:new before ack)', () => {
    let state = addOptimistic([], draft('t1'));
    state = applyIncoming(state, serverMsg('real-1'));
    expect(state).toHaveLength(2);
    state = applyAck(state, {
      id: 'real-1',
      createdAt: '2024-01-01T00:00:11.000Z',
      clientTempId: 't1',
    });
    expect(state).toHaveLength(1);
    expect(state[0].id).toBe('real-1');
  });
});

describe('applyIncoming', () => {
  it('appends a new message', () => {
    const result = applyIncoming([], serverMsg('m1'));
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'm1', status: 'sent' });
  });

  it('dedups by id', () => {
    const once = applyIncoming([], serverMsg('m1'));
    const twice = applyIncoming(once, serverMsg('m1'));
    expect(twice).toHaveLength(1);
  });
});

describe('applyRead', () => {
  it('marks my sent unread messages as read', () => {
    const messages: ChatMessage[] = [
      { ...serverMsg('m1', { senderId: ME }), status: 'sent' },
      { ...serverMsg('m2', { senderId: OTHER }), status: 'sent' },
    ];
    const result = applyRead(messages, ME, '2024-01-02T00:00:00.000Z');
    expect(result[0].readAt).toBe('2024-01-02T00:00:00.000Z');
    expect(result[1].readAt).toBeNull();
  });
});

describe('markFailed', () => {
  it('sets a pending message to failed', () => {
    const pending = addOptimistic([], draft('t1'));
    const result = markFailed(pending, 't1');
    expect(result[0].status).toBe('failed');
  });
});

describe('mergeHistory', () => {
  it('merges server history with existing, deduping by id and keeping pending temps', () => {
    let state = addOptimistic([], draft('t1'));
    state = applyIncoming(state, serverMsg('m1', { createdAt: '2024-01-01T00:00:05.000Z' }));
    const merged = mergeHistory(state, [
      serverMsg('m1', { createdAt: '2024-01-01T00:00:05.000Z' }),
      serverMsg('m0', { createdAt: '2024-01-01T00:00:01.000Z' }),
    ]);
    const ids = merged.map((m) => m.id);
    expect(ids).toContain('m0');
    expect(ids).toContain('m1');
    expect(ids).toContain('t1');
    expect(merged.filter((m) => m.id === 'm1')).toHaveLength(1);
  });
});

describe('prependOlder', () => {
  it('prepends older messages, skipping duplicates', () => {
    const existing: ChatMessage[] = [
      { ...serverMsg('m2', { createdAt: '2024-01-01T00:00:20.000Z' }), status: 'sent' },
    ];
    const result = prependOlder(existing, [
      serverMsg('m1', { createdAt: '2024-01-01T00:00:10.000Z' }),
      serverMsg('m2', { createdAt: '2024-01-01T00:00:20.000Z' }),
    ]);
    expect(result.map((m) => m.id)).toEqual(['m1', 'm2']);
  });
});
