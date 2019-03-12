2/19/2019
# Alexa_Skill_Pizza_Ordering
Basic Alexa Skills for a pizza ordering system, including system initiative and mixed initiative dialogue systems

System Initiative Model:

The system initiative dialog manager in Q1 and Q2 is limited, though it captures the information necessary, even if the process can be tedious for the user. Limitations include: users cannot give information out of order or fill multiple slots in one utterance, e.g. “small pepperoni” would still elicit a request for size. The incorporation of some universals increase functionality, though only in very high-level ways – allowing the user to cancel the order mid-order, restart the order at the end and have Alexa repeat the last thing she said. 

Mixed-initiative Model: 

Changing the skill to be more mixed initiative required some modifications in how slots are filled. It requires allowing slots to be filled in a different order and with different types of utterances than were allowed in the system initiative (FST-style) versions. I mostly handled this by adding additional user inputs to the skill build which could fill multiple slots at the same time, e.g. {pizza size} {pizza type}. A future fix is to allow users to change their crust type (not currently enabled).

An additional way I handled user-initiated requests was to create different intents in the Alexa build. If a user asks for a reorder, they will be guided through a different set of questions than those seeking a new order. The same is true for those asking about order status. These latter dialogues were mostly hard-coded with information, since the skill is currently not enabled to connect to an external database to lookup customer information, addresses, etc. 

