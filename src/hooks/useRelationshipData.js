import { useState, useEffect } from 'react';
import { StorageService } from '../utils/storage';

export const useRelationshipData = (navigation) => {
  const [relationshipData, setRelationshipData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRelationshipData();
  }, []);

  const loadRelationshipData = async () => {
    try {
      const data = await StorageService.loadRelationshipData();
      if (data) {
        setRelationshipData(data);
      } else {
        // No data found, redirect to onboarding
        if (navigation) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        }
      }
    } catch (error) {
      console.error('Error loading relationship data:', error);
      // On error, also redirect to onboarding
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateRelationshipData = async (updates) => {
    try {
      const updatedData = { ...relationshipData, ...updates };
      await StorageService.saveRelationshipData(updatedData);
      setRelationshipData(updatedData);
      return true;
    } catch (error) {
      console.error('Error updating relationship data:', error);
      return false;
    }
  };

  return {
    relationshipData,
    setRelationshipData,
    isLoading,
    loadRelationshipData,
    updateRelationshipData
  };
};