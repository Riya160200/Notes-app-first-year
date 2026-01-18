// components/NoteCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Note } from '../hooks/useNotes';
import Colors from '../constants/Colors';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onLongPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

export default function NoteCard({ note, onPress, onLongPress }: NoteCardProps) {
  const contentHeight = Math.max(150, Math.min(300, note.content.length * 0.8));

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: note.color, height: contentHeight }]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        {note.title ? (
          <Text style={styles.title} numberOfLines={2}>
            {note.title}
          </Text>
        ) : null}
        <Text style={styles.noteText} numberOfLines={8}>
          {note.content}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});