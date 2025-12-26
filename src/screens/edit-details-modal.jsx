import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { X, Check, Users, Calendar } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { NotificationService } from '../services/notificationService';
import { useRelationship } from '../context/RelationshipContext';
import OnboardingContainer from '../components/onboarding/onboarding-container';
import FormInput from '../components/onboarding/form-input';
import ThemeButton from '../components/common/theme-button';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditDetailsModal({
  visible,
  onClose,
  editType // 'names' or 'date'
}) {
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const { relationshipData, updateRelationshipData } = useRelationship();

  useEffect(() => {
    if (relationshipData && visible) {
      setPartner1Name(relationshipData.partner1Name || '');
      setPartner2Name(relationshipData.partner2Name || '');
      setSelectedDate(relationshipData.startDate ? new Date(relationshipData.startDate) : new Date());
    }
  }, [relationshipData, visible]);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      let updates = {};

      if (editType === 'names') {
        if (!partner1Name.trim() || !partner2Name.trim()) {
          alert('Please fill in both names');
          setIsLoading(false);
          return;
        }
        updates = {
          partner1Name: partner1Name.trim(),
          partner2Name: partner2Name.trim()
        };
      } else if (editType === 'date') {
        updates = {
          startDate: selectedDate.toISOString()
        };
      }

      // Update context and storage
      const updatedData = await updateRelationshipData(updates);

      // Update notifications if date changed
      if (editType === 'date') {
        await NotificationService.scheduleAllReminders(updatedData);
      }

      onClose();
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderNamesEditor = () => (
    <View>
      <View className="items-center mb-8">
        <Users size={48} color={colors.accent.rose} />
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'InstrumentSans_SemiCondensed-Regular',
            color: colors.text.primary,
            marginTop: 16
          }}
        >
          Edit Names
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'InstrumentSans-Regular',
            color: colors.text.secondary,
            marginTop: 4
          }}
        >
          Update your beautiful names
        </Text>
      </View>

      <FormInput
        label="First Partner"
        placeholder="Your name"
        value={partner1Name}
        onChangeText={setPartner1Name}
      />

      <FormInput
        label="Second Partner"
        placeholder="Your partner's name"
        value={partner2Name}
        onChangeText={setPartner2Name}
      />
    </View>
  );

  const renderDateEditor = () => (
    <View>
      <View className="items-center mb-8">
        <Calendar size={48} color={colors.accent.rose} />
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'InstrumentSans_SemiCondensed-Regular',
            color: colors.text.primary,
            marginTop: 16
          }}
        >
          Edit Start Date
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'InstrumentSans-Regular',
            color: colors.text.secondary,
            marginTop: 4
          }}
        >
          When did your love story begin?
        </Text>
      </View>

      {/* Date Display */}
      <View
        className="rounded-2xl p-6 mb-6 border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border
        }}
      >
        <Text
          style={{
            fontFamily: 'InstrumentSans-Regular',
            color: colors.text.secondary,
            fontSize: 14,
            marginBottom: 8
          }}
        >
          Your relationship started on:
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'InstrumentSans-Medium',
            color: colors.text.primary
          }}
        >
          {formatDate(selectedDate)}
        </Text>
      </View>

      {/* Date Picker Button */}
      <ThemeButton
        title="Change Date"
        variant="secondary"
        onPress={() => setShowDatePicker(true)}
        style={{ marginBottom: 16 }}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="p-2"
            >
              <X size={24} color={colors.text.primary} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                fontFamily: 'InstrumentSans-SemiBold',
                color: colors.text.primary
              }}
            >
              {editType === 'names' ? 'Edit Names' : 'Edit Start Date'}
            </Text>

            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.8}
              className="p-2"
              disabled={isLoading}
            >
              <Check size={24} color={isLoading ? colors.text.muted : colors.accent.rose} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <OnboardingContainer showKeyboardAvoidingView={editType === 'names'}>
          {editType === 'names' ? renderNamesEditor() : renderDateEditor()}

          {/* Save Button */}
          <ThemeButton
            title={isLoading ? "Saving..." : "Save Changes"}
            onPress={handleSave}
            disabled={isLoading || (editType === 'names' && (!partner1Name.trim() || !partner2Name.trim()))}
            style={{ marginTop: 24 }}
          />
        </OnboardingContainer>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}