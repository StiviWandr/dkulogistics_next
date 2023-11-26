import { SendArticleSteps } from '@/Modules/Account/SendArticle/SendAricleSteps/SendArticleSteps';
import FirstStepForm from '@/Modules/Account/SendArticle/StepsForms/FirstStepForm/FirstStepForm';
import SecondStepForm from '@/Modules/Account/SendArticle/StepsForms/SecondStepForm/SecondStepForm';

interface ISendPageProps {
    locale: string
}

export default function SendPage (props: ISendPageProps) {
    return (
        <div style={{padding: 40}}>
            <SendArticleSteps locale={props.locale}/>
            
            {/* <FirstStepForm/> */}
            <SecondStepForm/>
        </div>
    );
}