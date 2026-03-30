import { Sparkles, Building2, FileText, Shield, Clock, Users, ShieldAlert, Package, MapPin } from 'lucide-react';
import { DisputeData, ReasonCode } from '../types/dispute';
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
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-1 md:mb-2 px-2">Dispute Evidence Builder</h2>
        <p className="text-slate-600 text-[11px] md:text-xs lg:text-sm px-2">
          Compile Compelling Evidence for Card Networks
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 lg:space-y-6 border border-slate-200">
        <div className="border-l-3 md:border-l-4 border-cyan-500 pl-2.5 md:pl-3 lg:pl-4">
          <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 mb-0.5 md:mb-1 flex items-center gap-1.5 md:gap-2">
            <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-cyan-600" />
            Transaction Fundamentals
          </h3>
          <p className="text-[10px] md:text-xs text-slate-600">Core transaction details</p>
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
              DISPUTE CASE ID
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
            <ShieldAlert className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-emerald-600" />
            Fraud & Security Indicators
          </h3>
          <p className="text-[10px] md:text-xs text-slate-600">Cryptographic and Geographic Compelling Evidence</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3 lg:gap-4">
          <div>
            <Label htmlFor="cvvMatch" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              CVV MATCH RESULT
            </Label>
            <Select
              value={data.cvvMatch}
              onValueChange={(value: any) => onDataChange({ ...data, cvvMatch: value })}
            >
              <SelectTrigger className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm">
                <SelectValue placeholder="Select CVV Match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y">Y - Match</SelectItem>
                <SelectItem value="N">N - No Match</SelectItem>
                <SelectItem value="Not Provided">Not Provided / bypass</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="avsMatch" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              AVS MATCH RESULT
            </Label>
            <Select
              value={data.avsMatch}
              onValueChange={(value: any) => onDataChange({ ...data, avsMatch: value })}
            >
              <SelectTrigger className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm">
                <SelectValue placeholder="Select AVS Match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y">Y - Full Match</SelectItem>
                <SelectItem value="Partial">Partial Match</SelectItem>
                <SelectItem value="N">N - No Match</SelectItem>
                <SelectItem value="Not Provided">Not Requested</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="billingZip" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              BILLING ZIP CODE
            </Label>
            <Input
              id="billingZip"
              value={data.billingZip}
              onChange={(e) => onDataChange({ ...data, billingZip: e.target.value })}
              placeholder="e.g., 90210"
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 lg:gap-4">
          <div>
            <Label htmlFor="customerIpAddress" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block flex items-center gap-1.5">
              <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
              CUSTOMER IP ADDRESS
            </Label>
            <Input
              id="customerIpAddress"
              value={data.customerIpAddress}
              onChange={(e) => onDataChange({ ...data, customerIpAddress: e.target.value })}
              placeholder="e.g., 192.168.1.1 (Required for digital items)"
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="deviceFingerprint" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              DEVICE FINGERPRINT / ID
            </Label>
            <Input
              id="deviceFingerprint"
              value={data.deviceFingerprint}
              onChange={(e) => onDataChange({ ...data, deviceFingerprint: e.target.value })}
              placeholder="e.g., Device Hash or 'MacBook Pro iOS 17'"
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 lg:space-y-6 border border-slate-200">
        <div className="border-l-3 md:border-l-4 border-amber-500 pl-2.5 md:pl-3 lg:pl-4">
          <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 mb-0.5 md:mb-1 flex items-center gap-1.5 md:gap-2">
            <Package className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-amber-600" />
            Delivery & Fulfillment
          </h3>
          <p className="text-[10px] md:text-xs text-slate-600">Proof of service or item delivery</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3 lg:gap-4">
          <div>
            <Label htmlFor="trackingNumber" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              TRACKING NUMBER
            </Label>
            <Input
              id="trackingNumber"
              value={data.trackingNumber}
              onChange={(e) => onDataChange({ ...data, trackingNumber: e.target.value })}
              placeholder="e.g., 1Z99999999999"
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="shippingCarrier" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              SHIPPING CARRIER
            </Label>
            <Input
              id="shippingCarrier"
              value={data.shippingCarrier}
              onChange={(e) => onDataChange({ ...data, shippingCarrier: e.target.value })}
              placeholder="e.g., UPS/FedEx/USPS"
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="deliveryDate" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
              DELIVERY DATE
            </Label>
            <Input
              id="deliveryDate"
              type="date"
              value={data.deliveryDate}
              onChange={(e) => onDataChange({ ...data, deliveryDate: e.target.value })}
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 lg:gap-4">
          <div>
            <Label htmlFor="loginCount" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block flex items-center gap-1.5">
              <Users className="w-2.5 h-2.5 md:w-3 md:h-3" />
              LOGIN COUNT (Digital Goods)
            </Label>
            <Input
              id="loginCount"
              value={data.loginCount}
              onChange={(e) => onDataChange({ ...data, loginCount: e.target.value })}
              placeholder="e.g., 47 logins"
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="agreementTimestamp" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block flex items-center gap-1.5">
              <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
              TOS AGREEMENT TIMESTAMP
            </Label>
            <Input
              id="agreementTimestamp"
              value={data.agreementTimestamp}
              onChange={(e) => onDataChange({ ...data, agreementTimestamp: e.target.value })}
              placeholder="e.g., 2024-01-15 14:30 UTC"
              className="bg-white border-slate-300 text-slate-900 h-9 md:h-10 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 lg:space-y-6 border border-slate-200">
        <div className="border-l-3 md:border-l-4 border-violet-500 pl-2.5 md:pl-3 lg:pl-4">
          <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 mb-0.5 md:mb-1 flex items-center gap-1.5 md:gap-2">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-violet-600" />
            Evidence Synthesis
          </h3>
          <p className="text-[10px] md:text-xs text-slate-600">Select Dispute Reason & Format Output</p>
        </div>

        <div>
          <Label htmlFor="reasonCode" className="text-slate-700 text-[10px] md:text-xs font-bold mb-1.5 md:mb-2 block text-violet-700">
            DISPUTE REASON CODE
          </Label>
          <Select
            value={data.reasonCode}
            onValueChange={(value: ReasonCode) =>
              onDataChange({ ...data, reasonCode: value })
            }
          >
            <SelectTrigger className="bg-white border-slate-300 text-slate-900 h-10 md:h-12 text-sm border-2 border-violet-200">
              <SelectValue placeholder="Select Reason Code" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fraudulent" className="text-sm font-semibold">10.4 / 4837 - Fraudulent / Unrecognized</SelectItem>
              <SelectItem value="not_as_described" className="text-sm font-semibold">13.1 / 4853 - Merchandise/Services Not as Described</SelectItem>
              <SelectItem value="canceled" className="text-sm font-semibold">13.7 / 4841 - Canceled Recurring Transaction</SelectItem>
              <SelectItem value="duplicate" className="text-sm font-semibold">12.6 / 4834 - Duplicate Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="text-slate-700 text-[10px] md:text-xs font-semibold mb-1.5 md:mb-2 block">
            TRANSACTION DESCRIPTION
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => onDataChange({ ...data, description: e.target.value })}
            placeholder="Describe the transaction and add any specific details on how it was fulfilled..."
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

        <Button
          onClick={onGenerateAI}
          disabled={isGenerating || !data.description || !data.reasonCode}
          className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 md:py-5 lg:py-6 text-sm md:text-base shadow-xl transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          {isGenerating ? 'Synthesizing Compelling Evidence...' : 'Generate Evidence Rebuttal'}
        </Button>
      </div>
    </div>
  );
};
