"use client"
import { SendArticleSteps } from '@/Modules/Account/SendArticle/SendAricleSteps/SendArticleSteps';
import FirstStepForm from '@/Modules/Account/SendArticle/StepsForms/FirstStepForm/FirstStepForm';
import SecondStepForm from '@/Modules/Account/SendArticle/StepsForms/SecondStepForm/SecondStepForm';
import ThirdStepForm from '@/Modules/Account/SendArticle/StepsForms/ThirdStepForm/ThirdStepForm';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { setCurrentSlide } from '@/Modules/Account/SendArticle/redux/sendArticle';
interface ISendPageProps {
    locale: string
}

export default function SendPage (props: ISendPageProps) {
    const swiperRef = useRef<SwiperRef>(null);
    const {currentSlide} = useAppSelector(state=>state.sendArticle)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(currentSlide)
        }
    }, [currentSlide]);
    return (
        <div style={{padding: 40}}>
            <SendArticleSteps locale={props.locale}/>
            <Swiper
                onSlideChange={(swiper) => (dispatch(setCurrentSlide(swiper.activeIndex)))}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                initialSlide={currentSlide}
                ref={swiperRef}
                allowTouchMove={false}
            >
                <SwiperSlide>
                  <FirstStepForm />
                </SwiperSlide>
                <SwiperSlide>
                  <SecondStepForm />
                </SwiperSlide>
                <SwiperSlide>
                  <ThirdStepForm />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}