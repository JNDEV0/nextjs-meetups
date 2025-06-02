import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Browse a list of React meetups!' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// //getServerSideProps gets props on the server side after the page is deployed
// //page runs on server NOT the client, runs on every request to the server there is no revalidate prop.
// export async function getServerSideProps(context) {
//     //in getServerSideProps the function gets the 'context' which is an object that contains objects
//     //the contained objects is the request or response data of the server request
//     //this can be used for things like validation
//     const request = context.request;
//     const response = context.response;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  //getStaticProps is a required function name
  //this function will prefetch props for the default export function
  //!this will find fetch the data from the API on the server before the page renders on client
  //!code inside the function below does not go to client, it is server side code
  //to serve the client the page result after the first render cycle of execution of the page code
  //this function will not reach the client, it will run before the page renders
  //this function must return an object, with a props property
  //the props property will be the props passed to the default export function

  const client = await MongoClient.connect(
    "x"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCollection");

  //.find() called on the collection will find all documents/entries in the collection
  const meetupsArray = await meetupsCollection.find().toArray();
  // console.log(meetupsArray);
  client.close();

  return {
    props: {
      meetups: meetupsArray.map((meetupEntry) => ({
        title: meetupEntry.title,
        address: meetupEntry.address,
        image: meetupEntry.image,
        id: meetupEntry._id.toString(),
      })),
    },
    // revalidate is incremental static regeneration on the server
    //this property will revalidate the data on page regeneration
    // the number is seconds between revalidations, EXECUTED ON SERVER
    //if the data on the website changes every hour, 3600. if it changes every 5 seconds, 10
    revalidate: 1,
  };
}

export default HomePage;
