import { SendArticleSteps } from '@/Modules/Account/SendArticle/SendAricleSteps/SendArticleSteps';

interface ISendPageProps {
    locale: string
}

export default function SendPage (props: ISendPageProps) {
    return (
        <div style={{padding: 40}}>
            <SendArticleSteps locale={props.locale}/>
        </div>
    );
}