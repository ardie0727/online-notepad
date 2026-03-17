'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Snippet {
  id: string;
  content: string;
  file_type: string;
  created_at: string;
}

export function SnippetViewer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText,setCopiedText] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`/api/snippets/${id}`);

        if (!response.ok) {
          throw new Error('Snippet not found');
        }

        const data = await response.json();
        setSnippet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load snippet');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippet();
  }, [params]);

  const handleCopyLink = async () => {
    if (!snippet) return;
    const url = `${window.location.origin}/snippet/${snippet.id}`;
    await navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };
  const handleCopyText = async () => {
    if (!snippet) return;
    const url = snippet.content;
    await navigator.clipboard.writeText(url);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownload = () => {
    if (!snippet) return;
    const element = document.createElement('a');
    const file = new Blob([snippet.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `snippet.${snippet.file_type}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-slate-600">Loading snippet...</div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {error === 'Snippet not found' ? 'Snippet Not Found' : 'Error'}
          </h2>
          <p className="text-slate-600 mb-6">
            {error === 'Snippet not found'
              ? 'This snippet does not exist or has been deleted.'
              : 'Failed to load the snippet.'}
          </p>
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(snippet.created_at).toLocaleString();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Snippet ({snippet.file_type.toUpperCase()})
            </h2>
            <p className="text-sm text-slate-600">Created {formattedDate}</p>
          </div>
          <div className="text-sm text-slate-600">ID: {snippet.id}</div>
          <Button
            onClick={handleCopyText}
            variant="outline"
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            {copiedLink ? 'Copied!' : 'Copy Text'}
          </Button>
        </div>

        <pre className="px-6 py-6 bg-white overflow-x-auto">
          <code className="text-sm text-slate-800 font-mono whitespace-pre-wrap break-words">
            {snippet.content}
          </code>
        </pre>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h3 className="font-semibold text-slate-900">Share & Download</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={`${typeof window !== 'undefined' ? window.location.origin : ''}/snippet/${snippet.id}`}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 text-sm"
            />
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              {copiedLink ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>

          <Button
            onClick={handleDownload}
            className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="w-4 h-4" />
            Download File
          </Button>
        </div>
      </div>
    </div>
  );
}
