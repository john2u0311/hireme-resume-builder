import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const ProfessionalTemplate = ({ data, customization }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: customization.font
    },
    header: {
      backgroundColor: customization.primaryColor,
      padding: 20,
      color: 'white'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{`${data.firstName} ${data.lastName}`}</Text>
          <Text>{data.email} | {data.phone}</Text>
        </View>
        <View style={styles.section}>
          <Text>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index}>
              <Text>{exp.company}</Text>
              <Text>{exp.position}</Text>
            </View>
          ))}
        </View>
        {/* Add more sections for education and skills */}
      </Page>
    </Document>
  );
};

export default ProfessionalTemplate;