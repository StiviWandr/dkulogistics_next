import JournalsList from "@/Modules/JournalsList/JournalsList";
import { Container } from "@/UI/Container/Container";

export default function Journals () {
    return (
        <div style={{margin: "40px 0"}}>
            <Container>
                <JournalsList/>
            </Container>
        </div>
    );
}