import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Success() {
	return (
		<div className={styles.container}>
			<Head>
				<title>HackCWRU Preregistration</title>
				<meta name="description" content="Preregistration form for HackCWRU 2023" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Success!
				</h1>
				<p>
					You have successfully preregistered for HackCWRU 2023! Once we open registration, you will receive an email with a link to register.
				</p>
			</main>
		</div>
	)
}