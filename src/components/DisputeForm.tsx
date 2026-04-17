import { Sparkles, Building2, Shield, Clock, Users, ShieldAlert, MapPin, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { DisputeData, ReasonCode } from "../types/dispute";
import { GHLData } from "../lib/ghl";
import { FileUploadZone } from "./FileUploadZone";
import { GHLLookup } from "./GHLLookup";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const EVIDENCE_CHECKLIST: Record<ReasonCode, { label: string; key: keyof DisputeData | "ghl" | "images" }[]> = {
  fraudulent: [
    { label: "CVV Match confirmed", key: "cvvMatch" },
    { label: "AVS Match confirmed", key: "avsMatch" },
    { label: "Customer IP address logged", key: "customerIpAddress" },
    { label: "Device fingerprint recorded", key: "deviceFingerprint" },
    { label: "GHL CRM record pulled", key: "ghl" },
    { label: "Login/usage count documented", key: "loginCount" },
    { label: "Screenshots/proof uploaded", key: "images" },
  ],
  unrecognized: [
    { label: "CVV Match confirmed", key: "cvvMatch" },
    { label: "Customer IP address logged", key: "customerIpAddress" },
    { label: "GHL CRM record pulled", key: "ghl" },
    { label: "Login/usage count documented", key: "loginCount" },
    { label: "Screenshots/proof uploaded", key: "images" },
  ],
  not_as_described: [
    { label: "Refund policy stated", key: "refundPolicy" },
    { label: "ToS agreement timestamp", key: "agreementTimestamp" },
    { label: "GHL CRM record with notes", key: "ghl" },
    { label: "Screenshots/proof uploaded", key: "images" },
    { label: "Login/usage documented", key: "loginCount" },
  ],
  canceled: [
    { label: "Cancellation policy stated", key: "refundPolicy" },
    { label: "ToS agreement timestamp", key: "agreementTimestamp" },
    { label: "GHL CRM record pulled", key: "ghl" },
    { label: "Screenshots/proof uploaded", key: "images" },
  ],
  duplicate: [
    { label: "Transaction date confirmed", key: "transactionDate" },
    { label: "GHL CRM record pulled", key: "ghl" },
    { label: "Screenshots/proof uploaded", key: "images" },
  ],
};
function checkItem(key: keyof DisputeData | "ghl" | "images", data: DisputeData): "ok" | "warn" | "missing" {
  if (key === "ghl") return data.ghlData ? "ok" : "missing";
  if (key === "images") return data.proofImages.length > 0 ? "ok" : "warn";
  if (key === "cvvMatch" || key === "avsMatch") return (data[key] as string) !== "Not Provided" ? "ok" : "warn";
  const val = data[key as keyof DisputeData];
  if (val === null || val === undefined || val === "") return "missing";
  return "ok";
}

interface DisputeFormProps {
  data: DisputeData;
  onDataChange: (data: DisputeData) => void;
  onGenerateAI: () => void;
  isGenerating: boolean;
}

export const DisputeForm = ({ data, onDataChange, onGenerateAI, isGenerating }: DisputeFormProps) => {
  const checklist = EVIDENCE_CHECKLIST[data.reasonCode] ?? [];
  const score = checklist.filter((item) => checkItem(item.key, data) === "ok").length;
  const total = checklist.length;
  const scoreColor = score === total ? "text-emerald-600" : score >= total * 0.6 ? "text-amber-600" : "text-red-600";

  const handleGHLData = (ghlData: GHLData) => {
    onDataChange({ ...data, ghlData, merchantName: data.merchantName || "Media Traffics | KenjiAI" });
  };

  return (
    <div className="space-y-4 w-full">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full mb-3 shadow-lg">
          <Shield className="w-4 h-4" />
          <span className="font-bold text-xs">DISPUTE COMMAND CENTER</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Dispute Evidence Builder</h2>
        <p className="text-slate-600 text-xs">Media Traffics | KenjiAI</p>
      </div>

      <GHLLookup onDataLoaded={handleGHLData} />

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-900">Evidence Strength</h3>
          <span className={`text-sm font-bold ${scoreColor}`}>{score}/{total}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
          <div className={`h-2 rounded-full transition-all ${score === total ? "bg-emerald-500" : score >= total * 0.6 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${total > 0 ? (score / total) * 100 : 0}%` }} />
        </div>
        <div className="space-y-1">
          {checklist.map((item) => {
            const status = checkItem(item.key, data);
            return (
              <div key={String(item.key)} className="flex items-center gap-2 text-xs">
                {status === "ok" ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> : status === "warn" ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
                <span className={status === "ok" ? "text-slate-600" : status === "warn" ? "text-amber-700" : "text-red-600"}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-200">
        <div className="border-l-4 border-cyan-500 pl-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Building2 className="w-4 h-4 text-cyan-600" />Transaction Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">MERCHANT NAME</Label><Input value={data.merchantName} onChange={(e) => onDataChange({ ...data, merchantName: e.target.value })} placeholder="Media Traffics | KenjiAI" className="bg-white border-slate-300 h-9 text-sm" /></div>
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">DISPUTE CASE ID</Label><Input value={data.caseId} onChange={(e) => onDataChange({ ...data, caseId: e.target.value })} placeholder="e.g., CASE-2024-001" className="bg-white border-slate-300 h-9 text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">TRANSACTION DATE</Label><Input type="date" value={data.transactionDate} onChange={(e) => onDataChange({ ...data, transactionDate: e.target.value })} className="bg-white border-slate-300 h-9 text-sm" /></div>
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">TRANSACTION AMOUNT</Label><Input value={data.transactionAmount} onChange={(e) => onDataChange({ ...data, transactionAmount: e.target.value })} placeholder="$2,500.00" className="bg-white border-slate-300 h-9 text-sm" /></div>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-200">
        <div className="border-l-4 border-emerald-500 pl-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-emerald-600" />Fraud Indicators</h3>
          <p className="text-[10px] text-slate-500">Strongest for fraudulent/unrecognized disputes</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">CVV MATCH</Label><Select value={data.cvvMatch} onValueChange={(v: any) => onDataChange({ ...data, cvvMatch: v })}><SelectTrigger className="bg-white border-slate-300 h-9 text-sm"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Y">Y - Match</SelectItem><SelectItem value="N">N - No Match</SelectItem><SelectItem value="Not Provided">Not Provided</SelectItem></SelectContent></Select></div>
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">AVS MATCH</Label><Select value={data.avsMatch} onValueChange={(v: any) => onDataChange({ ...data, avsMatch: v })}><SelectTrigger className="bg-white border-slate-300 h-9 text-sm"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Y">Y - Full</SelectItem><SelectItem value="Partial">Partial</SelectItem><SelectItem value="N">N - None</SelectItem><SelectItem value="Not Provided">Not Requested</SelectItem></SelectContent></Select></div>
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">BILLING ZIP</Label><Input value={data.billingZip} onChange={(e) => onDataChange({ ...data, billingZip: e.target.value })} placeholder="90210" className="bg-white border-slate-300 h-9 text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block flex items-center gap-1"><MapPin className="w-3 h-3" />CUSTOMER IP</Label><Input value={data.customerIpAddress} onChange={(e) => onDataChange({ ...data, customerIpAddress: e.target.value })} placeholder="192.168.1.1" className="bg-white border-slate-300 h-9 text-sm" /></div>
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block">DEVICE FINGERPRINT</Label><Input value={data.deviceFingerprint} onChange={(e) => onDataChange({ ...data, deviceFingerprint: e.target.value })} placeholder="Device hash" className="bg-white border-slate-300 h-9 text-sm" /></div>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-200">
        <div className="border-l-4 border-amber-500 pl-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Users className="w-4 h-4 text-amber-600" />Digital Service Delivery</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block flex items-center gap-1"><Users className="w-3 h-3" />LOGIN / USAGE COUNT</Label><Input value={data.loginCount} onChange={(e) => onDataChange({ ...data, loginCount: e.target.value })} placeholder="e.g., 14 logins over 3 weeks" className="bg-white border-slate-300 h-9 text-sm" /></div>
          <div><Label className="text-[10px] font-semibold text-slate-700 mb-1.5 block flex items-center gap-1"><Clock className="w-3 h-3" />TOS TIMESTAMP</Label><Input value={data.agreementTimestamp} onChange={(e) => onDataChange({ ...data, agreementTimestamp: e.target.value })} placeholder="2024-01-15 14:30 UTC" className="bg-white border-slate-300 h-9 text-sm" /></div>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-200">
        <div className="border-l-4 border-violet-500 pl-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-600" />Evidence Synthesis</h3>
        </div>
        <div>
          <Label className="text-[10px] font-bold text-violet-700 mb-1.5 block">DISPUTE REASON CODE</Label>
          <Select value={data.reasonCode} onValueChange={(v: ReasonCode) => onDataChange({ ...data, reasonCode: v })}>
            <SelectTrigger className="bg-white border-2 border-violet-200 h-10 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fraudulent">10.4 / 4837 - Fraudulent / Unrecognized</SelectItem>
              <SelectItem value="not_as_described">13.1 / 4853 - Not as Described</SelectItem>
              <SelectItem value="canceled">13.7 / 4841 - Canceled Recurring</SelectItem>
              <SelectItem value="duplicate">12.6 / 4834 - Duplicate Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-[10px] font-semibold text-slate-700 block">TRANSACTION DESCRIPTION</Label>
            <button type="button" onClick={() => onDataChange({ ...data, description: "The cardholder engaged our company for digital software services and explicitly authorized this transaction. The service was delivered in full, confirmed by CRM records and usage logs." })} className="text-[10px] text-violet-600 font-bold bg-violet-50 px-2 py-0.5 rounded border border-violet-200 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Template</button>
          </div>
          <Textarea value={data.description} onChange={(e) => onDataChange({ ...data, description: e.target.value })} placeholder="Describe the service delivered..." className="min-h-[90px] bg-white border-slate-300 text-sm" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-[10px] font-semibold text-slate-700 block">REFUND / CANCELLATION POLICY</Label>
            <button type="button" onClick={() => onDataChange({ ...data, refundPolicy: "During checkout, the cardholder was required to check a box explicitly agreeing to our Terms of Service. Our policy states: All sales are final. No refunds will be issued once access has been granted to digital software." })} className="text-[10px] text-violet-600 font-bold bg-violet-50 px-2 py-0.5 rounded border border-violet-200 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Template</button>
          </div>
          <Textarea value={data.refundPolicy} onChange={(e) => onDataChange({ ...data, refundPolicy: e.target.value })} placeholder="Your no-refund policy the client agreed to..." className="min-h-[80px] bg-white border-slate-300 text-sm" />
        </div>
        <div>
          <Label className="text-[10px] font-semibold text-slate-700 mb-2 block">PROOF IMAGES / SCREENSHOTS</Label>
          <FileUploadZone files={data.proofImages} onFilesChange={(files) => onDataChange({ ...data, proofImages: files })} />
        </div>
        <Button onClick={onGenerateAI} disabled={isGenerating || !data.description || !data.reasonCode} className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 text-white font-bold py-5 text-sm shadow-xl">
          <Sparkles className="w-4 h-4 mr-2" />
          {isGenerating ? "Synthesizing Evidence..." : "Generate Dispute Response"}
        </Button>
      </div>
    </div>
  );
};
