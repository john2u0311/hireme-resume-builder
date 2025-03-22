import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 20,
    marginBottom: 20
  },
  content: {
    padding: '0 20px'
  },
  name: {
    fontSize: 28,
    marginBottom: 5
  },
  contact: {
    fontSize: 10,
    color: '#fff'
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    borderBottom: '1px solid #333'
  }
});

const ModernTemplate = ({ data, customization }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Template content here */}
    </Page>
  </Document>
);

export default ModernTemplate;