import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentCategory, DocumentItem } from '../types';
import { calculateScholarshipReadiness } from '../utils/readinessCalculator';
import { 
  FolderOpen, 
  Upload, 
  Trash2, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/common/Badge';

export const DocumentsPage: React.FC = () => {
  const { documents, uploadDocument, deleteDocument, scholarships, savedScholarshipIds } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentCategory>('Academic Certificates');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('1.2 MB');

  const categories: DocumentCategory[] = [
    'Academic Certificates',
    'Income Certificates',
    'Identity Proof',
    'Bank Details',
    'Recommendation Letters',
    'Other Documents'
  ];

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
      if (!docName) {
        setDocName(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    uploadDocument({
      name: docName,
      category: docCategory,
      fileName: fileName || `${docName.replace(/\s+/g, '_')}.pdf`,
      fileSize: fileSize || '1.1 MB',
      verificationStatus: 'Verified',
      fileType: 'application/pdf'
    });

    setShowUploadModal(false);
    setDocName('');
    setFileName('');
  };

  const filteredDocs = selectedCategory === 'All'
    ? documents
    : documents.filter(d => d.category === selectedCategory);

  // Compute readiness against saved scholarships
  const relevantScholarships = scholarships.filter(s => savedScholarshipIds.includes(s.id)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
              Student Document Vault
            </span>
            <span className="text-xs text-slate-400">{documents.length} Secure Documents</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Document Vault & Readiness Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload verified certificates once. Instantly evaluate application completeness across all scholarships.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Standout Feature: Scholarship Application Readiness Matrix */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Application Readiness Matrix</span>
            </h3>
            <p className="text-xs text-slate-400">
              Real-time document checklist verification for your target scholarships
            </p>
          </div>
          <span className="text-xs text-slate-500">Auto-matched with uploaded credentials</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {relevantScholarships.map(sch => {
            const readiness = calculateScholarshipReadiness(sch, documents);
            return (
              <div key={sch.id} className="p-4 rounded-2xl bg-dark-surface border border-dark-border space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-white line-clamp-1">{sch.title}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    readiness.readinessPercentage === 100 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {readiness.readinessPercentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full"
                    style={{ width: `${readiness.readinessPercentage}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  {readiness.missingDocs.length > 0 ? (
                    <div className="text-amber-400/90 truncate">
                      Missing: {readiness.missingDocs[0]}
                    </div>
                  ) : (
                    <div className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      All required documents uploaded
                    </div>
                  )}
                </div>

                <Link
                  to={`/scholarships/${sch.id}`}
                  className="text-[11px] text-brand-400 hover:underline font-semibold block pt-1"
                >
                  View Requirements →
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'All'
              ? 'bg-brand-500 text-white shadow-md'
              : 'bg-dark-card border border-dark-border text-slate-400 hover:text-white'
          }`}
        >
          All Categories ({documents.length})
        </button>
        {categories.map(cat => {
          const count = documents.filter(d => d.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-dark-card border border-dark-border text-slate-400 hover:text-white'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-brand-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <Badge variant="success" size="sm">{doc.verificationStatus}</Badge>
              </div>

              <h4 className="text-sm font-bold text-white tracking-tight">{doc.name}</h4>
              <p className="text-xs text-slate-400 font-mono mt-1 truncate">{doc.fileName}</p>
            </div>

            <div className="pt-3 border-t border-dark-border flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span>{doc.uploadedAt}</span>
              </div>

              <button
                onClick={() => deleteDocument(doc.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete Document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <h3 className="text-base font-bold text-white">Upload to Document Vault</h3>
            
            <form onSubmit={handleSubmitUpload} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Income Certificate FY 2026, Semester 4 Marksheet"
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-card border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Document Category</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-card border border-dark-border text-white focus:outline-none focus:border-brand-500"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* File Dropzone */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select File (PDF / Scanned Copy)</label>
                <div className="p-5 border-2 border-dashed border-dark-border hover:border-brand-500/50 rounded-xl bg-dark-card/60 text-center cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    onChange={handleSimulatedFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-brand-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-300 font-medium">
                    {fileName ? fileName : 'Click to browse or drop document'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">PDF, JPG, PNG up to 15MB</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-dark-border text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-md"
                >
                  Upload & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
