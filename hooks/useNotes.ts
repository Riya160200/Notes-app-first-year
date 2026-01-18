// hooks/useNotes.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: number;
}

const STORAGE_KEY = '@notes_storage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = async (newNotes: Note[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = (title: string, content: string, color: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      color,
      createdAt: Date.now(),
    };
    const updated = [newNote, ...notes];
    saveNotes(updated);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(note => note.id !== id);
    saveNotes(updated);
  };

  const updateNote = (id: string, title: string, content: string) => {
    const updated = notes.map(note =>
      note.id === id ? { ...note, title, content } : note
    );
    saveNotes(updated);
  };

  return {
    notes,
    loading,
    addNote,
    deleteNote,
    updateNote,
  };
};