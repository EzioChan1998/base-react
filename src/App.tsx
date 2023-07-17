import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useMemo,
  useRef
} from 'react';
import '@/App.css';
import lessStyles from './app.less';
import smallImage from '@/assets/images/small.png';
import memberList from '@/assets/json/test.json';

import Person from '@/components/Person';
import InputWithView from '@/components/InputWithView';
import TypeErrorTest from '@/components/TypeErrorTest';
import Scroll from '@/components/Scroll';

const LazyComponent = lazy(() => import('@/components/LazyComponent'));

// 添加一个未使用变量
// const a = 1;

function App() {
  const [members, setMembers] = useState<any[]>([]);
  const [isShowLazy, setIsShowLazy] = useState<boolean>(false);

  useEffect(() => {
    try {
      setMembers(JSON.parse(memberList as any));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleShowLazy = () => {
    setIsShowLazy((v) => !v);
  };

  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((v) => v + 1);
  };

  const testObj = useMemo(
    () => ({
      p1: 1,
      p2: 2,
      p3: 3
    }),
    []
  );

  const testRef = useRef({
    p1: 1,
    p2: 2,
    p3: 3
  });

  return (
    <div>
      <h1 onClick={handleClick}>{count}</h1>
      <Scroll testObj={testObj} text={'使用memo'} />
      <Scroll testObj={testRef.current} text={'使用ref'} />
      <Scroll
        testObj={{
          p1: 1,
          p2: 2,
          p3: 3
        }}
        text={'直接传递'}
      />

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
      <span>添加一些东西测试lint-staged是否成功</span>
      <TypeErrorTest />
    </div>
  );
}

export default App;
