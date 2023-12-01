"use client"
import AddJournalForm from '@/Modules/Account/AddJournalForm/AddJournalForm';
import JournalsList from '@/Modules/JournalsList/JournalsList';
interface ISendPageProps {
    locale: string
}

export default function AddJournalPage (props: ISendPageProps) {
    
    
    return (
        <div style={{padding: 40}}>
            <AddJournalForm/>
            <JournalsList/>
        </div>
    );
}