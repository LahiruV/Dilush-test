import { Card, CardBody, CardTitle } from "react-bootstrap";
export interface AdministratorSettingsListCardProps { cardsData: any[]; }
export function AdministratorSettingsListCard({ cardsData }: AdministratorSettingsListCardProps) {

    const dividerStyle = {
        border: 'none',
        borderTop: '2px solid #ccc',
        margin: '10px 0',
    };
    return (
        <>
            {cardsData.map((card, index) => (
                <Card key={index} className="administrator-card-item">
                    <CardBody>
                        <CardTitle style={{ fontSize: '14px' }}>{card.title}</CardTitle>
                        <hr style={dividerStyle} />
                        {card.content}
                    </CardBody>
                </Card>
            ))}
        </>
    );
}

export default AdministratorSettingsListCard;