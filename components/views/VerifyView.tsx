
import React, { useState, useRef } from 'react';
import { verifyLegalContent } from '../../services/geminiService';
import { storageService } from '../../services/storageService';
import { VerificationResult } from '../../types';

const VerifyView: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleVerify = async () => {
    if (!preview || !file) return;
    setIsVerifying(true);
    try {
      const res = await verifyLegalContent(preview, file.type, "Analyze for authenticity.");
      
      // PERSIST TO MOCK BACKEND
      const savedResult = storageService.saveVerification({
        fileName: file.name,
        isAuthentic: res.isAuthentic,
        confidence: res.confidence,
        analysis: res.analysis,
        flags: res.flags
      });
      
      setResult(savedResult);
    } catch (err) {
      console.error(err);
      alert("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Upload Media or Document</h2>
            <p className="text-slate-500 text-sm mb-8 italic">
              Our AI models analyze metadata, forensic artifacts, and linguistic consistency to detect sophisticated deepfakes or fraudulent document edits.
            </p>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
                preview ? 'border-indigo-400 bg-indigo-50/10' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,video/*,application/pdf"
              />
              {preview ? (
                <div className="text-center">
                  <i className="fa-solid fa-check-circle text-4xl text-indigo-500 mb-4"></i>
                  <p className="font-bold text-slate-800">{file?.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{(file!.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 mx-auto">
                    <i className="fa-solid fa-file-shield text-2xl"></i>
                  </div>
                  <p className="font-semibold text-slate-700">Select file to analyze</p>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF, JPG, MP4, AVI</p>
                </div>
              )}
            </div>

            <button
              disabled={!file || isVerifying}
              onClick={handleVerify}
              className={`w-full mt-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 ${
                !file || isVerifying 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
              }`}
            >
              {isVerifying ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  Analyzing Forensics...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                  Run Verification
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full animate-in fade-in slide-in-from-left-4">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">Forensic Report</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  result.isAuthentic ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {result.isAuthentic ? 'Authentic' : 'Suspicious'}
                </span>
              </div>

              <div className="mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Confidence Level</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${result.isAuthentic ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-slate-700">{(result.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">AI Analysis Summary</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {result.analysis}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Detected Flags</p>
                <div className="flex flex-wrap gap-2">
                  {result.flags.map((flag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-2">
                      <i className="fa-solid fa-circle-exclamation text-amber-500"></i>
                      {flag}
                    </span>
                  ))}
                  {result.flags.length === 0 && (
                    <span className="text-slate-400 text-xs italic">No major anomalies detected.</span>
                  )}
                </div>
              </div>
              
              <button className="w-full mt-10 py-3 border-2 border-slate-100 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <i className="fa-solid fa-file-export"></i>
                Export PDF Report
              </button>
            </div>
          ) : (
            <div className="h-full bg-slate-100/50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
              <i className="fa-solid fa-shield-check text-6xl mb-6 opacity-20"></i>
              <p className="font-medium text-lg">Results will appear here</p>
              <p className="text-sm max-w-[250px] mt-2">Upload a file on the left to start the deepfake and fraud detection analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyView;
