import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Download, FileText, Monitor, Smartphone } from 'lucide-react';
import { DisputePDFDocument } from './DisputePDFDocument';
import { MobilePDFPreview } from './MobilePDFPreview';
import { DisputeData } from '../types/dispute';
import { Button } from './ui/button';
import { useState } from 'react';

interface PDFPreviewProps {
  data: DisputeData;
}

type PreviewMode = 'desktop' | 'mobile';

export const PDFPreview = ({ data }: PDFPreviewProps) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  return (
    <div className="space-y-3 md:space-y-4 h-full flex flex-col w-full overflow-hidden">
      <div className="glass-effect rounded-lg p-3 md:p-4 border border-slate-200/50 shadow-sm w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-1.5 md:p-2 rounded-lg">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Document Preview</h3>
              <p className="text-xs text-slate-500 hidden sm:block">Live updates as you type</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
                className={`h-8 px-3 text-xs ${
                  previewMode === 'desktop'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white/50'
                }`}
              >
                <Monitor className="w-3 h-3 mr-1" />
                Desktop
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
                className={`h-8 px-3 text-xs ${
                  previewMode === 'mobile'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white/50'
                }`}
              >
                <Smartphone className="w-3 h-3 mr-1" />
                Mobile
              </Button>
            </div>

            <PDFDownloadLink
              document={<DisputePDFDocument data={data} />}
              fileName={`dispute-${data.caseId || 'evidence'}.pdf`}
            >
              {({ loading }) => (
                <Button
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg text-sm w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {loading ? 'Preparing...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 overflow-hidden w-full">
        {previewMode === 'desktop' ? (
          <div className="flex-1 paper-effect rounded-xl overflow-hidden border-2 border-slate-200 w-full">
            <PDFViewer width="100%" height="100%" className="border-0" style={{ maxWidth: '100%' }}>
              <DisputePDFDocument data={data} />
            </PDFViewer>
          </div>
        ) : (
          <div className="flex-1 w-full">
            <MobilePDFPreview data={data} />
          </div>
        )}
      </div>

      <div className="flex md:hidden flex-1 paper-effect rounded-xl border-2 border-slate-200 w-full p-8 items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-lg">Mobile View</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              PDF preview is optimized for tablet and desktop. Download the document to view on your mobile device.
            </p>
          </div>
          <PDFDownloadLink
            document={<DisputePDFDocument data={data} />}
            fileName={`dispute-${data.caseId || 'evidence'}.pdf`}
          >
            {({ loading }) => (
              <Button
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                {loading ? 'Preparing PDF...' : 'Download to View'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};
