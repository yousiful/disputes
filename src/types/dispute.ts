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
  rebuttalTone: 'aggressive' | 'professional' | 'conciliatory';
  refundPolicy: string;
  agreementTimestamp: string;
  loginCount: string;
}

export interface FileWithPreview {
  file: File;
  preview: string;
  name: string;
}
