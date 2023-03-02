import React, {useEffect, useState} from "react";
import '@/App.css';
import lessStyles from './app.less';
import smallImage from '@/assets/images/small.png';
import memberList from '@/assets/json/test.json';

import Person from '@/components/Person';
import InputWithView from "@/components/InputWithView";

function App() {

    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        try {
            setMembers(JSON.parse(memberList as any))
        } catch (e) {
            
        }
    }, []);

    return (
        <div>
            <h2>Hello Ezio</h2>
            <div className={lessStyles['content-box']}></div>
            <div>
                <img src={smallImage} alt="小图标"/>
            </div>
            <div className={lessStyles['bg-box']}></div>
            {members.map(item => (
                <div>
                    <span>{item.name}</span>
                    <span>{item.age}</span>
                </div>)
            )}
            <Person />
            <InputWithView />
            <div>测试添加一些东西导致文件修改，但是node_modules没变，测试vendor的hash是否变化</div>
        </div>
    )
}

export default App;