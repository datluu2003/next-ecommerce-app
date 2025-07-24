import React from 'react';

interface TabContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  description: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, setActiveTab, description }) => (
  <div className="mt-10">
    <div className="flex space-x-8 border-b border-gray-200 mb-6">
      <button
        className={`pb-2 px-4 text-lg font-medium ${activeTab === 'description' ? 'border-b-2 border-green-600 text-green-700' : 'text-gray-600'}`}
        onClick={() => setActiveTab('description')}
      >
        Mô tả sản phẩm
      </button>
      {/* Có thể thêm tab khác ở đây */}
    </div>
    {activeTab === 'description' && (
      <div className="prose max-w-none text-gray-800">
        {description}
      </div>
    )}
  </div>
);

export default TabContent; 