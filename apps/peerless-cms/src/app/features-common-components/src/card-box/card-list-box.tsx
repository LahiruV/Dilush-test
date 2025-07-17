import { Card, CardBody, CardTitle } from "react-bootstrap";
export interface CustomListCardProps {
    content: any[];
    maxWidth?: string;
    borderRadius?: string;
    backgroundColorTitle?: string;
    fontSizeTitle?: string;
    colorTitle?: string;
    paddingTitle?: string;
}
export function CustomListCard({ content, maxWidth, borderRadius, backgroundColorTitle, fontSizeTitle, colorTitle, paddingTitle }: CustomListCardProps) {
    return (
        <>
            {content.map((card, index) => (
                <Card key={index} style={{
                    width: '100%',
                    maxWidth: maxWidth ? maxWidth : '100%',
                    borderRadius: borderRadius,
                }}>
                    <CardTitle style={{ fontSize: fontSizeTitle, backgroundColor: backgroundColorTitle, color: colorTitle, padding: paddingTitle, borderTopRightRadius: borderRadius, borderTopLeftRadius: borderRadius }}>
                        {card.title}
                    </CardTitle>
                    <CardBody>
                        {card.content}
                    </CardBody>
                </Card >
            ))
            }
        </>
    );
}

export default CustomListCard;