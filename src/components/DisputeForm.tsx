import { Sparkles, Building2, FileText, Shield, Clock, Users } from 'lucide-react';
import { DisputeData } from '../types/dispute';
import { FileUploadZone } from './FileUploadZone';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DisputeFormProps {
  data: DisputeData;
  onDataChange: (data: DisputeData) => void;
  onGenerateAI: () => void;
  isGenerating: boolean;
}

export const DisputeForm = ({ data, onDataChange, onGenerateAI, isGenerating }: DisputeFormProps) => {
  return (
    <div className="space-y-3 md:space-y-6 lg:space-y-8 w-full">
      <div className="text-center mb-3 md:mb-4 lg:mb-6">
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2.5 md:px-4 py-1 md:py-2 rounded-full mb-2 md:mb-3 lg:mb-4 shadow-lg">
          <Shield className="w-3 h-3 md:w-4 md:h-4" />
          <span className="font-bold text-[10px] md:text-xs lg:text-sm">COMMAND CENTER</span>
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-1 md:mb-2 px-2">Dispute Console</h2>
        <p className="text-slate-600 text-[11px] md:text-xs lg:text-sm px-2">
          Configure your dispute parameters below
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 lg:space-y-6 border border-slate-200">
        <div className="border-l-3 md:border-l-4 border-cyan-500 pl-2.5 md:pl-3 lg:pl-4">
          <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 mb-0.5 md:mb-1 flex items-center gap-1.5 md:gap-2">
            <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-cyan-600" />
            Merchant Details
          </h3>
          <p className="text-[10px] md:text-xs text-slate-600">Primary business information</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 lg:gap-4">
          <div>
            <Label htmlFor="merchantName" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              MERCHANT NAME
            </Label>
            <Input
              id="merchantName"
              value={data.merchantName}
              onChange={(e) => onDataChange({ ...data, merchantName: e.target.value })}
              placeholder="e.g., Acme Corporation"
              className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-9 md:h-10 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="caseId" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              CASE ID
            </Label>
            <Input
              id="caseId"
              value={data.caseId}
              onChange={(e) => onDataChange({ ...data, caseId: e.target.value })}
              placeholder="e.g., CASE-2024-001"
              className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-9 md:h-10 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 lg:gap-4">
          <div>
            <Label htmlFor="transactionDate" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              TRANSACTION DATE
            </Label>
            <Input
              id="transactionDate"
              type="date"
              value={data.transactionDate}
              onChange={(e) => onDataChange({ ...data, transactionDate: e.target.value })}
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="transactionAmount" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              TRANSACTION AMOUNT
            </Label>
            <Input
              id="transactionAmount"
              value={data.transactionAmount}
              onChange={(e) => onDataChange({ ...data, transactionAmount: e.target.value })}
              placeholder="e.g., $500.00"
              className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-9 md:h-10 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 lg:space-y-6 border border-slate-200">
        <div className="border-l-3 md:border-l-4 border-emerald-500 pl-2.5 md:pl-3 lg:pl-4">
          <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 mb-0.5 md:mb-1 flex items-center gap-1.5 md:gap-2">
            <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-emerald-600" />
            Client Evidence
          </h3>
          <p className="text-[10px] md:text-xs text-slate-600">Transaction details and supporting documents</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 lg:gap-4">
          <div>
            <Label htmlFor="agreementTimestamp" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block flex items-center gap-1.5">
              <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
              AGREEMENT TIMESTAMP
            </Label>
            <Input
              id="agreementTimestamp"
              value={data.agreementTimestamp}
              onChange={(e) => onDataChange({ ...data, agreementTimestamp: e.target.value })}
              placeholder="e.g., 2024-01-15 14:30 UTC"
              className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-9 md:h-10 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="loginCount" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block flex items-center gap-1.5">
              <Users className="w-2.5 h-2.5 md:w-3 md:h-3" />
              LOGIN/VIEW COUNT
            </Label>
            <Input
              id="loginCount"
              value={data.loginCount}
              onChange={(e) => onDataChange({ ...data, loginCount: e.target.value })}
              placeholder="e.g., 47 logins"
              className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-9 md:h-10 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
            TRANSACTION DESCRIPTION
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => onDataChange({ ...data, description: e.target.value })}
            placeholder="Describe the transaction in your own words. The AI will format it professionally..."
            className="min-h-[80px] md:min-h-[100px] bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="refundPolicy" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
            REFUND POLICY
          </Label>
          <Textarea
            id="refundPolicy"
            value={data.refundPolicy}
            onChange={(e) => onDataChange({ ...data, refundPolicy: e.target.value })}
            placeholder="Enter your terms & conditions or refund policy that the client agreed to..."
            className="min-h-[70px] md:min-h-[80px] bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>

        <div>
          <Label className="text-slate-700 text-[10px] md:text-xs font-semibold mb-2 md:mb-3 block">
            PROOF IMAGES
          </Label>
          <FileUploadZone
            files={data.proofImages}
            onFilesChange={(files) => onDataChange({ ...data, proofImages: files })}
          />
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 lg:space-y-6 border border-slate-200">
        <div className="border-l-3 md:border-l-4 border-violet-500 pl-2.5 md:pl-3 lg:pl-4">
          <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 mb-0.5 md:mb-1 flex items-center gap-1.5 md:gap-2">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-violet-600" />
            Rebuttal Configuration
          </h3>
          <p className="text-[10px] md:text-xs text-slate-600">AI tone and generation settings</p>
        </div>

        <div>
          <Label htmlFor="rebuttalTone" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
            REBUTTAL TONE
          </Label>
          <Select
            value={data.rebuttalTone}
            onValueChange={(value: 'aggressive' | 'professional' | 'conciliatory') =>
              onDataChange({ ...data, rebuttalTone: value })
            }
          >
            <SelectTrigger className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aggressive" className="text-sm">Aggressive - Maximum pressure on bank</SelectItem>
              <SelectItem value="professional" className="text-sm">Professional - Balanced and formal</SelectItem>
              <SelectItem value="conciliatory" className="text-sm">Conciliatory - Diplomatic approach</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onGenerateAI}
          disabled={isGenerating || !data.description}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 hover:from-cyan-600 hover:via-blue-600 hover:to-violet-600 text-white font-bold py-4 md:py-5 lg:py-6 text-sm md:text-base shadow-xl transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          {isGenerating ? 'Generating Legal Rebuttal...' : 'Generate AI Rebuttal'}
        </Button>
      </div>
    </div>
  );
};
