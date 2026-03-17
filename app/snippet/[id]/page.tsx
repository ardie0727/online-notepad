import { SnippetViewer } from '@/components/snippet-viewer';

export const metadata = {
  title: 'View Snippet',
  description: 'View shared code snippet',
};

export default function SnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <SnippetViewer params={params} />
      </div>
    </main>
  );
}
