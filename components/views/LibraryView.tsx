
import React, { useState, useEffect } from 'react';
import { LegalDocument } from '../../types';
import { storageService } from '../../services/storageService';

const LibraryView: React.FC = () => {
  const [docs, setDocs] = useState<LegalDocument[]>([]);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newDoc, setNewDoc] = useState<Omit<LegalDocument, 'id'>>({
    title: '',
    category: 'Corporate',
    description: '',
    format: 'PDF',
    downloadUrl: '#'
  });

  useEffect(() => {
    setDocs(storageService.getDocuments());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title) return;
    const added = storageService.addDocument(newDoc);
    setDocs([added, ...docs]);
    setIsAdding(false);
    setNewDoc({ title: '', category: 'Corporate', description: '', format: 'PDF', downloadUrl: '#' });
  };

  const handleRemove = (id: string) => {
    if (confirm('Delete this document template?')) {
      storageService.removeDocument(id);
      setDocs(docs.filter(d => d.id !== id));
    }
  };

  const filtered = docs.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-transition">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Document Library</h2>
          <p className="text-slate-500 text-sm">Manage and download verified legal templates.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-sans text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <i className={`fa-solid ${isAdding ? 'fa-xmark' : 'fa-plus'}`}></i>
          {isAdding ? 'Cancel' : 'Add Template'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl mb-8 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-bold mb-6">Contribute New Template</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Document Title</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-sans text-sm"
                placeholder="e.g. Mutual NDA"
                value={newDoc.title}
                onChange={e => setNewDoc({...newDoc, title: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Category</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-sans text-sm"
                value={newDoc.category}
                onChange={e => setNewDoc({...newDoc, category: e.target.value})}
              >
                {['Corporate', 'HR', 'Commercial', 'IP', 'Real Estate'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Description</label>
              <textarea 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-sans text-sm h-24"
                placeholder="Brief summary of the document purpose..."
                value={newDoc.description}
                onChange={e => setNewDoc({...newDoc, description: e.target.value})}
              />
            </div>
            <button type="submit" className="md:col-span-2 py-3 bg-slate-900 text-white rounded-xl font-sans font-bold hover:bg-slate-800 transition-all">
              Save to Library
            </button>
          </form>
        </div>
      )}

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-sans text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <i className={`fa-solid ${doc.format === 'PDF' ? 'fa-file-pdf' : 'fa-file-word'} text-xl`}></i>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase tracking-wider font-sans">{doc.category}</span>
                <button 
                  onClick={() => handleRemove(doc.id)}
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                >
                  <i className="fa-solid fa-trash text-xs"></i>
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{doc.title}</h3>
            <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10">{doc.description}</p>
            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
              <span className="text-[11px] font-bold text-slate-400 font-sans">{doc.format} • SECURE</span>
              <button className="flex items-center gap-2 text-indigo-600 font-sans font-bold text-sm hover:gap-3 transition-all">
                Download <i className="fa-solid fa-download"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryView;
