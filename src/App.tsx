import { useState } from 'react';
import { DisputeForm } from './components/DisputeForm';
import { PDFPreview } from './components/PDFPreview';
import { AnimatedBackground } from './components/AnimatedBackground';
import { DisputeData } from './types/dispute';
import { Sparkles, Shield, CheckCircle } from 'lucide-react';
import './App.css';

function App() {
  const [disputeData, setDisputeData] = useState<DisputeData>({
    merchantName: '',
    caseId: '',
    transactionDate: '',
    transactionAmount: '',
    serviceProvided: '',
    evidence: '',
    request: '',
    description: '',
    proofImages: [],
    reasonCode: 'fraudulent',
    refundPolicy: '',
    agreementTimestamp: '',
    loginCount: '',
    cvvMatch: 'Not Provided',
    avsMatch: 'Not Provided',
    customerIpAddress: '',
    billingZip: '',
    deviceFingerprint: '',
    trackingNumber: '',
    shippingCarrier: '',
    deliveryDate: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIRebuttal = async () => {
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    let serviceProvided = '';
    let evidenceText = '';
    let requestText = '';

    const { reasonCode, description, transactionDate, transactionAmount, merchantName, cvvMatch, avsMatch, customerIpAddress, billingZip, deviceFingerprint, trackingNumber, shippingCarrier, deliveryDate, refundPolicy, agreementTimestamp, loginCount, proofImages } = disputeData;

    if (reasonCode === 'fraudulent' || reasonCode === 'unrecognized') {
        serviceProvided = `We respectfully submit that the chargeback claiming "Fraudulent/Unrecognized" (Reason Code 10.4 / 4837) is invalid. On ${transactionDate || '[Date]'}, a legitimate transaction for ${transactionAmount || '[Amount]'} was processed with ${merchantName || '[Merchant]'}. ${description}`;
        
        evidenceText = `This transaction is a verified match. The purchaser authenticated the transaction using exact credentials that invalidate the claim of a stolen card:\n\n`;
        evidenceText += `Security Match: CVV Match is "${cvvMatch}" and AVS Match is "${avsMatch}".\n`;
        if (customerIpAddress) evidenceText += `Geolocation: The transaction originated from IP Address ${customerIpAddress}.`;
        if (billingZip) evidenceText += ` (Matching Billing Zip: ${billingZip})\n`; else evidenceText += `\n`;
        if (deviceFingerprint) evidenceText += `Device Fingerprint: ${deviceFingerprint}.\n`;
        if (loginCount || trackingNumber) evidenceText += `\nFurthermore, the goods/services were actively consumed or delivered. `;
        if (trackingNumber) evidenceText += `Shipped via ${shippingCarrier} (Tracking: ${trackingNumber}) and delivered on ${deliveryDate}. `;
        if (loginCount) evidenceText += `Digital logs confirm the user logged in ${loginCount} times.`;

        requestText = `Based on the Compelling Evidence provided, the cardholder participated in this transaction and is in possession of the goods/services. This constitutes "Friendly Fraud". We demand immediate reversal of this chargeback.`;

    } else if (reasonCode === 'not_as_described') {
        serviceProvided = `We respectfully submit this compelling evidence to counter the claim "Merchandise/Services Not as Described" (Reason Code 13.1 / 4853). The transaction for ${transactionAmount || '[Amount]'} was processed on ${transactionDate || '[Date]'}. ${description}`;
        
        evidenceText = `The goods/services were delivered exactly as described at the time of purchase. `;
        if (refundPolicy) evidenceText += `The client explicitly agreed to our terms: "${refundPolicy}" on ${agreementTimestamp || 'the time of purchase'}.\n\n`;
        if (trackingNumber) evidenceText += `Physical items were trackably delivered via ${shippingCarrier} (Tracking: ${trackingNumber}) on ${deliveryDate}.\n`;
        if (loginCount) evidenceText += `Digital service usage logs confirm active engagement (${loginCount} sessions), demonstrating the client received the expected value.\n`;
        
        requestText = `The merchant fulfilled all contractual obligations. The cardholder's claims are unsubstantiated by fact. We request immediate resolution in favor of the merchant.`;

    } else {
        serviceProvided = `We submit this formal declaration regarding the disputed transaction for ${transactionAmount || '[Amount]'} processed on ${transactionDate || '[Date]'}. ${description}`;
        
        evidenceText = `The transaction was processed correctly and in accordance with our terms of service. `;
        if (refundPolicy) evidenceText += `Our cancellation/refund policy clearly states: "${refundPolicy}", which the client accepted on ${agreementTimestamp || 'the time of purchase'}.\n`;
        
        requestText = `We request that you rule in favor of the merchant based on the provided evidence of authorization and adherence to policy.`;
    }

    if (proofImages.length > 0) {
        evidenceText += `\n\nWe have attached ${proofImages.length} exhibit(s) providing conclusive proof of service delivery and authorization.`;
    }

    setDisputeData({
      ...disputeData,
      serviceProvided,
      evidence: evidenceText,
      request: requestText,
    });

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-white relative w-full flex flex-col">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="text-center py-2 md:py-4 px-3 md:px-4 flex-shrink-0 border-b border-slate-200/50 bg-white/80 backdrop-blur-sm">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 px-2.5 md:px-4 py-1 md:py-2 rounded-full mb-1.5 md:mb-2 shadow-lg">
            <div className="relative">
              <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
            </div>
            <span className="font-bold text-white text-[10px] md:text-xs lg:text-sm tracking-wide">ChargeGuard AI</span>
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white" />
          </div>
          <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 mb-0.5 md:mb-1 tracking-tight leading-tight px-2">
            Professional Dispute Evidence Builder
          </h1>
          <p className="text-[10px] md:text-xs lg:text-sm text-slate-600 max-w-2xl mx-auto font-medium px-2">
            Transform casual notes into bank-ready legal documentation with AI-powered precision
          </p>
        </header>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4 lg:gap-6 p-2 md:p-4 lg:p-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl lg:rounded-2xl p-2 md:p-4 lg:p-6 border-2 border-slate-200 shadow-xl overflow-y-auto max-h-[calc(100vh-200px)] xl:max-h-none">
            <DisputeForm
              data={disputeData}
              onDataChange={setDisputeData}
              onGenerateAI={generateAIRebuttal}
              isGenerating={isGenerating}
            />
          </div>

          <div className="bg-gradient-to-br from-slate-50/95 to-slate-100/95 backdrop-blur-sm rounded-lg md:rounded-xl lg:rounded-2xl p-2 md:p-4 lg:p-6 border-2 border-slate-200 shadow-xl overflow-hidden max-h-[calc(100vh-200px)] xl:max-h-none">
            <PDFPreview data={disputeData} />
          </div>
        </div>

        <footer className="flex-shrink-0 border-t border-slate-200/50 bg-white/80 backdrop-blur-sm">
          <div className="px-3 md:px-4 py-2 md:py-3">
            <div className="flex flex-col gap-2 md:gap-3 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-3">
                <div className="flex items-center gap-2 text-[10px] md:text-xs lg:text-sm text-slate-600">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
                  <span>94% Win Rate</span>
                  <span className="text-slate-300">•</span>
                  <span>Made with ❤️ by{' '}
                    <a
                      href="https://kenjiai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors underline decoration-cyan-600/30 hover:decoration-cyan-700"
                    >
                      KenjiAI Team
                    </a>
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 md:p-3">
                <p className="text-[10px] md:text-xs text-amber-800 text-center leading-relaxed">
                  <strong className="font-semibold">Educational Purpose Only:</strong> This tool is designed for educational and demonstration purposes. Always consult with legal professionals for actual dispute cases. Use of this tool does not constitute legal advice.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
