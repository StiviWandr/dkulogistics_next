"use client"
import { Steps } from 'antd';
// import './SendArticleSteps.css'
import { VerticalAlignBottomOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/helpers/hooks/redux';
interface ISendArticleStepsProps {
    
}

export function SendArticleSteps (props: ISendArticleStepsProps) {
    const {currentSlide} = useAppSelector(state=>state.sendArticle)
    return (
        <>
            <Steps
                style={{marginBottom: 20}}
                items={[
                    {
                        title: 'О статье',
                        status: currentSlide===0 ? "process": 'finish',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Об авторах',
                        status: currentSlide > 1 ? 'finish': currentSlide===1 ? "process": "wait",
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Загрузка статьи',
                        status: currentSlide>2 ? 'finish': currentSlide===2 ? "process": "wait",
                        icon: <VerticalAlignBottomOutlined />
                    },
                    {
                        title: 'Завершение',
                        status:  currentSlide===3 ? "finish" : "wait",
                        icon: <SmileOutlined />,
                    },
                ]}
            />
        </>
    );
}