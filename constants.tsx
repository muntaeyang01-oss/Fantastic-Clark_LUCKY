
import { SiteConfig, Post } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  siteName: "FANTASTIC CLARK",
  tagline: "클락 최고의 카지노 에이전시, 당신의 프리미엄 파트너",
  primaryColor: "#8B5CF6", // Purple-500
  secondaryColor: "#1F2937",
  fontFamily: "Noto Sans KR",
  logoUrl: "https://picsum.photos/200/50?grayscale",
  seoDescription: "클락 골프, 카지노, 관광 전문 에이전시 판타스틱 클락입니다. 최상의 VIP 의전 서비스를 약속드립니다.",
  socialLinks: {
    instagram: "https://instagram.com/fantastic_clark",
    telegram: "https://t.me/clark_admin",
    whatsapp: "+63123456789"
  }
};

export const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    title: '클락 한카지노 신규 VIP 프로모션 안내',
    category: 'News',
    content: '필리핀 클락 최고의 럭셔리 카지노 한카지노에서 제공하는 2024 신규 VIP 프로모션을 확인해보세요. 최상의 서비스와 리베이트를 제공합니다.',
    excerpt: '필리핀 클락 최고의 럭셔리 카지노 한카지노의 신규 프로모션 소식입니다.',
    image: 'https://picsum.photos/seed/casino1/800/600',
    date: '2024-05-15'
  },
  {
    id: '2',
    title: '클락 골프 & 카지노 풀패키지 가이드',
    category: 'Guide',
    content: '낮에는 시원한 골프 라운딩을, 밤에는 화려한 카지노에서의 승리를 만끽하세요. 판타스틱 클락만의 맞춤형 패키지를 소개합니다.',
    excerpt: '클락 여행의 완성, 골프와 카지노를 동시에 즐기는 방법을 알려드립니다.',
    image: 'https://picsum.photos/seed/golf1/800/600',
    date: '2024-05-12'
  },
  {
    id: '3',
    // Fixed: Used double quotes to correctly handle the apostrophe in "D'Orea"
    title: "D'Orea 리조트 VIP 전용룸 서비스 오픈",
    category: 'Vip Service',
    content: '더 넓고 쾌적해진 VIP 전용 공간에서 프라이빗한 게임을 즐기실 수 있습니다. 24시간 한국인 에이전트 상주 서비스를 이용해보세요.',
    excerpt: 'VIP 고객님들을 위한 최고의 프라이빗 룸 서비스를 시작합니다.',
    image: 'https://picsum.photos/seed/hotel1/800/600',
    date: '2024-05-10'
  }
];
