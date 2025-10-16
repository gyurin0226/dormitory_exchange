'use client';

import { useState, useMemo } from 'react';
import ItemCard from './components/ItemCard';
import AddItemForm from './components/AddItemForm';
import SearchBar from './components/SearchBar';
import { Item } from './types/item';

export default function Home() {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      title: '아이패드 프로 11인치',
      description: '2021년 모델, 256GB, 애플펜슬 포함. 사용감 거의 없고 스크래치 없습니다.',
      category: '전자기기',
      condition: '거의 새것',
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      ownerName: '김철수',
      dormitory: 'A동',
      roomNumber: '301호',
      desiredItems: '노트북, 전자책 리더기',
      createdAt: new Date('2025-10-10'),
    },
    {
      id: '2',
      title: '대학 전공 서적 (경영학)',
      description: '경영학원론, 마케팅원론 등 전공 필수 서적 10권 세트입니다.',
      category: '책/문구',
      condition: '좋음',
      ownerName: '이영희',
      dormitory: 'B동',
      roomNumber: '205호',
      desiredItems: '공학 서적, 또는 제안',
      createdAt: new Date('2025-10-12'),
    },
    {
      id: '3',
      title: '미니 냉장고',
      description: '20L 미니 냉장고, 작년에 구매했고 상태 양호합니다.',
      category: '생활용품',
      condition: '좋음',
      ownerName: '박민수',
      dormitory: 'C동',
      roomNumber: '102호',
      desiredItems: '선풍기, 스탠드',
      createdAt: new Date('2025-10-14'),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === '전체' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const handleAddItem = (newItem: Omit<Item, 'id' | 'createdAt'>) => {
    const item: Item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setItems([item, ...items]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🏠 기숙사 물물교환
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                기숙사 학생들을 위한 물물교환 플랫폼
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              물품 등록
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              등록된 물품이 없습니다
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              새로운 물품을 등록해보세요!
            </p>
          </div>
        )}
      </main>

      {/* Add Item Form Modal */}
      {showAddForm && (
        <AddItemForm
          onAddItem={handleAddItem}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
