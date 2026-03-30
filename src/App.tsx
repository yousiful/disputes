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
    rebuttalTone: 'professional',
    refundPolicy: '',
    agreementTimestamp: '',
    loginCount: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIRebuttal = async () => {
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const toneStyles = {
      aggressive: {
        prefix: 'We must emphatically state that',
        emphasis: 'This dispute represents a clear case of',
        conclusion: 'We demand immediate reversal of this fraudulent chargeback.',
      },
      professional: {
        prefix: 'We respectfully submit that',
        emphasis: 'Our records demonstrate that',
        conclusion: 'We request that you rule in favor of the merchant based on the evidence provided.',
      },
      conciliatory: {
        prefix: 'We would like to clarify that',
        emphasis: 'We understand the concern, however our documentation shows that',
        conclusion: 'We kindly request your consideration in reviewing this matter favorably.',
      },
    };

    const tone = toneStyles[disputeData.rebuttalTone];

    const serviceProvided = `${tone.prefix} on ${disputeData.transactionDate || '[Transaction Date]'}, a transaction for ${
      disputeData.transactionAmount || '[Amount]'
    } was processed with ${disputeData.merchantName || '[Merchant Name]'}. ${disputeData.description}

The client explicitly agreed to our ${disputeData.refundPolicy ? 'clearly stated' : 'non-refundable'} terms${
      disputeData.agreementTimestamp ? ` at ${disputeData.agreementTimestamp}` : ' at the time of purchase'
    }. This agreement was presented during checkout and required explicit acceptance to proceed with the transaction.`;

    const evidence = `${tone.emphasis} the service was rendered in full accordance with the agreed-upon terms and conditions.

${
  disputeData.loginCount
    ? `Our records show ${disputeData.loginCount}, confirming active service delivery and demonstrating that the client actively engaged with and received the full benefit of the purchased service.`
    : 'Our system logs confirm that the client accessed and utilized the service as intended.'
}

${
  disputeData.proofImages.length > 0
    ? `We have attached ${disputeData.proofImages.length} supporting exhibit(s) that provide conclusive proof of service delivery, including receipts, signed agreements, access logs, and transaction confirmations.`
    : 'All communication logs, delivery confirmations, and usage records are available for immediate review upon request.'
}

This dispute is a case of "Friendly Fraud" as the client remains in full possession of the digital assets, knowledge, or services provided. The client has consumed the service and is now attempting to reverse payment, which constitutes an abuse of the chargeback system.`;

    const request = `Based on the comprehensive evidence presented in this formal declaration, ${tone.conclusion}

The documentation clearly establishes that:

1. The transaction was legitimate and properly authorized by the cardholder
2. The service was delivered completely and in accordance with stated terms
3. All contractual obligations were fulfilled by the merchant
4. The client explicitly agreed to non-refundable terms prior to purchase
5. The client has actively used and benefited from the service provided

${
  disputeData.rebuttalTone === 'aggressive'
    ? 'This chargeback represents an abuse of the payment system and should be reversed immediately to prevent unwarranted financial loss and maintain the integrity of merchant protections.'
    : 'We believe this dispute was filed in error or without full consideration of the transaction details. We request immediate resolution in favor of the merchant to prevent unwarranted financial loss.'
}`;

    setDisputeData({
      ...disputeData,
      serviceProvided,
      evidence,
      request,
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
