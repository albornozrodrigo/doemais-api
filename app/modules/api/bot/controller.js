this.getAll = async (req, res) => {
    const body = req.body;
    let number1 = body.queryResult.parameters.number1;
    let number2 = body.queryResult.parameters.number2;
    let action = body.queryResult.action;
    let result = 0;

    switch (action) {
        case 'somar': 
            result = number1 + number2; 
        break;
        case 'subtrair':
            result = number1 - number2;
        break;
        case 'dividir':
            result = number1 / number2;
        break;
        case 'multiplicar':
            result = number1 * number2;
        break;
    }

    res.json({
        fulfillmentText: result
    });
}

module.exports = this;