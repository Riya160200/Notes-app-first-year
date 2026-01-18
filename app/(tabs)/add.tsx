// app/(tabs)/add.tsx - FIXED VERSION
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNotes } from '../../hooks/useNotes';
import Colors from '../../constants/Colors';

const NOTE_COLORS = [
  '#FFE4E9', // Light pink
  '#FFC9D6', // Pink
  '#FFB3D9', // Medium pink
  '#E9D5FF', // Lavender
  '#FECDD3', // Rose
  '#FFE4CC', // Peach
  '#FFE4F7', // Magenta
  '#D4E4FF', // Light blue
  '#FFE4D4', // Coral
  '#E4FFD4', // Mint
];

export default function AddNoteScreen() {
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const handleSave = () => {
    if (!content.trim()) {
      Alert.alert('Oops! 💕', 'Please write something before saving!');
      return;
    }

    // Save the note
    addNote(title.trim(), content.trim(), selectedColor);
    
    // Clear the form
    setTitle('');
    setContent('');
    setSelectedColor(NOTE_COLORS[0]);
    
    // Show success message
    Alert.alert(
      '✨ Success!',
      'Your note has been saved beautifully!',
      [
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Create something beautiful ✨</Text>
        </View>

        <View style={[styles.previewCard, { backgroundColor: selectedColor }]}>
          <TextInput
            style={styles.titleInput}
            placeholder="Add a title... 💕"
            placeholderTextColor={Colors.pink[300]}
            value={title}
            onChangeText={setTitle}
            maxLength={50}
          />
          
          <TextInput
            style={styles.contentInput}
            placeholder="What's on your mind? Write your thoughts here..."
            placeholderTextColor={Colors.pink[300]}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.colorSection}>
          <Text style={styles.sectionTitle}>🎨 Choose a color</Text>
          <View style={styles.colorGrid}>
            {NOTE_COLORS.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>💾 Save Note</Text>
        </TouchableOpacity>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            Long press any note to edit or delete it!
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.pink[200],
  },
  headerText: {
    fontSize: 18,
    color: Colors.pink[600],
    textAlign: 'center',
    fontWeight: '600',
  },
  previewCard: {
    borderRadius: 25,
    padding: 20,
    marginBottom: 24,
    minHeight: 300,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  titleInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 105, 180, 0.3)',
  },
  contentInput: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    flex: 1,
    minHeight: 200,
  },
  colorSection: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.pink[100],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.pink[600],
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedColor: {
    borderColor: Colors.pink[600],
    transform: [{ scale: 1.1 }],
    borderWidth: 4,
  },
  checkmark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.pink[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Colors.pink[600],
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.pink[600],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 3,
    borderColor: Colors.pink[700],
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.lavender[100],
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.lavender[200],
  },
  tipIcon: {
    fontSize: 24,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    fontWeight: '500',
  },
});