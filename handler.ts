const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();

export const putevent = async (event, _context) => {

    const customEvent1 = {
        action: 'withdrawal',
        location: 'MA-BOS-01',
        amount: 300,
        result: 'approved',
        transactionId: '123456',
        cardPresent: true,
        partnerBank: 'Example Bank',
        remainingFunds: 722.34
    };

    const customEvent2 = {
        action: 'withdrawal',
        location: 'NY-NYC-001',
        amount: 20,
        result: 'approved',
        transactionId: '123457',
        cardPresent: true,
        partnerBank: 'Example Bank',
        remainingFunds: 212.52
    };

    const customEvent3 = {
        action: 'withdrawal',
        location: 'NY-NYC-002',
        amount: 60,
        result: 'denied',
        transactionId: '123458',
        cardPresent: true,
        remainingFunds: 5.77
    };

    const params = {
        Entries: [
            {
                Source: 'custom.myATMapp',
                EventBusName: 'default',
                DetailType: 'transaction',
                Time: new Date(),
                Detail: JSON.stringify(customEvent1),
                Resources: ['xyz'],
            },
            {
                Source: 'custom.myATMapp',
                EventBusName: 'default',
                DetailType: 'transaction',
                Time: new Date(),
                Detail: JSON.stringify(customEvent2),
            },
            {
                Source: 'custom.myATMapp',
                EventBusName: 'default',
                DetailType: 'transaction',
                Time: new Date(),
                Detail: JSON.stringify(customEvent3),
            }
        ]
    };

    try {
        const result = await eventbridge.putEvents(params).promise();
    } catch (error) {
        console.error('Error: ', error);
    }


    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Events submitted',
            customEvent1,
            customEvent2,
            customEvent3,
        }, null, 2),
    };
};


export const atmConsumerCase1Fn = async (event) => {
    console.log('[atmConsumerCase1Fn]: ', JSON.stringify(event, null, 2));
};


export const atmConsumerCase2Fn = async (event) => {
    console.log('[atmConsumerCase3Fn]: ', JSON.stringify(event, null, 2));
};


export const atmConsumerCase3Fn = async (event) => {
    console.log('[atmConsumerCase3Fn]: ', JSON.stringify(event, null, 2));
};
