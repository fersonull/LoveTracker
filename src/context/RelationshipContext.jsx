import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../utils/storage';

const RelationshipContext = createContext();

export const useRelationship = () => {
  const context = useContext(RelationshipContext);
  if (!context) {
    throw new Error('useRelationship must be used within a RelationshipProvider');
  }
  return context;
};

export const RelationshipProvider = ({ children }) => {
  const [relationshipData, setRelationshipData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRelationshipData();
  }, []);

  const loadRelationshipData = async () => {
    try {
      setIsLoading(true);
      const data = await StorageService.loadRelationshipData();
      setRelationshipData(data);
    } catch (error) {
      console.error('Error loading relationship data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRelationshipData = async (updates) => {
    try {
      const updatedData = { ...relationshipData, ...updates };
      await StorageService.saveRelationshipData(updatedData);
      setRelationshipData(updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error updating relationship data:', error);
      throw error;
    }
  };

  const refreshData = async () => {
    await loadRelationshipData();
  };

  return (
    <RelationshipContext.Provider
      value={{
        relationshipData,
        setRelationshipData,
        isLoading,
        updateRelationshipData,
        refreshData,
        loadRelationshipData
      }}
    >
      {children}
    </RelationshipContext.Provider>
  );
};