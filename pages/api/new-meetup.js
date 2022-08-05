import { MongoClient } from "mongodb";

// this route would be /api/new-meetup

async function handler(request, response) {
  if (request.method === "POST") {
    const receivedData = request.body;

    // const {image, title, address, description } = receivedData;

    //MongoClient.connect will send the credentials and name of the database (before the ?retry url segment)
    const client = await MongoClient.connect(
      "mongodb+srv://jndevAdmin:vTeRnLiJvKi2d0i7317526@cluster0.qy3fzq7.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    //given that this example is in a async await structure, calling the client object that holds
    //the response from calling .connect, client.db() = the database sent back from the database
    const db = client.db();

    //MongoDB is structured as Collections, which hold documents. a document = an entry in the database
    const meetupCollection = db.collection("meetupsCollection");

    //.insertOne will create a documet entry in the collection of entries in the database
    //here an object is being passed as the document/entry to store a meetup in the db collection
    //calling .insertOne/.insertMany to the collection returns an object with a success or fail message
    //meetupCollection.insertMany() would insert more than one entry if it were applicable
    const result = await meetupCollection.insertOne(receivedData);

    //!could handle the result response for catching errors

    //this will log to the server console
    // console.log(result);

    ///calling .close on the client field will close the connection to the database once the operation is done
    client.close();

    //the .status() allows setting a status code to the response, indicating if the response
    //was added succesfully or failed, this would be in the error/response catching section
    //.json would convert the entered object key/value pair into a json object to send back
    response.status(201).json({ message: "Meetup added to database!" });
  }
}

export default handler;
