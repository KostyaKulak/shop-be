'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: {
        title: 'Chanel Chance Eau Tendre',
        description: 'Туалетная вода для женщин Шанель Шанс о Тендер.',
        price: '208'
    }
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
