this.getFulfillment = async (req, res) => {
    res.json({
        fulfillmentText: req.body.queryResult.fulfillmentText
    });
}

module.exports = this;
