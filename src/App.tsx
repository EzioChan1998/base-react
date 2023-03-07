import React, {
  useEffect, useState, Suspense, lazy,
} from 'react';
import '@/App.css';
import lessStyles from './app.less';
import smallImage from '@/assets/images/small.png';
import memberList from '@/assets/json/test.json';

import Person from '@/components/Person';
import InputWithView from '@/components/InputWithView';

const LazyComponent = lazy(() => import('@/components/LazyComponent'));

function App() {
  const [members, setMembers] = useState<any[]>([]);
  const [isShowLazy, setIsShowLazy] = useState<boolean>(false);

  useEffect(() => {
    try {
      setMembers(JSON.parse(memberList as any));
    } catch (e) {}
  }, []);

  const handleShowLazy = () => {
    setIsShowLazy((v) => !v);
  };

  return (
    <div>
      <h2>Hello Ezio</h2>
      <div className={lessStyles['content-box']}></div>
      <div>
        <img src={smallImage} alt="小图标" />
      </div>
      <div className={lessStyles['bg-box']}></div>
      {members.map((item) => (
        <div>
          <span>{item.name}</span>
          <span>{item.age}</span>
        </div>
      ))}
      <Person />
      <InputWithView />
      <div>
        测试添加一些东西导致文件修改，但是node_modules没变，测试vendor的hash是否变化
      </div>

      <button type="button" onClick={handleShowLazy}>
        展示LazyComponent
      </button>
      {/* show为true时加载LazyDemo组件 */}
      {isShowLazy && (
        <Suspense fallback={null}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

export default App;
