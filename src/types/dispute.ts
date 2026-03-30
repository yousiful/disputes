export type ReasonCode = 'fraudulent' | 'unrecognized' | 'not_as_described' | 'canceled' | 'duplicate';

export interface DisputeData {
  merchantName: string;
  caseId: string;
  transactionDate: string;
  transactionAmount: string;
  serviceProvided: string;
  evidence: string;
  request: string;
  description: string;
  proofImages: FileWithPreview[];
  reasonCode: ReasonCode;
  refundPolicy: string;
  agreementTimestamp: string;
  loginCount: string;
  cvvMatch: 'Y' | 'N' | 'Not Provided';
  avsMatch: 'Y' | 'N' | 'Partial' | 'Not Provided';
  customerIpAddress: string;
  billingZip: string;
  deviceFingerprint: string;
  trackingNumber: string;
  shippingCarrier: string;
  deliveryDate: string;
}

export interface FileWithPreview {
  file: File;
  preview: string;
  name: string;
}
