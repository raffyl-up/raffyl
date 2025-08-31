import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { FiCopy, FiX } from 'react-icons/fi';
import { FaLightbulb, FaLink } from 'react-icons/fa';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  title?: string;
  className?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 256,
  title = 'QR Code',
  className = ''
}) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!value) {
      setError('No value provided for QR code generation');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const canvas = canvasRef.current;
      if (canvas) {
        // Generate high-quality QR code for display
        await QRCode.toCanvas(canvas, value, {
          width: size,
          margin: 3,
          color: {
            dark: '#1f2937', // Dark gray for better contrast
            light: '#ffffff'
          },
          errorCorrectionLevel: 'M' // Medium error correction
        });

        // Generate high-resolution data URL for download (larger size for clarity)
        const downloadSize = Math.max(size, 512); // Minimum 512px for downloads
        const dataURL = await QRCode.toDataURL(value, {
          width: downloadSize,
          margin: 3,
          color: {
            dark: '#000000',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H' // High error correction for downloads
        });
        setQrCodeDataURL(dataURL);
        setShowQR(true);
      }
    } catch (err: any) {
      console.error('Error generating QR code:', err);
      setError(err.message || 'Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = async (format: 'png' | 'svg' = 'png') => {
    if (!qrCodeDataURL && format === 'png') return;

    try {
      let blob: Blob;
      let fileName: string;
      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

      if (format === 'png') {
        // Convert data URL to blob for PNG
        const byteString = atob(qrCodeDataURL.split(',')[1]);
        const mimeString = qrCodeDataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        blob = new Blob([ab], { type: mimeString });
        fileName = `${sanitizedTitle}_qr_code.png`;
      } else {
        // Generate SVG format for vector graphics
        const svgString = await QRCode.toString(value, {
          type: 'svg',
          width: 512,
          margin: 3,
          color: {
            dark: '#000000',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H'
        });

        blob = new Blob([svgString], { type: 'image/svg+xml' });
        fileName = `${sanitizedTitle}_qr_code.svg`;
      }

      saveAs(blob, fileName);
    } catch (err: any) {
      console.error('Error downloading QR code:', err);
      setError(`Failed to download QR code as ${format.toUpperCase()}`);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  useEffect(() => {
    if (value && showQR) {
      generateQRCode();
    }
  }, [value, showQR, size]);

  return (
    <div className={`space-y-6 ${className}`}>
      {!showQR ? (
        <div className="text-center">
          <div className="w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <span className="text-gray-500 text-sm font-medium">QR Code Preview</span>
            </div>
          </div>
          <button
            onClick={() => setShowQR(true)}
            disabled={isGenerating || !value}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isGenerating ? '⏳ Generating...' : '🎯 Generate QR Code'}
          </button>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="inline-block p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded-lg"
              style={{ display: qrCodeDataURL ? 'block' : 'none' }}
            />
            {isGenerating && (
              <div className="w-48 h-48 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              </div>
            )}
          </div>

          {qrCodeDataURL && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => downloadQRCode('png')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => downloadQRCode('svg')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Download SVG
                </button>
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <FiCopy className="text-sm" />
                  Copy URL
                </button>
                <button
                  onClick={() => setShowQR(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Hide QR Code
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm font-medium mb-2 flex items-center gap-2">
                  <FaLightbulb className="text-yellow-500" />
                  QR Code Tips:
                </p>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• PNG format for web sharing and social media</li>
                  <li>• SVG format for print materials and scalable graphics</li>
                  <li>• QR code links directly to this event page</li>
                  <li>• Works with any QR code scanner app</li>
                </ul>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <span className="text-red-800 text-sm font-medium flex items-center gap-2">
                <FiX className="text-red-600" />
                {error}
              </span>
            </div>
          )}
        </div>
      )}

      {/* URL Display */}
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-center gap-2">
            <FaLink className="text-blue-500" />
            Share this event:
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={value}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
              title="Copy URL to clipboard"
            >
              <FiCopy className="text-sm" />
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click the URL to select all, or use the QR code for easy mobile sharing
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;