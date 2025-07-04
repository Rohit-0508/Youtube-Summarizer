// components/SummaryPDF.jsx
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 10
  },
  bullet: {
    marginBottom: 5
  }
});

const SummaryPDF = ({ summary }) => {
  const points = (summary.summary || summary.summaryText || "")
    .split('\n\n')
    .filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{summary.title}</Text>
        <Text style={styles.section}>Channel: {summary.channel}</Text>
        <Text style={styles.section}>Views: {summary.views}</Text>
        <Text style={styles.section}>Date: {new Date(summary.createdAt).toLocaleDateString()}</Text>

        <Text style={styles.title}>Key Points:</Text>
        <View>
          {points.map((point, i) => (
            <Text key={i} style={styles.bullet}>• {point}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default SummaryPDF;
