import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DisputeData } from '../types/dispute';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '15%',
    transform: 'rotate(-45deg)',
    fontSize: 60,
    color: '#f0f0f0',
    opacity: 0.15,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 30,
    borderBottom: '3 solid #000000',
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    color: '#333333',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f8f8f8',
    border: '1 solid #cccccc',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 9,
    color: '#666666',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 11,
    color: '#000000',
    fontWeight: 'bold',
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.8,
    color: '#1a1a1a',
    textAlign: 'justify',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    padding: 8,
    marginTop: 15,
  },
  tableHeaderText: {
    fontSize: 9,
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #cccccc',
    padding: 8,
  },
  tableCell: {
    fontSize: 9,
    color: '#333333',
    flex: 1,
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 10,
    border: '1 solid #cccccc',
  },
  image: {
    maxWidth: '100%',
    maxHeight: 250,
  },
  divider: {
    borderBottom: '1 solid #cccccc',
    marginVertical: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666',
    borderTop: '1 solid #cccccc',
    paddingTop: 10,
  },
  declaration: {
    fontSize: 10,
    color: '#000000',
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

interface DisputePDFDocumentProps {
  data: DisputeData;
}

export const DisputePDFDocument = ({ data }: DisputePDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>VERIFIED BY{'\n'}CHARGEGUARD AI</Text>

      <View style={styles.header}>
        <Text style={styles.mainTitle}>LEGAL RESPONSE TO DISPUTE</Text>
        <Text style={styles.subtitle}>Formal Sworn Declaration & Evidence Submission</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>Merchant Name</Text>
            <Text style={styles.value}>{data.merchantName || 'Not Provided'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Case ID</Text>
            <Text style={styles.value}>{data.caseId || 'Not Provided'}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>Transaction Date</Text>
            <Text style={styles.value}>{data.transactionDate || 'Not Provided'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Transaction Amount</Text>
            <Text style={styles.value}>{data.transactionAmount || 'Not Provided'}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionNumber}>I. MERCHANT STATEMENT</Text>
      <Text style={styles.text}>
        {data.serviceProvided || 'The merchant hereby declares under penalty of perjury that the following statement is true and accurate to the best of their knowledge. This transaction was conducted in good faith with full disclosure of terms and conditions.'}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.sectionNumber}>II. TERMS & CONDITIONS</Text>
      <Text style={styles.sectionTitle}>Refund Policy & Agreement</Text>
      <Text style={styles.text}>
        {data.refundPolicy || 'The client explicitly agreed to our non-refundable terms at the time of purchase. By completing the transaction, the client acknowledged and accepted all terms and conditions as presented during the checkout process.'}
      </Text>

      {data.agreementTimestamp && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Agreement Timestamp: </Text>
          {data.agreementTimestamp}
        </Text>
      )}

      <View style={styles.divider} />

      <Text style={styles.sectionNumber}>III. SUPPORTING EVIDENCE</Text>

      <Text style={styles.text}>
        {data.evidence || 'The evidence presented herein conclusively demonstrates that the service was delivered as promised and the client received the full benefit of their purchase.'}
      </Text>

      {data.loginCount && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Service Usage: </Text>
          Our records show {data.loginCount}, confirming active service delivery and client engagement.
        </Text>
      )}

      {data.proofImages && data.proofImages.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>EXHIBIT LOG</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>Exhibit</Text>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Document Name</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Type</Text>
          </View>
          {data.proofImages.map((img, index) => (
            <View key={index}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.5 }]}>{String.fromCharCode(65 + index)}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{img.name}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>Image/Document</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image src={img.preview} style={styles.image} />
              </View>
            </View>
          ))}
        </>
      )}

      <View style={styles.divider} />

      <Text style={styles.sectionNumber}>IV. LEGAL REQUEST</Text>
      <Text style={styles.text}>
        {data.request || 'Based on the comprehensive evidence presented in this declaration, we respectfully request that the issuing financial institution reverse this chargeback and rule in favor of the merchant. The documentation clearly establishes that the transaction was legitimate, authorized, and the service was delivered in full accordance with the agreed terms.'}
      </Text>

      <Text style={styles.declaration}>
        This document constitutes a formal legal response. All information provided is true and accurate.{'\n'}
        Verified by ChargeGuard AI - Professional Dispute Management System
      </Text>

      <View style={styles.footer}>
        <Text>Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        <Text>ChargeGuard AI © 2024 - All Rights Reserved</Text>
      </View>
    </Page>
  </Document>
);
