
import React, { useState } from 'react';
import { SiteConfig, Post, AdminTab } from '../types.ts';
import { generateBlogPost } from '../services/geminiService.ts';

interface AdminPanelProps {
  config: SiteConfig;
  posts: Post[];
  setConfig: (config: SiteConfig) => void;
  setPosts: (posts: Post[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, posts, setConfig, setPosts, onClose }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.POSTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAddPost = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    const result = await generateBlogPost(aiPrompt);
    if (result) {
      const newPost: Post = {
        id: Date.now().toString(),
        title: result.title,
        excerpt: result.excerpt,
        content: result.content,
        category: 'AI Generated',
        image: `https://picsum.photos/seed/${Date.now()}/800/600`,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([newPost, ...posts]);
      setAiPrompt('');
    }
    setIsGenerating(false);
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 flex flex-col space-y-2">
        <h2 className="text-xl font-bold mb-8 text-white px-2">CMS Dashboard</h2>
        <button 
          onClick={() => setActiveTab(AdminTab.POSTS)}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === AdminTab.POSTS ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
        >
          <span>게시물 관리</span>
        </button>
        <button 
          onClick={() => setActiveTab(AdminTab.SETTINGS)}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === AdminTab.SETTINGS ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
        >
          <span>디자인 설정</span>
        </button>
        <button 
          onClick={() => setActiveTab(AdminTab.SEO)}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === AdminTab.SEO ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
        >
          <span>SEO 도구</span>
        </button>
        
        <div className="mt-auto">
           <button 
            onClick={onClose}
            className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all font-bold border border-red-500/20"
          >
            대시보드 나가기
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 overflow-y-auto p-12">
        {activeTab === AdminTab.POSTS && (
          <div className="max-w-4xl space-y-8">
            <header>
              <h1 className="text-3xl font-bold text-white mb-2">콘텐츠 관리</h1>
              <p className="text-gray-400">새로운 소식과 가이드를 작성하세요.</p>
            </header>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">AI 자동 포스팅</h3>
              <div className="flex space-x-4">
                <input 
                  type="text" 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="예: 클락 카지노 투어 주의사항..."
                  className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-all"
                />
                <button 
                  onClick={handleAddPost}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all"
                >
                  {isGenerating ? '생성 중...' : '생성하기'}
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <img src={post.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
                    <div>
                      <h4 className="text-white font-medium">{post.title}</h4>
                      <p className="text-gray-500 text-sm">{post.date} · {post.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === AdminTab.SETTINGS && (
          <div className="max-w-2xl space-y-8">
            <header>
              <h1 className="text-3xl font-bold text-white mb-2">디자인 커스터마이징</h1>
              <p className="text-gray-400">브랜드 아이덴티티와 색상을 설정합니다.</p>
            </header>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">사이트 이름</label>
                <input 
                  type="text" 
                  value={config.siteName}
                  onChange={(e) => setConfig({...config, siteName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">포인트 컬러 (Hex Code)</label>
                <div className="flex space-x-4">
                  <input 
                    type="color" 
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    className="h-12 w-12 bg-transparent border-none rounded-lg cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">슬로건</label>
                <textarea 
                  value={config.tagline}
                  onChange={(e) => setConfig({...config, tagline: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none h-24"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === AdminTab.SEO && (
          <div className="max-w-2xl space-y-8">
            <header>
              <h1 className="text-3xl font-bold text-white mb-2">SEO & 메타 데이터</h1>
              <p className="text-gray-400">검색 엔진 최적화 설정을 관리합니다.</p>
            </header>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">메타 설명 (Description)</label>
                <textarea 
                  value={config.seoDescription}
                  onChange={(e) => setConfig({...config, seoDescription: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none h-32"
                />
                <p className="text-xs text-gray-500">이 설명은 Google 검색 결과에 노출됩니다.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
