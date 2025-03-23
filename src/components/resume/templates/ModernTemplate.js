import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/pdfUtils';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  contactItem: {
    marginRight: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  summary: {
    marginBottom: 15,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  company: {
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 11,
    color: '#666',
  },
  description: {
    marginTop: 5,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontWeight: 'bold',
  },
  school: {
    fontWeight: 'bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#e0e0e0',
    padding: '3 8',
    borderRadius: 4,
    margin: 3,
    fontSize: 10,
  },
  link: {
    color: '#0000EE',
    textDecoration: 'none',
  },
});

const ModernTemplate = ({ data, customization }) => {
  // Apply customization
  const dynamicStyles = {
    sectionTitle: {
      ...styles.sectionTitle,
      backgroundColor: customization?.primaryColor || '#f0f0f0',
      color: customization?.primaryColor ? '#ffffff' : '#000000',
    },
    skill: {
      ...styles.skill,
      backgroundColor: customization?.secondaryColor || '#e0e0e0',
      color: customization?.secondaryColor ? '#ffffff' : '#000000',
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
          <View style={styles.contactInfo}>
            {data.email && (
              <Text style={styles.contactItem}>{data.email}</Text>
            )}
            {data.phone && (
              <Text style={styles.contactItem}>{data.phone}</Text>
            )}
            {data.location && (
              <Text style={styles.contactItem}>{data.location}</Text>
            )}
            {data.website && (
              <Link src={data.website} style={styles.link}>
                <Text style={styles.contactItem}>{data.website}</Text>
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>EXPERIENCE</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  {exp.company && <Text>, <Text style={styles.company}>{exp.company}</Text></Text>}
                </Text>
                {(exp.startDate || exp.endDate) && (
                  <Text style={styles.dates}>
                    {exp.startDate && formatDate(exp.startDate)}
                    {exp.startDate && exp.endDate && ' - '}
                    {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </Text>
                )}
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>EDUCATION</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  {edu.school && <Text>, <Text style={styles.school}>{edu.school}</Text></Text>}
                </Text>
                {edu.graduationDate && (
                  <Text style={styles.dates}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                )}
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={dynamicStyles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ModernTemplate;