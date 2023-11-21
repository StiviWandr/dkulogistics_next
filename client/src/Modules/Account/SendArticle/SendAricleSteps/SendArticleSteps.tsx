"use client"
import { Steps } from 'antd';
// import './SendArticleSteps.css'
import { VerticalAlignBottomOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/helpers/hooks/redux';
interface ISendArticleStepsProps {
    locale: string
}

export function SendArticleSteps (props: ISendArticleStepsProps) {
    const {currentStep} = useAppSelector(state=>state.sendArticle)
    return (
        <>
            <Steps
                items={[
                    {
                        title: 'О статье',
                        status: currentStep===1 ? "process": 'finish',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Об авторах',
                        status: currentStep>2 ? 'finish': currentStep===2 ? "process": "wait",
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Загрузка статьи',
                        status: currentStep>3 ? 'finish': currentStep===3 ? "process": "wait",
                        icon: <VerticalAlignBottomOutlined />
                    },
                    {
                        title: 'Завершение',
                        status:  currentStep===4 ? "finish" : "wait",
                        icon: <SmileOutlined />,
                    },
                ]}
            />
        </>
    );
}