import AsyncStorage from '@react-native-async-storage/async-storage';

const RELATIONSHIP_DATA_KEY = '@LoveTracker:relationshipData';

export const StorageService = {
  // Save relationship data
  async saveRelationshipData(data) {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(RELATIONSHIP_DATA_KEY, jsonData);
      console.log('Relationship data saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving relationship data:', error);
      return false;
    }
  },

  // Load relationship data
  async loadRelationshipData() {
    try {
      const jsonData = await AsyncStorage.getItem(RELATIONSHIP_DATA_KEY);
      if (jsonData) {
        return JSON.parse(jsonData);
      }
      return null;
    } catch (error) {
      console.error('Error loading relationship data:', error);
      return null;
    }
  },

  // Check if user has completed onboarding
  async hasCompletedOnboarding() {
    const data = await this.loadRelationshipData();
    return data !== null;
  },

  // Clear all relationship data
  async clearRelationshipData() {
    try {
      await AsyncStorage.removeItem(RELATIONSHIP_DATA_KEY);
      console.log('Relationship data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing relationship data:', error);
      return false;
    }
  },

  // Update specific fields
  async updateRelationshipData(updates) {
    try {
      const currentData = await this.loadRelationshipData();
      if (currentData) {
        const updatedData = { ...currentData, ...updates };
        return await this.saveRelationshipData(updatedData);
      }
      return false;
    } catch (error) {
      console.error('Error updating relationship data:', error);
      return false;
    }
  }
};