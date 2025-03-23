import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/pdfUtils';

// Register fonts
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gnD-w.ttf', fontWeight: 'bold' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Montserrat',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
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
    fontSize: 9,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    borderBottom: '0.5 solid #dddddd',
    marginBottom: 8,
  },
  summary: {
    marginBottom: 15,
    fontSize: 10,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  company: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  dates: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 3,
  },
  description: {
    fontSize: 9,
    marginTop: 3,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  school: {
    fontSize: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    marginRight: 10,
    marginBottom: 5,
    fontSize: 9,
  },
  twoColumnLayout: {
    flexDirection: 'row',
  },
  leftColumn: {
    width: '30%',
    paddingRight: 15,
  },
  rightColumn: {
    width: '70%',
  },
});

const MinimalistTemplate = ({ data, customization }) => {
  // Apply customization
  const dynamicStyles = {
    page: {
      ...styles.page,
      fontFamily: customization?.font || 'Montserrat',
      padding: customization?.margin || 40,
      lineHeight: customization?.spacing || 1.5,
    },
    sectionTitle: {
      ...styles.sectionTitle,
      color: customization?.primaryColor || '#333333',
    },
    divider: {
      ...styles.divider,
      borderBottomColor: customization?.primaryColor || '#dddddd',
    },
    name: {
      ...styles.name,
      color: customization?.primaryColor || '#333333',
    }
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        <View style={styles.twoColumnLayout}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={dynamicStyles.name}>{data.firstName} {data.lastName}</Text>
              {data.title && (
                <Text style={{ marginBottom: 10, fontSize: 11 }}>{data.title}</Text>
              )}
            </View>
            
            {/* Contact Information */}
            <View style={styles.section}>
              <Text style={dynamicStyles.sectionTitle}>Contact</Text>
              <View style={dynamicStyles.divider} />
              <View>
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
                  <Text style={styles.contactItem}>{data.website}</Text>
                )}
              </View>
            </View>
            
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Skills</Text>
                <View style={dynamicStyles.divider} />
                <View>
                  {data.skills.map((skill, index) => (
                    <Text key={index} style={styles.skill}>• {skill}</Text>
                  ))}
                </View>
              </View>
            )}
            
            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Languages</Text>
                <View style={dynamicStyles.divider} />
                <View>
                  {data.languages.map((language, index) => (
                    <Text key={index} style={styles.skill}>
                      • {language.language}
                      {language.proficiency ? ` (${language.proficiency})` : ''}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
          
          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Summary */}
            {data.summary && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Profile</Text>
                <View style={dynamicStyles.divider} />
                <Text style={styles.summary}>{data.summary}</Text>
              </View>
            )}
            
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Experience</Text>
                <View style={dynamicStyles.divider} />
                {data.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    {exp.company && (
                      <Text style={styles.company}>{exp.company}</Text>
                    )}
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
                <Text style={dynamicStyles.sectionTitle}>Education</Text>
                <View style={dynamicStyles.divider} />
                {data.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {edu.school && (
                      <Text style={styles.school}>{edu.school}</Text>
                    )}
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
            
            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Projects</Text>
                <View style={dynamicStyles.divider} />
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>{project.title}</Text>
                    {project.description && (
                      <Text style={styles.description}>{project.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
            
            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Certifications</Text>
                <View style={dynamicStyles.divider} />
                {data.certifications.map((cert, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>{cert.name}</Text>
                    {cert.issuer && (
                      <Text style={styles.school}>{cert.issuer}</Text>
                    )}
                    {cert.date && (
                      <Text style={styles.dates}>
                        {formatDate(cert.date)}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalistTemplate;