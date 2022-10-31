import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { WarningCircledOutline } from 'iconoir-react'

export default function Home() {

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitButton = document.getElementById("submit");
    const loadingSpinner = document.getElementById("loading");
    const errorMessage = document.getElementById("error");

    // Hide submit button, show loading spinner
    submitButton.style.display = "none";
    loadingSpinner.style.display = "block";

    // Grab form contents
    const name = e.target.name.value;
    const email = e.target.email.value;

    // Send form contents to API
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    // Handle response
    const resContents = await res.json();
    if (resContents.error) {
      // Reshow submit button, hide loading spinner
      submitButton.style.display = "block";
      loadingSpinner.style.display = "none";

      // Display error message
      errorMessage.style.display = "flex";
      errorMessage.lastChild.innerText = resContents.error;
    } else {
      window.location.href = '/success';
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HackCWRU Preregistration</title>
        <meta name="description" content="Preregistration form for HackCWRU 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HackCWRU Preregistration
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required/>
          <input type="submit" value="Submit" id='submit'/>
          <div id='loading' className={styles.loading} style={{display: 'none'}}></div>
          <div id='error' className={styles.error} style={{display: 'none'}}>
            <WarningCircledOutline size={64} />
            <p id="error-text"></p>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
