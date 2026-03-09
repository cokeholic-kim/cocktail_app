import type { Metadata } from 'next';
import DesignLabClient from './DesignLabClient';

export const metadata: Metadata = {
  title: 'Design Lab',
  description: '컴포넌트 기반 UI 검증 페이지',
};

export default function DesignLabPage() {
  return <DesignLabClient />;
}
