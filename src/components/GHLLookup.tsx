import { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Loader2, User, FileText, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { fetchGHLData, GHLData } from '../lib/ghl';

interface GHLLookupProps {
  onDataLoaded: (data: GHLData) => void;
}

export const GHLLookup = ({ onDataLoaded }: GHLLookupProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GHLData | null>(null);
  const [error, setError] = useState('');

  const lookup = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await fetchGHLData(email.trim());
      if (!data) {
        setError('No contact found in GHL with that email.');
        return;
      }
      setResult(data);
      onDataLoaded(data);
    } catch (e) {
      setError('Failed to reach GHL. Make sure you are running with: npm run dev');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 space-y-3">
      <div className="border-l-4 border-blue-500 pl-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-600" />
          Pull Real Evidence from GHL
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter the client email to auto-load their account history, notes, and pipeline data into the PDF.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-[10px] font-semibold text-slate-700 mb-1 block">CLIENT EMAIL</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && lookup()}
            placeholder="client@example.com"
            className="bg-white border-slate-300 h-9 text-sm"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={lookup}
            disabled={loading || !email.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white border border-blue-200 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
            <CheckCircle className="w-3.5 h-3.5" />
            Contact found — CRM timeline loaded into PDF
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-50 rounded p-2 text-center">
              <User className="w-3.5 h-3.5 mx-auto text-blue-500 mb-1" />
              <div className="text-[10px] text-slate-500">Contact</div>
              <div className="text-xs font-bold text-slate-800 truncate">{result.contact.contactName || result.contact.email}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">
                Added {new Date(result.contact.dateAdded).toLocaleDateString()}
              </div>
            </div>
            <div className="bg-slate-50 rounded p-2 text-center">
              <FileText className="w-3.5 h-3.5 mx-auto text-violet-500 mb-1" />
              <div className="text-[10px] text-slate-500">CRM Notes</div>
              <div className="text-xs font-bold text-slate-800">{result.notes.length}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">on file</div>
            </div>
            <div className="bg-slate-50 rounded p-2 text-center">
              <TrendingUp className="w-3.5 h-3.5 mx-auto text-emerald-500 mb-1" />
              <div className="text-[10px] text-slate-500">Pipeline</div>
              <div className="text-xs font-bold text-slate-800">{result.opportunities.length}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">opportunities</div>
            </div>
          </div>
          {result.contact.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {result.contact.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
