import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  //example returned data fetched from a backend

  return (
    <Fragment>
      <Head>
        {/* <title>{`Meetup Detail for ${props.meetupData.title}`}</title> */}
        {/* <meta
          name='description'
          content={`Details of ${props.meetupData.title} meetup`}
        /> */}
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

//getStaticPaths is required for getStaticProps if the page is dynamic for example [meetupId].js
//here the returned object has a paths property that is an array of objects, one for each dynamic object
//associated with the path. each object then has a params property which is also an object with the actual
//property/path of the dynamic page as a key/value pair
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jndevAdmin:vTeRnLiJvKi2d0i7317526@cluster0.qy3fzq7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCollection");

  //.find() called on the collection will find all documents/entries in the collection
  //the arguments passed to .find() is an empty object of filters to find all objects
  //and a second argument which stipulates which property of the found objects should be returned
  //then toarray converts the returned object array into an array of objects with the _id properties only
  const meetupsArray = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // console.log(meetupsArray);
  client.close();

  return {
    //fallback: false tells the server to not attempt to generate a page for paths not listed
    //if false the server will route to a 404 page for dynamic ppaths not listed below in the paths array

    //fallback: true tells the server that these listed paths are listed, but there may be more
    //if true the server will try to generate a path for any other path as well.
    fallback: true,
    //here to construct the paths to the _id of each entry the meetupsArray from the database is mapped
    //each object in the meetupsArray is returned into a new object where params: is an object with
    //the id for the specific entry converted to a string, this will iterate all entries
    paths: meetupsArray.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //the meetupId is extracted from the context that is passed to this function from the getStaticPaths function
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://jndevAdmin:vTeRnLiJvKi2d0i7317526@cluster0.qy3fzq7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCollection");

  //.fineOne() takes an of key/values to search for in each entry, to find the specific one that matches
  //here we find the entry/document with the _id extracted from the path to the detail page of the entry
  //and we get a single object returned that matches.
  //!the ObjectId() is imported from mongodb and coverts the meetupId into the object type used by mongodb for _id
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();

  return {
    props: {
      //here the meetupdata returns an object, once again converting the _id back from an object to a string
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
