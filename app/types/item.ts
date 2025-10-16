export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: '새것' | '거의 새것' | '좋음' | '사용감 있음';
  imageUrl?: string;
  ownerName: string;
  dormitory: string;
  roomNumber: string;
  desiredItems: string;
  createdAt: Date;
}

export type ItemCategory = '전자기기' | '책/문구' | '생활용품' | '의류' | '식품' | '기타';
