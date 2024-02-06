"use client"
import { Steps } from 'antd';
// import './SendArticleSteps.css'
import { VerticalAlignBottomOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/helpers/hooks/redux';
import { useTranslations } from 'next-intl';
interface ISendArticleStepsProps {
    
}

export function SendArticleSteps (props: ISendArticleStepsProps) {
    const {currentSlide} = useAppSelector(state=>state.sendArticle)
    const t = useTranslations('Отправка статьи')
    return (
        <>
            <Steps
                style={{marginBottom: 20}}
                items={[
                    {
                        title: t('О статье'),
                        status: currentSlide===0 ? "process": 'finish',
                        icon: <UserOutlined />,
                    },
                    {
                        title: t('Об авторах'),
                        status: currentSlide > 1 ? 'finish': currentSlide===1 ? "process": "wait",
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: t('Загрузка статьи'),
                        status: currentSlide>2 ? 'finish': currentSlide===2 ? "process": "wait",
                        icon: <VerticalAlignBottomOutlined />
                    },
                    {
                        title: t('Завершение'),
                        status:  currentSlide===3 ? "finish" : "wait",
                        icon: <SmileOutlined />,
                    },
                ]}
            />
        </>
    );
}