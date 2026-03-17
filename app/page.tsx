import { CreateSnippetForm } from '@/components/create-snippet-form';

export const metadata = {
  title: 'Code Snippet Notepad',
  description: 'Share and store code snippets easily',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 text-pretty">
            Code Snippet Notepad
          </h1>
          <p className="text-lg text-slate-600">
            Share and store your code snippets easily. Get a unique link to share with others.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <CreateSnippetForm />
        </div>
      </div>
    </main>
  );
}
