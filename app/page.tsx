import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './page.module.css';

export default function Page() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Hello World</h1>
      </main>
      <Footer />
    </>
  );
}
