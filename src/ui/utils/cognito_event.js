const event = {
  version: '1',
  region: 'us-east-1',
  userPoolId: 'us-east-1_DZ7xJt00o',
  userName: 'ropujari',
  callerContext: {
    awsSdkVersion: 'aws-sdk-unknown-unknown',
    clientId: '2cu1brsg6oee1l6ck7noapl9od',
  },
  triggerSource: 'PreSignUp_SignUp',
  request: {
    userAttributes: {
      phone_number: '+1111111111',
      email: 'ropujari@amazon.com',
    },
    validationData: null,
  },
  response: {
    autoConfirmUser: false,
    autoVerifyEmail: false,
    autoVerifyPhone: false,
  },
};

console.log(event.request.userAttributes);
