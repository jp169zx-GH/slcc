import React, { useState } from 'react';
import { Home, Calendar, Heart, User, ChevronRight, Bell, Phone, Activity, Pill, Clock, CreditCard, Watch, FileText, X } from 'lucide-react';

const SLCCApp = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const ServiceCard = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:bg-gray-50">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
        <Icon className="text-blue-600" size={24} />
      </div>
      <span className="text-xs text-gray-700 text-center">{label}</span>
    </button>
  );

  const MenuCard = ({ title, subtitle, onClick }) => (
    <button onClick={onClick} className="w-full bg-white rounded-xl p-4 mb-2 shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50">
      <div className="text-left">
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </button>
  );

  const ActivityCard = ({ title, date, time, quota, enrolled, onClick }) => (
    <button onClick={onClick} className="w-full bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 active:bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        {enrolled && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">已報名</span>}
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <Calendar size={14} className="mr-2" />
        {date}
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Clock size={14} className="mr-2" />
        {time}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-600">{quota}</span>
        <ChevronRight className="text-gray-400" size={16} />
      </div>
    </button>
  );

  const TabButton = ({ icon: Icon, label, tab }) => (
    <button
      onClick={() => setCurrentTab(tab)}
      className={`flex flex-col items-center gap-1 ${currentTab === tab ? 'text-blue-600' : 'text-gray-500'}`}
    >
      <Icon size={24} />
      <span className="text-xs">{label}</span>
    </button>
  );

  const HomePage = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm opacity-90">尊敬的貴賓會員，您好！</p>
            <h2 className="text-2xl font-bold mt-1">王美華 女士</h2>
            <p className="text-sm mt-1">鑽石會員 | VIP-8888</p>
          </div>
          <div className="relative">
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="grid grid-cols-4 gap-3 mb-6">
          <ServiceCard icon={Activity} label="醫療預約" onClick={() => openModal('medical')} />
          <ServiceCard icon={Calendar} label="活動報名" onClick={() => openModal('activity')} />
          <ServiceCard icon={Heart} label="健康監測" onClick={() => openModal('monitor')} />
          <ServiceCard icon={FileText} label="健康檔案" onClick={() => openModal('record')} />
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg mb-3">今日提醒</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-2">
            <div className="flex items-start">
              <Pill className="text-yellow-600 mr-3 mt-1" size={20} />
              <div>
                <p className="font-semibold text-yellow-800">服藥提醒</p>
                <p className="text-sm text-yellow-700">下午 2:00 - 降血壓藥 1顆</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <div className="flex items-start">
              <Calendar className="text-blue-600 mr-3 mt-1" size={20} />
              <div>
                <p className="font-semibold text-blue-800">活動提醒</p>
                <p className="text-sm text-blue-700">明天上午 10:00 - 太極拳課程</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg mb-3">會員服務</h3>
          <MenuCard 
            title="會員帳戶管理" 
            subtitle="查看個人資訊、等級權益"
            onClick={() => openModal('account')}
          />
          <MenuCard 
            title="專屬管家服務" 
            subtitle="24小時貼心服務"
            onClick={() => openModal('butler')}
          />
          <MenuCard 
            title="穿戴設備管理" 
            subtitle="智能手環已連接 | 電量 85%"
            onClick={() => openModal('device')}
          />
        </div>
      </div>
    </div>
  );

  const ActivityPage = () => (
    <div className="pb-20 px-4 pt-6">
      <h2 className="text-2xl font-bold mb-4">活動中心</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">旅遊行程</h3>
        <ActivityCard 
          title="陽明山溫泉一日遊"
          date="2026年2月15日"
          time="08:00 - 17:00"
          quota="剩餘名額：3/20"
          onClick={() => openModal('tour')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">文娛活動</h3>
        <ActivityCard 
          title="古典音樂欣賞會"
          date="2026年2月8日"
          time="14:00 - 16:00"
          quota="剩餘名額：5/30"
          onClick={() => openModal('music')}
        />
        <ActivityCard 
          title="書法藝術課程"
          date="每週三"
          time="10:00 - 11:30"
          quota="長期課程"
          onClick={() => openModal('calligraphy')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">體育活動</h3>
        <ActivityCard 
          title="太極拳晨練"
          date="每週一、三、五"
          time="07:00 - 08:00"
          quota="已報名"
          enrolled={true}
          onClick={() => openModal('taichi')}
        />
        <ActivityCard 
          title="瑜伽養生課"
          date="每週二、四"
          time="15:00 - 16:00"
          quota="剩餘名額：2/15"
          onClick={() => openModal('yoga')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">社交活動</h3>
        <ActivityCard 
          title="會員茶話會"
          date="2026年2月20日"
          time="14:30 - 16:30"
          quota="剩餘名額：8/25"
          onClick={() => openModal('tea')}
        />
      </div>
    </div>
  );

  const HealthPage = () => (
    <div className="pb-20 px-4 pt-6">
      <h2 className="text-2xl font-bold mb-4">健康中心</h2>

      <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-4 rounded-xl mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm opacity-90">今日健康數據</span>
          <Watch size={20} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold">6,234</p>
            <p className="text-xs opacity-90">步數</p>
          </div>
          <div>
            <p className="text-2xl font-bold">72</p>
            <p className="text-xs opacity-90">心率/分</p>
          </div>
          <div>
            <p className="text-2xl font-bold">98%</p>
            <p className="text-xs opacity-90">血氧</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">醫療服務</h3>
        <MenuCard 
          title="門診掛號" 
          subtitle="預約家庭醫生、專科醫生"
          onClick={() => openModal('appointment')}
        />
        <MenuCard 
          title="健康諮詢" 
          subtitle="線上諮詢、視訊問診"
          onClick={() => openModal('consult')}
        />
        <MenuCard 
          title="體檢預約" 
          subtitle="年度健康檢查、專項體檢"
          onClick={() => openModal('checkup')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">護理服務</h3>
        <MenuCard 
          title="居家護理" 
          subtitle="專業護理、傷口護理"
          onClick={() => openModal('nursing')}
        />
        <MenuCard 
          title="陪診服務" 
          subtitle="醫院陪同、檢查陪同"
          onClick={() => openModal('escort')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">康復理療</h3>
        <MenuCard 
          title="物理治療" 
          subtitle="復健訓練、運動治療"
          onClick={() => openModal('physical')}
        />
        <MenuCard 
          title="中醫推拿" 
          subtitle="經絡推拿、穴位按摩"
          onClick={() => openModal('massage')}
        />
        <MenuCard 
          title="針灸治療" 
          subtitle="傳統針灸、耳穴療法"
          onClick={() => openModal('acupuncture')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">健康檔案</h3>
        <MenuCard 
          title="病歷記錄" 
          subtitle="查看完整病歷資訊"
          onClick={() => openModal('medical-record')}
        />
        <MenuCard 
          title="用藥管理" 
          subtitle="當前用藥 3種 | 今日已服用 2次"
          onClick={() => openModal('medication')}
        />
        <MenuCard 
          title="體檢報告" 
          subtitle="最近體檢：2025年12月15日"
          onClick={() => openModal('report')}
        />
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="pb-20 px-4 pt-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white p-6 rounded-2xl mb-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold mr-4">
            王
          </div>
          <div>
            <h2 className="text-xl font-bold">王美華</h2>
            <p className="text-sm opacity-90">鑽石會員 | VIP-8888</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-300">
          <div className="text-center">
            <p className="text-2xl font-bold">1,280</p>
            <p className="text-xs opacity-90">積分</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs opacity-90">活動次數</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs opacity-90">服務次數</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">會員資訊</h3>
        <MenuCard 
          title="個人資訊" 
          subtitle="查看和編輯個人資料"
          onClick={() => openModal('personal-info')}
        />
        <MenuCard 
          title="會員等級與權益" 
          subtitle="鑽石會員專屬權益"
          onClick={() => openModal('membership')}
        />
        <MenuCard 
          title="緊急聯絡人" 
          subtitle="管理緊急聯絡人資訊"
          onClick={() => openModal('emergency')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">費用管理</h3>
        <MenuCard 
          title="費用統計" 
          subtitle="本月費用：NT$ 12,500"
          onClick={() => openModal('billing')}
        />
        <MenuCard 
          title="繳費記錄" 
          subtitle="查看歷史繳費記錄"
          onClick={() => openModal('payment-history')}
        />
        <MenuCard 
          title="自動扣款設置" 
          subtitle="已開啟自動扣款"
          onClick={() => openModal('auto-pay')}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">設置</h3>
        <MenuCard 
          title="通知設置" 
          subtitle="管理推送通知"
          onClick={() => openModal('notifications')}
        />
        <MenuCard 
          title="隱私設置" 
          subtitle="數據隱私與安全"
          onClick={() => openModal('privacy')}
        />
      </div>
    </div>
  );

  const getModalContent = () => {
    switch(modalContent) {
      case 'medical':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">醫療預約</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900">門診掛號</p>
                <p className="text-sm text-blue-700 mt-1">預約家庭醫生、專科門診</p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full">立即預約</button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900">健康諮詢</p>
                <p className="text-sm text-blue-700 mt-1">線上諮詢、視訊問診</p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full">開始諮詢</button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900">體檢預約</p>
                <p className="text-sm text-blue-700 mt-1">年度健康檢查、專項體檢</p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full">預約體檢</button>
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">會員帳戶</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">會員姓名</span>
                <span className="font-semibold">王美華</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">會員編號</span>
                <span className="font-semibold">VIP-8888</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">會員等級</span>
                <span className="font-semibold text-purple-600">鑽石會員</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">加入日期</span>
                <span className="font-semibold">2023年3月15日</span>
              </div>
              <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                <p className="font-semibold text-purple-900 mb-2">鑽石會員專屬權益</p>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• 24小時專屬管家服務</li>
                  <li>• 優先預約各項服務</li>
                  <li>• 免費健康體檢（每年2次）</li>
                  <li>• 活動報名優先權</li>
                  <li>• 積分雙倍累積</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'butler':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">專屬管家</h3>
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 rounded-xl mb-4">
              <div className="flex items-center mb-3">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mr-4">
                  李
                </div>
                <div>
                  <p className="text-lg font-bold">李雅婷 管家</p>
                  <p className="text-sm opacity-90">資深照護專員</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="bg-white text-blue-600 py-2 rounded-lg flex items-center justify-center">
                  <Phone size={18} className="mr-2" />
                  <span className="text-sm font-semibold">電話聯絡</span>
                </button>
                <button className="bg-white text-blue-600 py-2 rounded-lg flex items-center justify-center">
                  <Bell size={18} className="mr-2" />
                  <span className="text-sm font-semibold">緊急呼叫</span>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">服務時間：24小時全天候</p>
              <p className="text-sm text-gray-600">聯絡電話：0912-345-678</p>
              <p className="text-sm text-gray-600">服務年資：8年</p>
            </div>
          </div>
        );
      case 'device':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">穿戴設備</h3>
            <div className="bg-green-50 p-4 rounded-xl mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <Watch className="text-green-600 mr-3" size={24} />
                  <div>
                    <p className="font-semibold text-green-900">智能健康手環</p>
                    <p className="text-sm text-green-700">型號：SLCC-H100</p>
                  </div>
                </div>
                <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">已連接</span>
              </div>
              <div className="mt-3 pt-3 border-t border-green-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-700">電量</span>
                  <span className="font-semibold text-green-900">85%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-700">即時心率監測</span>
                <span className="text-green-600 font-semibold">開啟</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-700">跌倒偵測</span>
                <span className="text-green-600 font-semibold">開啟</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-700">緊急呼叫功能</span>
                <span className="text-green-600 font-semibold">開啟</span>
              </div>
            </div>
          </div>
        );
      case 'medication':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">用藥管理</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-blue-900">降血壓藥</p>
                    <p className="text-sm text-blue-700">每日2次，早晚飯後</p>
                  </div>
                  <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">已服用</span>
                </div>
                <p className="text-xs text-blue-600 mt-2">下次服用：今日 20:00</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-yellow-900">降血糖藥</p>
                    <p className="text-sm text-yellow-700">每日1次，早餐前</p>
                  </div>
                  <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">已服用</span>
                </div>
                <p className="text-xs text-yellow-600 mt-2">下次服用：明日 07:00</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-purple-900">維生素D</p>
                    <p className="text-sm text-purple-700">每日1次，早餐後</p>
                  </div>
                  <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">待服用</span>
                </div>
                <p className="text-xs text-purple-600 mt-2">提醒時間：今日 14:00</p>
              </div>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">本月費用統計</h3>
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-4 rounded-xl mb-4">
              <p className="text-sm opacity-90">2026年1月總費用</p>
              <p className="text-3xl font-bold mt-1">NT$ 12,500</p>
              <p className="text-xs opacity-90 mt-2">已繳費 | 自動扣款成功</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-700">基本服務費</span>
                <span className="font-semibold">NT$ 8,000</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-700">醫療服務</span>
                <span className="font-semibold">NT$ 2,500</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-700">康復理療</span>
                <span className="font-semibold">NT$ 1,200</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-700">活動報名</span>
                <span className="font-semibold">NT$ 800</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">功能詳情</h3>
            <p className="text-gray-600">此功能的詳細資訊將在這裡展示。</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto relative">
      <div className="h-screen overflow-y-auto">
        {currentTab === 'home' && <HomePage />}
        {currentTab === 'activity' && <ActivityPage />}
        {currentTab === 'health' && <HealthPage />}
        {currentTab === 'profile' && <ProfilePage />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center" style={{maxWidth: '448px', margin: '0 auto'}}>
        <TabButton icon={Home} label="首頁" tab="home" />
        <TabButton icon={Calendar} label="活動" tab="activity" />
        <TabButton icon={Heart} label="健康" tab="health" />
        <TabButton icon={User} label="我的" tab="profile" />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-96 overflow-y-auto p-6 relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            {getModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SLCCApp;