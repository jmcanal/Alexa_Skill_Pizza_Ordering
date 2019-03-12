/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the pizza ordering system. What would you like?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const StartedInProgressOrderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === "OrderPizza"
            && handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = attributes.lastOutputResponse;
    return handlerInput.responseBuilder
        .addDelegateDirective()
        .getResponse();
    
  },
};

const CompletedOrderIntentHandler = {
    canHandle(handlerInput) {
        const attributesManager = handlerInput.attributesManager
        const sessionAttributes = attributesManager.getSessionAttributes();
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === "OrderPizza"
        && handlerInput.requestEnvelope.request.dialogState === "COMPLETED";
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const currentIntent = request.intent;
        
        console.log(request.dialogState);
        console.log(request);
    
        if (request.intent.confirmationStatus === "DENIED") {
            const attributesManager = handlerInput.attributesManager;
            let sessionAttributes = attributesManager.getSessionAttributes();
            sessionAttributes.canceledSlots = null;
            attributesManager.setSessionAttributes(sessionAttributes);
            handlerInput.requestEnvelope.request.dialogState === "STARTED"

            return handlerInput.responseBuilder
                .speak("You'd like to start your order again? You can say 'order pizza' to start over.")
                .reprompt("Say 'order pizza' to start over.")
                .getResponse();
        }
        
        const speechOutput = "Thanks, I got your order. It will be ready in 15 minutes and cost $19.50.";
        return handlerInput.responseBuilder
          .speak(speechOutput)
          .getResponse();

    }
}


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'How can I help you with your pizza order?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('pizza', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Your order is canceled. We hope to see you here again soon!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    StartedInProgressOrderIntentHandler,
    CompletedOrderIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();