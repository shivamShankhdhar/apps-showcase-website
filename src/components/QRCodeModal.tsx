'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { FiX, FiSmartphone, FiCopy, FiCheck } from 'react-icons/fi';
import { FaGooglePlay } from 'react-icons/fa6';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  icon?: string;
  packageId?: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  title,
  url,
  icon = '📱',
  packageId,
}: QRCodeModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((dataUrl) => setQrCodeDataUrl(dataUrl))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#12131c] border border-red-500/30 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
        >
          <FiX className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400 font-mono">{packageId || 'Scan to install'}</p>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-red-500/20">
          {qrCodeDataUrl ? (
            <img
              src={qrCodeDataUrl}
              alt={`QR Code for ${title}`}
              className="h-52 w-52 object-contain"
            />
          ) : (
            <div className="h-52 w-52 flex items-center justify-center text-slate-400 text-xs">
              Generating QR Code...
            </div>
          )}
          <p className="text-[11px] text-slate-600 font-mono text-center mt-2 flex items-center gap-1">
            <FiSmartphone className="h-3 w-3 text-red-600" />
            <span>Point Android camera to open Play Store</span>
          </p>
        </div>

        {/* Copy Link Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center gap-1.5 transition-all"
          >
            {copied ? <FiCheck className="h-3.5 w-3.5 text-emerald-400" /> : <FiCopy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Download Link'}</span>
          </button>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25 flex items-center gap-1.5"
            >
              <FaGooglePlay className="h-3.5 w-3.5 text-emerald-400" />
              <span>Open</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
