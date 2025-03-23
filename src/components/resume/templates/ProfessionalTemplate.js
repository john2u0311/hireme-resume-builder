import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/pdfUtils';

// Register fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    borderBottom: '1 solid #000',
    paddingBottom: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  contactItem: {
    marginHorizontal: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1 solid #000',
    paddingBottom: 3,
  },
  summary: {
    marginBottom: 15,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  company: {
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 11,
  },
  description: {
    marginTop: 5,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
    marginRight: 5,
    marginBottom: 5,
  },
});

const ProfessionalTemplate = ({ data, customization }) => {
  // Apply customization
  const dynamicStyles = {
    page: {
      ...styles.page,
      fontFamily: customization?.font || 'Open Sans',
      padding: customization?.margin || 30,
      lineHeight: customization?.spacing || 1.5,
    },
    sectionTitle: {
      ...styles.sectionTitle,
      color: customization?.primaryColor || '#000000',
      borderBottomColor: customization?.primaryColor || '#000000',
    },
    name: {
      ...styles.name,
      color: customization?.primaryColor || '#000000',
    }
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={dynamicStyles.name}>{data.firstName} {data.lastName}</Text>
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
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text>
                      <Text style={styles.jobTitle}>{exp.position}</Text>
                      {exp.company && <Text>, <Text style={styles.company}>{exp.company}</Text></Text>}
                    </Text>
                  </View>
                  {(exp.startDate || exp.endDate) && (
                    <Text style={styles.dates}>
                      {exp.startDate && formatDate(exp.startDate)}
                      {exp.startDate && exp.endDate && ' - '}
                      {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </Text>
                  )}
                </View>
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
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text>
                      <Text style={styles.degree}>{edu.degree}</Text>
                      {edu.school && <Text>, <Text style={styles.school}>{edu.school}</Text></Text>}
                    </Text>
                  </View>
                  {edu.graduationDate && (
                    <Text style={styles.dates}>
                      {formatDate(edu.graduationDate)}
                    </Text>
                  )}
                </View>
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
            <Text style={dynamicStyles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}{index < data.skills.length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </View>
          </View>
        )}
        
        {/* Additional Sections - Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{cert.name}</Text>
                {cert.issuer && (
                  <Text>{cert.issuer}</Text>
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
        
        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Projects</Text>
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
        
        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Languages</Text>
            <View style={styles.skillsContainer}>
              {data.languages.map((language, index) => (
                <Text key={index} style={styles.skill}>
                  {language.language}{language.proficiency ? ` (${language.proficiency})` : ''}
                  {index < data.languages.length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </View>
          </View>
        )}
        
        {/* References - Optional */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>References</Text>
            {data.references.map((reference, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{reference.name}</Text>
                {reference.company && (
                  <Text style={styles.company}>{reference.company}</Text>
                )}
                {reference.contact && (
                  <Text>{reference.contact}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ProfessionalTemplate;