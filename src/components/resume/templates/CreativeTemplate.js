import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    backgroundColor: '#9c27b0',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    color: 'white',
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#9c27b0',
    textTransform: 'uppercase',
  },
  entryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  entryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff4081',
    marginRight: 10,
    marginTop: 5,
  },
  entryContent: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  entrySubtitle: {
    fontSize: 10,
    marginBottom: 5,
  },
  entryDate: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  entryDescription: {
    fontSize: 10,
    marginTop: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f3e5f5',
    padding: '3 6',
    margin: 2,
    borderRadius: 3,
    color: '#9c27b0',
  },
});

const CreativeTemplate = ({ data, customization }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={[styles.header, { backgroundColor: customization?.primaryColor || '#9c27b0' }]}>
        <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
        <Text style={styles.contact}>{data.email} | {data.phone}</Text>
      </View>
      
      {data.summary && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: customization?.primaryColor || '#9c27b0' }]}>About Me</Text>
          <Text style={styles.entryDescription}>{data.summary}</Text>
        </View>
      )}
      
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: customization?.primaryColor || '#9c27b0' }]}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={[styles.entryDot, { backgroundColor: customization?.secondaryColor || '#ff4081' }]} />
              <View style={styles.entryContent}>
                <Text style={styles.entryTitle}>{exp.position}</Text>
                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                <Text style={styles.entryDate}>{exp.startDate} - {exp.endDate}</Text>
                <Text style={styles.entryDescription}>{exp.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
      
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: customization?.primaryColor || '#9c27b0' }]}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={[styles.entryDot, { backgroundColor: customization?.secondaryColor || '#ff4081' }]} />
              <View style={styles.entryContent}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
                <Text style={styles.entrySubtitle}>{edu.school}</Text>
                <Text style={styles.entryDate}>{edu.graduationDate}</Text>
                <Text style={styles.entryDescription}>{edu.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
      
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: customization?.primaryColor || '#9c27b0' }]}>Skills</Text>
          <View style={styles.skills}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={[styles.skill, { backgroundColor: '#f3e5f5', color: customization?.primaryColor || '#9c27b0' }]}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default CreativeTemplate;