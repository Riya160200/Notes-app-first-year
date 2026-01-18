// app/(tabs)/index.tsx - FIXED VERSION
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNotes } from '../../hooks/useNotes';
import NoteCard from '../../components/NoteCard';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { notes, loading, deleteNote, updateNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLongPress = (note: any) => {
    Alert.alert(
      '💕 Note Options',
      'What would you like to do?',
      [
        {
          text: 'Edit',
          onPress: () => {
            setEditingNote(note);
            setEditTitle(note.title);
            setEditContent(note.content);
          },
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(note.id),
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      '🗑️ Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteNote(id),
          style: 'destructive',
        },
      ]
    );
  };

  const handleSaveEdit = () => {
    if (editingNote && editContent.trim()) {
      updateNote(editingNote.id, editTitle.trim(), editContent.trim());
      setEditingNote(null);
      setEditTitle('');
      setEditContent('');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.pink[600]} />
        <Text style={styles.loadingText}>Loading your notes... 💕</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome back! 💕</Text>
        <Text style={styles.noteCount}>
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.pink[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your notes..."
          placeholderTextColor={Colors.pink[300]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={Colors.pink[400]} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.pink[600]]}
            tintColor={Colors.pink[600]}
          />
        }
      >
        {filteredNotes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No notes found' : 'No notes yet!'}
            </Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Try a different search' : 'Tap the Create tab to add your first note 💕'}
            </Text>
          </View>
        ) : (
          <View style={styles.masonry}>
            <View style={styles.column}>
              {filteredNotes
                .filter((_, index) => index % 2 === 0)
                .map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onPress={() => {}}
                    onLongPress={() => handleLongPress(note)}
                  />
                ))}
            </View>
            <View style={styles.column}>
              {filteredNotes
                .filter((_, index) => index % 2 !== 0)
                .map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onPress={() => {}}
                    onLongPress={() => handleLongPress(note)}
                  />
                ))}
            </View>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={editingNote !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditingNote(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>✏️ Edit Note</Text>
              <TouchableOpacity onPress={() => setEditingNote(null)}>
                <Ionicons name="close" size={28} color={Colors.pink[600]} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.modalTitleInput}
              placeholder="Title (optional)"
              placeholderTextColor={Colors.pink[300]}
              value={editTitle}
              onChangeText={setEditTitle}
            />
            
            <TextInput
              style={styles.modalContentInput}
              placeholder="What's on your mind?"
              placeholderTextColor={Colors.pink[300]}
              value={editContent}
              onChangeText={setEditContent}
              multiline
              textAlignVertical="top"
            />
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.saveButtonText}>💾 Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.pink[600],
    fontWeight: '600',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.pink[600],
    marginBottom: 4,
  },
  noteCount: {
    fontSize: 14,
    color: Colors.pink[400],
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: Colors.pink[100],
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  masonry: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.pink[600],
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.pink[600],
  },
  modalTitleInput: {
    backgroundColor: Colors.pink[50],
    borderRadius: 15,
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.pink[100],
  },
  modalContentInput: {
    backgroundColor: Colors.pink[50],
    borderRadius: 15,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
    minHeight: 200,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.pink[100],
  },
  saveButton: {
    backgroundColor: Colors.pink[600],
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    shadowColor: Colors.pink[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: Colors.card,
    fontSize: 18,
    fontWeight: 'bold',
  },
});