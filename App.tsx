
import React, { useState, useEffect } from 'react';
import { SiteConfig, Post } from './types.ts';
import { INITIAL_CONFIG, SAMPLE_POSTS } from './constants.tsx';
import Layout from './components/Layout.tsx';
import AdminPanel from './components/AdminPanel.tsx';

const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('site_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('site_posts');
    return saved ? JSON.parse(saved) : SAMPLE_POSTS;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('site_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('site_posts', JSON.stringify(posts));
  }, [posts]);

  return (
    <Layout 
      config={config} 
      isAdmin={isAdmin} 
      onAdminToggle={() => setIsAdmin(!isAdmin)}
    >
      {isAdmin && (
        <AdminPanel 
          config={config} 
          posts={posts} 
          setConfig={setConfig} 
          setPosts={setPosts} 
          onClose={() => setIsAdmin(false)} 
        />
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Casino Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 
            className="text-sm font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: config.primaryColor }}
          >
            {config.tagline}
          </h2>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-none">
            {config.siteName}
          </h1>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
            세계 수준의 카지노와 골프 코스가 있는 필리핀 클락.<br/> 
            판타스틱 클락이 당신의 모든 순간을 가장 완벽하게 설계합니다.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button 
              className="px-10 py-4 text-sm font-bold rounded-full text-white transition-all shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95"
              style={{ backgroundColor: config.primaryColor }}
            >
              상담 예약하기
            </button>
            <button className="px-10 py-4 text-sm font-bold rounded-full text-white bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all active:scale-95">
              서비스 소개서
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/vip1/400/500" className="rounded-2xl h-80 w-full object-cover" alt="" />
            <img src="https://picsum.photos/seed/vip2/400/400" className="rounded-2xl h-64 w-full object-cover mt-16" alt="" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>PREMIUM AGENCY</h4>
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">클락 No.1 VIP 에이전시의<br/>품격을 직접 경험하세요</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              판타스틱 클락은 수년간의 경험과 탄탄한 네트워크를 바탕으로 고객님께 차별화된 경험을 제공합니다. 
              항공권 예약부터 숙소, 카지노 의전, 관광까지 원스톱으로 지원합니다.
            </p>
            <div className="space-y-4">
              {[
                "24시간 전담 비서 서비스",
                "럭셔리 풀빌라 및 5성급 호텔 예약",
                "공항 픽업/샌딩 VIP 전용 차량",
                "최고 수준의 카지노 혜택 및 리베이트"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-white font-medium">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.primaryColor }}></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>LATEST UPDATES</h4>
              <h3 className="text-4xl font-bold text-white">클락 소식 및 가이드</h3>
            </div>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors border-b border-gray-800 pb-1">VIEW ALL POSTS</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <article key={post.id} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
                <div className="h-64 overflow-hidden relative">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase rounded tracking-widest border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-xs text-gray-500 mb-3">{post.date}</p>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors leading-tight">{post.title}</h4>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-light">{post.excerpt}</p>
                  <button 
                    className="text-xs font-bold uppercase tracking-widest transition-all group-hover:translate-x-2 flex items-center"
                    style={{ color: config.primaryColor }}
                  >
                    LEARN MORE <span className="ml-2">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-900/40 to-black border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>
          
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">특별한 행운의 주인공이 될 준비가 되셨나요?</h3>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            지금 바로 전문 상담원과 연결하여 나만의 맞춤형 클락 여행 일정을 계획해보세요. 
            판타스틱 클락이 최고의 경험을 선사합니다.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="w-full md:w-auto px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center">
              카카오톡 오픈챗 연결
            </button>
            <button className="w-full md:w-auto px-12 py-5 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              텔레그램 상담
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
