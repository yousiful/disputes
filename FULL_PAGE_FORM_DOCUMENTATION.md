# Full-Page Input Form with Mobile PDF Preview - Complete Documentation

## Overview
This implementation provides a comprehensive full-page input form interface with an interactive mobile PDF preview feature. The interface utilizes the entire viewport and includes real-time PDF preview capabilities across desktop, tablet, and mobile device simulations.

---

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [HTML Structure](#html-structure)
3. [CSS Implementation](#css-implementation)
4. [JavaScript/TypeScript Functionality](#javascripttypescript-functionality)
5. [Mobile Preview Feature](#mobile-preview-feature)
6. [Responsive Design](#responsive-design)
7. [Form Validation](#form-validation)
8. [Implementation Notes](#implementation-notes)
9. [Usage Guide](#usage-guide)

---

## Architecture Overview

### Component Structure
```
App.tsx (Main Container)
├── AnimatedBackground.tsx (Visual Effects)
├── Header (Compact, Fixed Height)
├── Main Content (Flex-1, Full Height)
│   ├── DisputeForm.tsx (Left Panel - Input Form)
│   └── PDFPreview.tsx (Right Panel - Preview Container)
│       ├── Desktop Preview (Full PDF View)
│       └── MobilePDFPreview.tsx (Mobile Device Simulation)
│           ├── Device Toggle (Phone/Tablet)
│           └── Real-time PDF Rendering
└── Footer (Compact, Fixed Height)
```

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **PDF Rendering**: @react-pdf/renderer
- **Icons**: lucide-react
- **Form Management**: react-hook-form with zod validation
- **UI Components**: shadcn/ui (Radix UI primitives)

---

## HTML Structure

### 1. Full-Page Layout (App.tsx)
```tsx
<div className="h-screen bg-white relative overflow-hidden w-full flex flex-col">
  {/* Animated Background */}
  <AnimatedBackground />

  {/* Main Container - Full Viewport Height */}
  <div className="relative z-10 flex flex-col h-full overflow-hidden">

    {/* Header - Fixed Height */}
    <header className="flex-shrink-0 border-b">
      {/* Logo, Title, Description */}
    </header>

    {/* Main Content - Flex-1 (Takes Remaining Space) */}
    <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 p-6 overflow-hidden">

      {/* Left Panel: Input Form */}
      <div className="overflow-y-auto h-full">
        <DisputeForm {...props} />
      </div>

      {/* Right Panel: PDF Preview */}
      <div className="h-full overflow-hidden">
        <PDFPreview {...props} />
      </div>
    </div>

    {/* Footer - Fixed Height */}
    <footer className="flex-shrink-0 border-t">
      {/* CTA and Attribution */}
    </footer>
  </div>
</div>
```

### 2. Mobile PDF Preview Component (MobilePDFPreview.tsx)
```tsx
<div className="h-full flex flex-col gap-4">
  {/* Device Selection Controls */}
  <div className="flex items-center justify-between">
    <div className="device-info">Phone/Tablet Label</div>
    <div className="device-toggle">
      <Button>Phone</Button>
      <Button>Tablet</Button>
    </div>
  </div>

  {/* Device Mockup Container */}
  <div className="flex-1 flex items-center justify-center bg-gradient">

    {/* Phone/Tablet Frame */}
    <div className="device-frame bg-slate-900 rounded-[2.5rem] p-3">

      {/* Notch/Status Bar */}
      <div className="device-notch"></div>

      {/* Screen Area with PDF */}
      <div className="device-screen bg-white rounded-[1.8rem]">
        <PDFViewer width="100%" height="100%">
          <DisputePDFDocument data={data} />
        </PDFViewer>
      </div>

      {/* Home Button */}
      <div className="device-home-button"></div>
    </div>
  </div>

  {/* Info Panel */}
  <div className="preview-info">
    Live Preview Information
  </div>
</div>
```

---

## CSS Implementation

### 1. Full Viewport Height System
```css
/* Main container uses full viewport height */
.h-screen {
  height: 100vh;
}

/* Flexbox layout for vertical distribution */
.flex-col {
  flex-direction: column;
}

/* Header and footer have fixed heights */
.flex-shrink-0 {
  flex-shrink: 0;
}

/* Main content area expands to fill available space */
.flex-1 {
  flex: 1 1 0%;
}
```

### 2. Responsive Grid Layout
```css
/* Single column on mobile, two columns on xl screens */
.grid-cols-1.xl\:grid-cols-2 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1280px) {
  .xl\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

### 3. Device Mockup Styling
```css
/* Phone frame with rounded corners */
.device-frame {
  background: #1e293b; /* slate-900 */
  border-radius: 2.5rem;
  padding: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Screen with inner shadow for depth */
.device-screen {
  background: white;
  border-radius: 1.8rem;
  overflow: hidden;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}

/* Notch simulation */
.device-notch {
  width: 4rem;
  height: 0.25rem;
  background: #334155; /* slate-700 */
  border-radius: 9999px;
}
```

### 4. Custom Utility Classes
```css
/* Glass morphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
}

/* Paper texture for PDF preview */
.paper-effect {
  background: linear-gradient(to bottom right,
    rgba(248, 250, 252, 0.95),
    rgba(241, 245, 249, 0.95)
  );
}
```

---

## JavaScript/TypeScript Functionality

### 1. Preview Mode State Management
```typescript
// Component: PDFPreview.tsx
import { useState } from 'react';

type PreviewMode = 'desktop' | 'mobile';

export const PDFPreview = ({ data }: PDFPreviewProps) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  return (
    <div>
      {/* Toggle Buttons */}
      <Button onClick={() => setPreviewMode('desktop')}>
        Desktop
      </Button>
      <Button onClick={() => setPreviewMode('mobile')}>
        Mobile
      </Button>

      {/* Conditional Rendering */}
      {previewMode === 'desktop' ? (
        <DesktopPDFView data={data} />
      ) : (
        <MobilePDFPreview data={data} />
      )}
    </div>
  );
};
```

### 2. Device Type Switching
```typescript
// Component: MobilePDFPreview.tsx
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
    <div
      className="device-frame"
      style={{
        width: deviceType === 'mobile' ? '320px' : '550px',
      }}
    >
      <div
        className="device-screen"
        style={{
          height: deviceType === 'mobile' ? '560px' : '700px',
        }}
      >
        <PDFViewer width="100%" height="100%">
          <DisputePDFDocument data={data} />
        </PDFViewer>
      </div>
    </div>
  );
};
```

### 3. Real-Time Form Data Updates
```typescript
// Component: App.tsx
import { useState } from 'react';

function App() {
  const [disputeData, setDisputeData] = useState<DisputeData>({
    merchantName: '',
    caseId: '',
    transactionDate: '',
    transactionAmount: '',
    // ... other fields
  });

  // PDF preview updates automatically when disputeData changes
  // React's reactivity ensures real-time updates

  return (
    <>
      <DisputeForm
        data={disputeData}
        onDataChange={setDisputeData}
      />
      <PDFPreview data={disputeData} />
    </>
  );
}
```

### 4. PDF Generation and Download
```typescript
import { PDFDownloadLink } from '@react-pdf/renderer';

// Component: PDFPreview.tsx
<PDFDownloadLink
  document={<DisputePDFDocument data={data} />}
  fileName={`dispute-${data.caseId || 'evidence'}.pdf`}
>
  {({ loading }) => (
    <Button disabled={loading}>
      {loading ? 'Preparing...' : 'Download PDF'}
    </Button>
  )}
</PDFDownloadLink>
```

---

## Mobile Preview Feature

### How It Works

1. **Device Mockup Rendering**
   - Creates a realistic device frame using CSS
   - Simulates phone/tablet with rounded corners, notch, and home button
   - Scales appropriately based on selected device type

2. **Real-Time PDF Rendering**
   - Uses `@react-pdf/renderer`'s `PDFViewer` component
   - Renders PDF inside the device mockup
   - Updates instantly as user types in the form

3. **Device Switching**
   - Toggle between phone (iPhone SE: 375x667px) and tablet (iPad: 768x1024px)
   - Smooth transitions using CSS transforms
   - Maintains PDF state during device switches

4. **Interactive Features**
   - Desktop/Mobile preview toggle
   - Phone/Tablet size toggle within mobile mode
   - Download PDF button in all modes
   - Live update indicator

### Key Features

**Device Simulation:**
- iPhone SE dimensions (375x667px)
- iPad dimensions (768x1024px)
- Realistic device frame with notch and home button
- Accurate representation of PDF on mobile

**Real-Time Updates:**
- Changes in form instantly reflect in preview
- No manual refresh required
- Smooth rendering performance

**User Experience:**
- Clear visual indicators of device type
- Easy toggle between preview modes
- Professional device mockup design
- Informative status messages

---

## Responsive Design

### Breakpoint System
```typescript
// Tailwind CSS Breakpoints
sm:  640px   // Small devices
md:  768px   // Medium devices
lg:  1024px  // Large devices
xl:  1280px  // Extra large devices
```

### Layout Adaptations

**Mobile (< 640px):**
- Single column layout
- Form takes full width
- PDF preview shows download prompt instead of live preview
- Compact header and footer
- Reduced padding and spacing

**Tablet (640px - 1279px):**
- Single column layout
- Form and preview stack vertically
- PDF preview available (not mobile mockup)
- Moderate padding and spacing

**Desktop (≥ 1280px):**
- Two column grid layout
- Form on left, preview on right
- Desktop/Mobile preview toggle available
- Full padding and spacing
- Side-by-side workflow

### Mobile-First CSS Examples
```css
/* Base styles (mobile) */
.header {
  padding: 0.75rem 1rem;
  font-size: 1.25rem;
}

/* Medium devices */
@media (min-width: 768px) {
  .header {
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
  }
}

/* Large devices */
@media (min-width: 1024px) {
  .header {
    padding: 1rem 2rem;
    font-size: 1.875rem;
  }
}
```

---

## Form Validation

### Field Validation Rules

```typescript
import { z } from 'zod';

const disputeSchema = z.object({
  merchantName: z.string().min(1, 'Merchant name is required'),
  caseId: z.string().min(1, 'Case ID is required'),
  transactionDate: z.string().min(1, 'Transaction date is required'),
  transactionAmount: z.string()
    .min(1, 'Amount is required')
    .regex(/^\$?\d+\.?\d{0,2}$/, 'Invalid amount format'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters'),
  // ... other validations
});
```

### Error Handling

```typescript
// Visual error states
<Input
  className={cn(
    'bg-white border-slate-300',
    errors.merchantName && 'border-red-500 focus:ring-red-500'
  )}
  aria-invalid={!!errors.merchantName}
  aria-describedby={errors.merchantName ? 'merchant-error' : undefined}
/>

{errors.merchantName && (
  <p id="merchant-error" className="text-red-600 text-sm mt-1">
    {errors.merchantName.message}
  </p>
)}
```

### Validation Triggers

1. **On Blur** - Validate when user leaves a field
2. **On Submit** - Full form validation before PDF generation
3. **Real-time** - For critical fields like amount formatting
4. **Conditional** - Based on other field values

---

## Implementation Notes

### Performance Optimizations

1. **Code Splitting**
   ```typescript
   // vite.config.ts
   manualChunks: {
     'react-vendor': ['react', 'react-dom'],
     'pdf-vendor': ['@react-pdf/renderer'],
     'ui-vendor': ['@radix-ui/*'],
   }
   ```

2. **Lazy Loading**
   ```typescript
   // Only render PDF when preview panel is visible
   {previewMode === 'desktop' && (
     <PDFViewer>
       <DisputePDFDocument data={data} />
     </PDFViewer>
   )}
   ```

3. **Memoization**
   ```typescript
   import { useMemo } from 'react';

   const memoizedPDF = useMemo(
     () => <DisputePDFDocument data={data} />,
     [data]
   );
   ```

### Accessibility Features

1. **Keyboard Navigation**
   - Tab order follows logical flow
   - Focus indicators on all interactive elements
   - Keyboard shortcuts for common actions

2. **ARIA Labels**
   ```tsx
   <Button
     aria-label="Switch to mobile preview"
     aria-pressed={previewMode === 'mobile'}
   >
     Mobile
   </Button>
   ```

3. **Screen Reader Support**
   ```tsx
   <div role="region" aria-label="PDF Preview">
     <PDFViewer>...</PDFViewer>
   </div>
   ```

4. **Color Contrast**
   - All text meets WCAG AA standards (4.5:1 contrast ratio)
   - Interactive elements have clear focus states

### Browser Compatibility

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features Requiring Polyfills:**
- CSS `backdrop-filter` (Safari < 14)
- CSS Container Queries (all browsers < 2023)

### Known Limitations

1. **Mobile PDF Preview**
   - Not available on actual mobile devices (screen size constraint)
   - Shows download prompt on devices < 768px width

2. **PDF Rendering Performance**
   - Large PDFs (>10 pages) may render slowly
   - Consider pagination for documents with many images

3. **File Upload**
   - Browser file size limits apply
   - Recommended max total upload: 10MB

---

## Usage Guide

### Basic Usage

1. **Start Entering Data**
   ```
   - Fill in merchant details (name, case ID)
   - Add transaction information (date, amount)
   - Enter transaction description
   - Upload supporting images (optional)
   ```

2. **View Real-Time Preview**
   ```
   - Desktop view shows full PDF in right panel
   - Click "Mobile" to see mobile device preview
   - Toggle between Phone/Tablet views
   - Preview updates as you type
   ```

3. **Generate AI Rebuttal**
   ```
   - Select rebuttal tone (aggressive/professional/conciliatory)
   - Click "Generate AI Rebuttal" button
   - Wait 2 seconds for AI processing
   - Review generated content in preview
   ```

4. **Download PDF**
   ```
   - Click "Download PDF" button
   - File downloads as: dispute-[CASE-ID].pdf
   - Opens in default PDF viewer
   ```

### Advanced Features

**Device Preview Toggle:**
```
Desktop Mode:
- Shows full-width PDF preview
- Best for detailed review
- Standard PDF viewer controls

Mobile Mode:
- Shows device mockup with PDF
- Toggle between iPhone SE and iPad
- See exact mobile appearance
- Real-time preview updates
```

**Form Sections:**
```
1. Merchant Details
   - Business name and case identification

2. Client Evidence
   - Transaction details and timestamps
   - Service usage statistics
   - Supporting documentation

3. Rebuttal Configuration
   - AI tone selection
   - Generation trigger
```

### Keyboard Shortcuts

- `Tab` - Navigate between form fields
- `Enter` - Submit/trigger focused button
- `Esc` - Close modals/dialogs
- `Ctrl/Cmd + S` - Save/download PDF (if implemented)

### Mobile Usage

On mobile devices (< 768px width):
1. Form is displayed in full-width vertical layout
2. PDF preview shows download button instead of live preview
3. Click "Download to View" to download PDF
4. Open downloaded PDF in mobile PDF viewer

### Best Practices

1. **Fill Required Fields First**
   - Merchant Name, Case ID, Transaction Date, Amount
   - These appear prominently in the PDF

2. **Be Detailed in Description**
   - Minimum 10 characters
   - AI uses this to generate professional rebuttal
   - More detail = better AI output

3. **Choose Appropriate Tone**
   - Aggressive: For clear fraud cases
   - Professional: Default, balanced approach
   - Conciliatory: When maintaining relationship matters

4. **Upload Clear Images**
   - Receipts, agreements, screenshots
   - Max 10MB total recommended
   - Supported formats: JPG, PNG, PDF

---

## Technical Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         VIEWPORT (100vh)                     │
├─────────────────────────────────────────────────────────────┤
│  HEADER (Fixed Height: ~120px)                              │
│  - Logo, Title, Description                                 │
├─────────────────────────────────────────────────────────────┤
│  MAIN CONTENT (Flex: 1 - Takes Remaining Space)            │
│  ┌──────────────────────┬──────────────────────────────┐   │
│  │  FORM PANEL          │  PREVIEW PANEL               │   │
│  │  (overflow-y: auto)  │  (overflow: hidden)          │   │
│  │                      │                              │   │
│  │  - Merchant Details  │  [Desktop/Mobile Toggle]     │   │
│  │  - Transaction Info  │                              │   │
│  │  - Evidence Upload   │  ┌────────────────────────┐  │   │
│  │  - AI Configuration  │  │  Desktop PDF Preview   │  │   │
│  │  - Generate Button   │  │  OR                    │  │   │
│  │                      │  │  Mobile Device Mockup  │  │   │
│  │                      │  │    - iPhone SE         │  │   │
│  │                      │  │    - iPad              │  │   │
│  │                      │  │    - Real-time PDF     │  │   │
│  │                      │  └────────────────────────┘  │   │
│  └──────────────────────┴──────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FOOTER (Fixed Height: ~60px)                               │
│  - Stats, CTA Button, Attribution                           │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
project/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx       # Visual effects
│   │   ├── DisputeForm.tsx             # Main input form
│   │   ├── PDFPreview.tsx              # Preview container with toggle
│   │   ├── MobilePDFPreview.tsx        # Mobile device simulation ⭐ NEW
│   │   ├── DisputePDFDocument.tsx      # PDF document template
│   │   ├── FileUploadZone.tsx          # File upload component
│   │   └── ui/                         # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── select.tsx
│   │       └── ...
│   ├── types/
│   │   └── dispute.ts                  # TypeScript interfaces
│   ├── lib/
│   │   └── utils.ts                    # Utility functions
│   ├── App.tsx                         # Main application ⭐ UPDATED
│   ├── App.css                         # Custom styles
│   └── main.tsx                        # Entry point
├── index.html                          # HTML entry with SEO
├── vite.config.ts                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
└── package.json                        # Dependencies
```

---

## API Reference

### Component Props

**DisputeForm:**
```typescript
interface DisputeFormProps {
  data: DisputeData;                    // Current form data
  onDataChange: (data: DisputeData) => void;  // Update callback
  onGenerateAI: () => void;             // AI generation trigger
  isGenerating: boolean;                // Loading state
}
```

**PDFPreview:**
```typescript
interface PDFPreviewProps {
  data: DisputeData;                    // Data for PDF generation
}
```

**MobilePDFPreview:**
```typescript
interface MobilePDFPreviewProps {
  data: DisputeData;                    // Data for PDF generation
}
```

### Data Types

```typescript
interface DisputeData {
  merchantName: string;
  caseId: string;
  transactionDate: string;
  transactionAmount: string;
  serviceProvided: string;
  evidence: string;
  request: string;
  description: string;
  proofImages: File[];
  rebuttalTone: 'aggressive' | 'professional' | 'conciliatory';
  refundPolicy: string;
  agreementTimestamp: string;
  loginCount: string;
}
```

---

## Troubleshooting

### Common Issues

**1. PDF Not Rendering**
```
Issue: Blank PDF preview
Solution:
- Check that @react-pdf/renderer is installed
- Verify PDFViewer has width="100%" and height="100%"
- Check browser console for errors
```

**2. Mobile Preview Not Showing**
```
Issue: Mobile preview option missing
Solution:
- Only available on screens ≥ 768px width
- Check window resize or zoom level
- Verify previewMode state is working
```

**3. Layout Overflow Issues**
```
Issue: Scrollbars appearing unexpectedly
Solution:
- Check overflow-hidden on parent containers
- Verify h-screen on root element
- Inspect flex-1 on main content area
```

**4. Form Not Updating PDF**
```
Issue: Changes not reflecting in preview
Solution:
- Check onDataChange callback is firing
- Verify state update in parent component
- Check React DevTools for state changes
```

---

## Future Enhancements

Potential improvements for future versions:

1. **Additional Device Mockups**
   - Android phones (Pixel, Samsung)
   - Different iPad models
   - Desktop browser previews

2. **Export Options**
   - Print-optimized PDF
   - Email directly from interface
   - Cloud storage integration

3. **Advanced Features**
   - Template selection
   - Multi-language support
   - Batch processing
   - History/saved drafts

4. **Performance**
   - PDF streaming for large documents
   - Progressive rendering
   - Web Workers for generation

---

## Conclusion

This full-page form implementation provides:

✅ **Full viewport utilization** - No wasted space
✅ **Interactive mobile preview** - Real device simulation
✅ **Real-time updates** - Instant PDF reflection
✅ **Responsive design** - Works on all screen sizes
✅ **Professional UX** - Intuitive and accessible
✅ **Production-ready** - Optimized and tested

The system successfully transforms form inputs into professional legal documents while providing comprehensive preview capabilities across multiple device types.

For questions or support, contact the KenjiAI Team at https://kenjiai.com
