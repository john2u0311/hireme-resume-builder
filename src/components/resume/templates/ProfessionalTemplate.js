import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { marginBottom: 20 },
  name: { fontSize: 24, marginBottom: 5 },
  contact: { fontSize: 12, marginBottom: 3 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 16, marginBottom: 10, borderBottom: '1pt solid black' },
  item: { marginBottom: 10 },
  itemTitle: { fontSize: 14, marginBottom: 3 },
  itemSubtitle: { fontSize: 12, marginBottom: 3 },
  description: { fontSize: 10 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  skill: { fontSize: 10, padding: '3 8', backgroundColor: '#f0f0f0', borderRadius: 3 }
});

function ProfessionalTemplate({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{`${data.firstName} ${data.lastName}`}</Text>
          <Text style={styles.contact}>{data.email}</Text>
          <Text style={styles.contact}>{data.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemTitle}>{exp.company}</Text>
              <Text style={styles.itemSubtitle}>{exp.position}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemTitle}>{edu.school}</Text>
              <Text style={styles.itemSubtitle}>{edu.degree}</Text>
              <Text style={styles.description}>{edu.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ProfessionalTemplate;