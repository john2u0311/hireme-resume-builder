import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  sidebar: {
    width: '30%',
    padding: 20,
    color: '#fff'
  },
  content: {
    width: '70%',
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  contact: {
    fontSize: 10,
    marginBottom: 3
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase'
  },
  sectionContent: {
    marginBottom: 15
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 5,
    padding: '3 8',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3
  },
  experienceItem: {
    marginBottom: 10
  },
  company: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  position: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 3
  },
  description: {
    fontSize: 9
  }
});

const CreativeTemplate = ({ data, customization }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={[styles.sidebar, { backgroundColor: customization.primaryColor }]}>
        <View style={styles.header}>
          <Text style={styles.name}>{`${data.firstName}\n${data.lastName}`}</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.contact}>{data.email}</Text>
          <Text style={styles.contact}>{data.phone}</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.skillItem}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionContent}>
          <Text style={[styles.sectionTitle, { color: customization.secondaryColor }]}>
            Experience
          </Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.position}>{exp.position}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionContent}>
          <Text style={[styles.sectionTitle, { color: customization.secondaryColor }]}>
            Education
          </Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.position}>{edu.degree}</Text>
              <Text style={styles.description}>{edu.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default CreativeTemplate;