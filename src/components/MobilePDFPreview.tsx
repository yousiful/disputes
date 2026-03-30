import { PDFViewer } from '@react-pdf/renderer';
import { Smartphone, Tablet } from 'lucide-react';
import { DisputePDFDocument } from './DisputePDFDocument';
import { DisputeData } from '../types/dispute';
import { useState } from 'react';
import { Button } from './ui/button';

interface MobilePDFPreviewProps {
  data: DisputeData;
}

type DeviceType = 'mobile' | 'tablet';

export const MobilePDFPreview = ({ data }: MobilePDFPreviewProps) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');

  const deviceDimensions = {
    mobile: {
      width: '375px',
      height: '667px',
      label: 'iPhone SE',
    },
    tablet: {
      width: '768px',
      height: '1024px',
      label: 'iPad',
    },
  };

  const currentDevice = deviceDimensions[deviceType];

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-2 rounded-lg">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Mobile Preview</h4>
            <p className="text-xs text-slate-500">{currentDevice.label}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <Button
            variant={deviceType === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDeviceType('mobile')}
            className={`h-8 px-3 ${
              deviceType === 'mobile'
                ? 'bg-white shadow-sm'
                : 'hover:bg-white/50'
            }`}
          >
            <Smartphone className="w-3 h-3 mr-1" />
            <span className="text-xs">Phone</span>
          </Button>
          <Button
            variant={deviceType === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDeviceType('tablet')}
            className={`h-8 px-3 ${
              deviceType === 'tablet'
                ? 'bg-white shadow-sm'
                : 'hover:bg-white/50'
            }`}
          >
            <Tablet className="w-3 h-3 mr-1" />
            <span className="text-xs">Tablet</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 rounded-xl p-8 overflow-auto">
        <div
          className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl transform transition-all duration-300"
          style={{
            width: deviceType === 'mobile' ? '320px' : '550px',
            maxWidth: '100%',
          }}
        >
          <div className="bg-slate-800 rounded-t-[2rem] px-4 py-2 flex items-center justify-center gap-2">
            <div className="w-16 h-1 bg-slate-700 rounded-full"></div>
          </div>

          <div
            className="bg-white rounded-[1.8rem] overflow-hidden shadow-inner"
            style={{
              width: '100%',
              height: deviceType === 'mobile' ? '560px' : '700px',
            }}
          >
            <PDFViewer
              width="100%"
              height="100%"
              className="border-0"
              showToolbar={false}
            >
              <DisputePDFDocument data={data} />
            </PDFViewer>
          </div>

          <div className="bg-slate-800 rounded-b-[2rem] px-4 py-3 flex items-center justify-center">
            <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
        <p className="text-xs text-slate-600 text-center">
          <span className="font-semibold">Live Preview:</span> This shows how your PDF will appear on {deviceType === 'mobile' ? 'mobile devices' : 'tablets'}. Changes update in real-time.
        </p>
      </div>
    </div>
  );
};
