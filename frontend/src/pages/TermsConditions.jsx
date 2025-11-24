import { FileText, ArrowLeft } from "lucide-react";

const TermsConditions = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-2 text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p>Content coming soon...</p>
      </div>
    </div>
  );
};

export default TermsConditions;
