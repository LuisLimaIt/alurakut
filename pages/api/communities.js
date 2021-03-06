import { SiteClient } from 'datocms-client';

export default async function requisitionRecipient(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '0bf4f8db6123397250a6399607d2de';
        const client = new SiteClient(TOKEN);
        
        // É importante validar os dados, antes de realizar cadastros
        const recordCreated = await client.items.create({
            itemType: "968801",
            ...request.body,
        });
    
        response.json({
            data: "data",
            recordCreated: recordCreated,
        });
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, somente no POST'
    })
}

