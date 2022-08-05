import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();

  async function addMeetupHandler(newMeetupData) {
    //fetching the path to the api call function document will trigger the default export function
    //which then returns the results of the api call
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      //update ui to confirm the meetup added
      //wait for and convert the response json-js object
      const data = await response.json();
      console.log(data);
      router.replace("/");
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name='description'
          content='Add a new meetup to the meetups list'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetup;
