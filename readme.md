
# To test a 'Node Restful API with Mocha and Chai' in [Airline Application] (https://github.com/Kottackal-ET-Practice/AirlineInsurance)

#Introduction

Initally,a 'test-server.js' file is created in the 'test' folder for testing.For testing purpose, a database is defined in  'config.js' file.A NODE_ENV variable with value 'test' is defined in 'test-server.js'.The main application's 'server.js' file establishes db connection using the NODE_ENV variable.

The dependencies are defined in the  'test-server.js' as follows.The environment for making test is created with 'Mocha'.And using 'chai' as assertion library ,and test cases is implemented to test whether a GET and POST request is actually returning a JSON file. The addon 'chai HTTP' allows chai library to easily use assertions on HTTP requests.The testing suite is defined in 'describe' and each test case is defined using 'it'.A functionality to add and remove a dummy datas to the db is included for running test case before and after each test.


##Testing-Weather API

A POST request is made to the **'/quote'** endpoint and then checked that the response contains the following assertions.

 1. should return 200 HTTP status code.

 2. should be an object.

 3. should return as json

 4. body properties should be success,message,total.

 5. body properties values as required.

##Testing-Registration & Login

A POST request is made to the **'/signup'** endpoint and then checked that the response contains the following assertions.

 1. should return 200 HTTP status code.

 2. should be an object.

 3. should return as json

 4. body properties should be success,message,token.

 5. body properties values as required.

A POST request is made to the **'/login'** endpoint and then checked that the response contains the following assertions.

 1. should return 200 HTTP status code.

 2. should be an object.

 3. should return as json

 4. body properties should be success,message,token.

 5. body properties values as required.

##Testing -Insurance

A POST request is made to the **'/signup'** endpoint and then checked that the response contains the following assertions.

 1. should return 200 HTTP status code.

 2. should be an object.

 3. should return as json

 4. body property should be token.

 5. Assign the body property value to a variable 'token'.

A POST request is made to the **'/insured'** endpoint and then checked that the response contains the following assertions.

 1. should return 200 HTTP status code.

 2. should be an object.

 3. should return as json

 4. body properties should be success,message.

 5. body properties values as required.

A GET request is made to the **'/insured'** endpoint and then checked that the response contains the following assertions.

 1. should return 200 HTTP status code.

 2. should be an array.

 3. should return as json.

 4. body properties should be source,destination,persons,date,time,name,insured.

 5. body properties values as required.



Run the test by the command **'mocha'** in command prompt.It will display the db defined for testing.If the test is passed,it returns pass message.
######NOTE :-

 1. Before running the test scripts,modify the 'date' and 'time' parameters in the POST request made to the '/quote' endpoint on the basis of current date and time.Condition for 'date'- Date must be within five days from current date.Condition for 'time'- If date is equal to today's date,time must be greater than current time.*(Refer line number 63)*
 2. The response property 'total' in the POST request made to the '/quote' endpoint varies with the weather condition.So the testing    fails due to the variation between actual and expected values.*(Refer line number 78)*
